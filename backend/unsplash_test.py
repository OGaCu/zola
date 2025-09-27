import requests
import dotenv 
import os
from typing import List
from dataclasses import dataclass

# Image class for random images
@dataclass
class Image:
    id: str
    url: str
    description: str
    altText: str
    tags: List[str]

def download_image(url, save_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        print(f"✅ Saved: {save_path}")
    else:
        print(f"❌ Failed to download {url}")

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

def getRandomImages() -> List[Image]:
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
            'count': 10,  # Fixed count for random images
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
                alt_text = photo.get('alt_description', description)
                
                # Get tags for this photo
                tags = get_photo_tags(photo_id)
                
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

def getImages(query: str) -> List[Image]:
    images = []
    
    try:
        # Search for images with specific query
        url = 'https://api.unsplash.com/search/photos'
        params = {
            'query': query,
            'per_page': 10,
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
                tags = get_photo_tags(photo_id)
                
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
    except Exception as e:
        print(f"❌ Error fetching images for query '{query}': {e}")
    
    return images

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
                f.write(f"     Tags: {', '.join(img.tags)}\n")
                f.write("\n")
        
        print(f"✅ Successfully wrote {len(images)} images to {filename}")
        
    except Exception as e:
        print(f"❌ Error writing images to file {filename}: {e}")

# Example usage of the image functions
if __name__ == "__main__":
    print("🎨 Fetching images for webpage initialization...")
    dotenv.load_dotenv()
    ACCESS_KEY = os.getenv('UNSPLASH_ACCESS_KEY')
    if ACCESS_KEY:
        print("access key is set")    

    # test random images
    random_images = getRandomImages()
    # printImages(random_images, "Random Images")
    # writeImagesToFile(random_images, "Random Images", "RandomImages.txt")
    
    # test nature images
    # nature_images = getImages("nature in taiwan")
    # printImages(nature_images, "Nature Images")
    # writeImagesToFile(nature_images, "Nature Images", "NatureImages.txt")
    
    