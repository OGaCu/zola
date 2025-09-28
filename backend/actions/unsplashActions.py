import requests
import dotenv 
import os
import json
from typing import List
from schema.Image import Image

dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
ACCESS_KEY = os.getenv('UNSPLASH_ACCESS_KEY')

class UnsplashAction:
    @staticmethod
    def get_photo_tags(photo_id):
        """Fetch photo tags using the photo ID"""
        tags_url = f'https://api.unsplash.com/photos/{photo_id}'
        params = {
            'client_id': ACCESS_KEY
        }
        
        try:
            response = requests.get(tags_url, params=params)
            if response.status_code == 200:
                photo_data = response.json()
                tags = photo_data.get('tags', [])
                # Extract tag titles
                tag_titles = [tag.get('title', '') for tag in tags if tag.get('title')]
                return tag_titles
            else:
                print(f"❌ Failed to fetch tags for photo {photo_id}: {response.status_code}")
                return []
        except Exception as e:
            print(f"❌ Error fetching tags for photo {photo_id}: {e}")
            return []

    @staticmethod
    def get_random_images() -> List[Image]:
        """
        Get random images from Unsplash for webpage initialization
        
        Returns:
            List of Image objects with id, url, description, altText, and tags
        """
        images = []
        
        try:
            # Get random images
            url = 'https://api.unsplash.com/photos/random'
            params = {
                'count': 30,  # Fixed count for random images
                'client_id': ACCESS_KEY,
                'orientation': 'landscape'  # Better for web display
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                
                data = response.json()
                
                # Handle response format
                photos = data if isinstance(data, list) else [data]
                
                for photo in photos:
                    photo_id = photo.get('id', '')
                    image_url = photo.get('urls', {}).get('regular', '')
                    description = photo.get('description', '')
                    alt_text = photo.get('alt_description') or description or ""
                    
                    # Get tags for this photo
                    # tags = UnsplashAction.get_photo_tags(photo_id)
                    tags = []
                    
                    # Create Image object
                    image_obj = Image(
                        id=photo_id,
                        url=image_url,
                        description=description,
                        altText=alt_text,
                        tags=tags
                    )
                    
                    images.append(image_obj)
                    
                print(f"✅ Successfully fetched {len(images)} random images")
                
            else:
                print(f"❌ Failed to fetch random images: {response.status_code}")
                print(f"❌ Response: {response.text}")


        except Exception as e:
            print(f"❌ Error fetching random images: {e}")
            print(f"❌ Response: {response.text}")
        
        return images

    @staticmethod
    def get_images(query: str) -> List[Image]:
        images = []
        
        try:
            # Search for images with specific query
            url = 'https://api.unsplash.com/search/photos'
            params = {
                'query': query,
                'per_page': 30,
                'client_id': ACCESS_KEY,
                'orientation': 'landscape'  # Better for web display
            }
            
            response = requests.get(url, params=params)
            
            if response.status_code == 200:
                data = response.json()
                photos = data.get('results', [])
                
                for photo in photos:
                    photo_id = photo.get('id', '')
                    image_url = photo.get('urls', {}).get('regular', '')
                    description = photo.get('description', '')
                    alt_text = photo.get('alt_description', description)
                    
                    # Get tags for this photo
                    # tags = UnsplashAction.get_photo_tags(photo_id)
                    tags = []
                    
                    # Create Image object
                    image_obj = Image(
                        id=photo_id,
                        url=image_url,
                        description=description,
                        altText=alt_text,
                        tags=tags
                    )
                    
                    images.append(image_obj)
                    
                print(f"✅ Successfully fetched {len(images)} images for query: '{query}'")
                
            else:
                print(f"❌ Failed to fetch images for query '{query}': {response.status_code}")
                print(f"❌ Response: {response.text}")
        except Exception as e:
            print(f"❌ Error fetching images for query '{query}': {e}")
        
        return images

    @staticmethod
    def save_images():
        """
        Fetch random images from Unsplash and save them locally with metadata
        Maintains a goal of 150 images in the saved_images folder
        """
        try:
            # Create images directory if it doesn't exist
            images_dir = os.path.join(os.path.dirname(__file__), '..', 'saved_images')
            os.makedirs(images_dir, exist_ok=True)
            
            # Check current number of saved images
            existing_folders = [f for f in os.listdir(images_dir) if f.startswith('image_')]
            current_count = len(existing_folders)
            target_count = 150
            
            if current_count >= target_count:
                print(f"✅ Already have {current_count} images, no need to fetch more")
                return current_count
            
            # Calculate how many images to fetch
            images_needed = target_count - current_count
            print(f"📊 Current: {current_count}, Target: {target_count}, Need: {images_needed}")
            
            # Fetch images in batches of 30 (API limit)
            saved_count = current_count
            batch_size = 30
            
            while saved_count < target_count:
                batch_needed = min(batch_size, target_count - saved_count)
                
                url = 'https://api.unsplash.com/photos/random'
                params = {
                    'count': batch_needed,
                    'client_id': ACCESS_KEY,
                    'orientation': 'landscape'
                }
                
                response = requests.get(url, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    photos = data if isinstance(data, list) else [data]
                    
                    for photo in photos:
                        try:
                            photo_id = photo.get('id', '')
                            
                            # Skip if image already exists
                            if f"image_{photo_id}" in existing_folders:
                                continue
                                
                            image_url = photo.get('urls', {}).get('regular', '')
                            description = photo.get('description', '')
                            alt_text = photo.get('alt_description') or description or ""
                            
                            # Create folder for this image
                            image_folder = os.path.join(images_dir, f"image_{photo_id}")
                            os.makedirs(image_folder, exist_ok=True)
                            
                            # Download and save the image
                            img_response = requests.get(image_url)
                            if img_response.status_code == 200:
                                img_path = os.path.join(image_folder, 'image.jpg')
                                with open(img_path, 'wb') as f:
                                    f.write(img_response.content)
                                
                                # Create Image object metadata
                                image_obj = Image(
                                    id=photo_id,
                                    url=image_url,
                                    description=description,
                                    altText=alt_text,
                                    tags=[]  # Tags will be fetched when needed
                                )
                                
                                # Save metadata as JSON
                                metadata_path = os.path.join(image_folder, 'metadata.json')
                                with open(metadata_path, 'w') as f:
                                    json.dump(image_obj.dict(), f, indent=2)
                                
                                saved_count += 1
                                print(f"✅ Saved image {photo_id} ({saved_count}/{target_count})")
                                
                        except Exception as e:
                            print(f"❌ Error saving image {photo.get('id', 'unknown')}: {e}")
                            continue
                    
                    # Update existing folders list for next iteration
                    existing_folders = [f for f in os.listdir(images_dir) if f.startswith('image_')]
                    
                else:
                    print(f"❌ Failed to fetch images: {response.status_code}")
                    break
            
            print(f"✅ Successfully saved {saved_count} images to {images_dir}")
            return saved_count
                
        except Exception as e:
            print(f"❌ Error in save_images: {e}")
            return 0

    @staticmethod
    def load_saved_images(count: int = 40) -> List[Image]:
        """
        Load random images from saved images folder
        """
        try:
            images_dir = os.path.join(os.path.dirname(__file__), '..', 'saved_images')
            
            if not os.path.exists(images_dir):
                print("❌ Saved images directory doesn't exist")
                return []
            
            # Get all image folders
            image_folders = [f for f in os.listdir(images_dir) if f.startswith('image_')]
            
            if not image_folders:
                print("❌ No saved images found")
                return []
            
            # Randomly select folders
            import random
            selected_folders = random.sample(image_folders, min(count, len(image_folders)))
            
            images = []
            for folder in selected_folders:
                try:
                    metadata_path = os.path.join(images_dir, folder, 'metadata.json')
                    if os.path.exists(metadata_path):
                        with open(metadata_path, 'r') as f:
                            metadata = json.load(f)
                            images.append(Image(**metadata))
                except Exception as e:
                    print(f"❌ Error loading image from {folder}: {e}")
                    continue
            
            print(f"✅ Loaded {len(images)} saved images")
            return images
            
        except Exception as e:
            print(f"❌ Error loading saved images: {e}")
            return []

    def printImages(images: List[Image], title: str = "Images"):
        """
        Print a list of Image objects in a clean format
        
        Args:
            images: List of Image objects to display
            title: Title for the image list
        """
        print(f"\n📸 {title} ({len(images)}):")
        for i, img in enumerate(images, 1):
            print(f"  {i}. ID: {img.id}")
            print(f"     URL: {img.url}")
            print(f"     Description: {img.description}")
            print(f"     Alt Text: {img.altText}")
            print(f"     Tags: {', '.join(img.tags)}")
            print()

    def writeImagesToFile(images: List[Image], title: str = "Images", filename: str = "printedImages.txt"):
        """
        Write a list of Image objects to a file in a clean format
        
        Args:
            images: List of Image objects to write
            title: Title for the image list
            filename: Name of the output file
        """
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(f"📸 {title} ({len(images)}):\n")
                for i, img in enumerate(images, 1):
                    f.write(f"  {i}. ID: {img.id}\n")
                    f.write(f"     URL: {img.url}\n")
                    f.write(f"     Description: {img.description}\n")
                    f.write(f"     Alt Text: {img.altText}\n")
                    f.write("\n")
            
            print(f"✅ Successfully wrote {len(images)} images to {filename}")
            
        except Exception as e:
            print(f"❌ Error writing images to file {filename}: {e}")

# Example usage of the image functions
# if __name__ == "__main__":
    # print("🎨 Fetching images for webpage initialization...")
    # dotenv.load_dotenv()
    # ACCESS_KEY = os.getenv('UNSPLASH_ACCESS_KEY')
    # if ACCESS_KEY:
    #     print("access key is set") 
    # else:
    #     print("access key is none")   

    # test random images
    # random_images = getRandomImages()
    # printImages(random_images, "Random Images")
    # writeImagesToFile(random_images, "Random Images", "RandomImages.txt")
    
    # test nature images
    # nature_images = getImages("nature in taiwan")
    # printImages(nature_images, "Nature Images")
    # writeImagesToFile(nature_images, "Nature Images", "NatureImages.txt")
    
