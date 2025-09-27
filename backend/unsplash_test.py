import requests
import dotenv 
import os

dotenv.load_dotenv()

ACCESS_KEY = os.getenv('UNSPLASH_ACCESS_KEY')

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

query = 'geogia atlanta'

url = 'https://api.unsplash.com/search/photos'
params = {
    'query': query,
    'per_page': 10,
    'client_id': ACCESS_KEY
}

response = requests.get(url, params=params)
data = response.json()

os.makedirs('unsplash_images', exist_ok=True)

for idx, img in enumerate(data['results']):
    # Create a folder name based on the image index and a sanitized version of alt_description
    photo_id = img.get('id', f'image_{idx}')
    description = img.get('description', f'image_{idx}')
    alt_desc = img.get('alt_description', f'image_{idx}')
    # Sanitize folder name by removing/replacing invalid characters
    folder_name = f"image_{idx}"

    # Get tags from the search results (basic tags)
    basic_tags = img.get('tags', [])
    basic_tag_titles = [tag.get('title', '') for tag in basic_tags if tag.get('title')]
    
    # Create individual folder for this image
    image_folder = f'unsplash_images/{folder_name}'
    os.makedirs(image_folder, exist_ok=True)
    
    # Download the image
    image_url = img['urls']['regular']
    image_path = f'{image_folder}/image.jpg'
    download_image(image_url, image_path)
    
    # Fetch detailed tags using photo ID
    print(f"🔍 Fetching detailed tags for photo {photo_id}...")
    detailed_tags = get_photo_tags(photo_id)
    
    # Combine basic tags and detailed tags, remove duplicates
    all_tags = list(set(basic_tag_titles + detailed_tags))
    
    # Save the alt description as a text file
    description_path = f'{image_folder}/description.txt'
    with open(description_path, 'w', encoding='utf-8') as f:
        f.write(f"Photo ID: {photo_id}\n")
        f.write(f"Description: {description}\n")
        f.write(f"Alt Description: {alt_desc}\n")
        f.write(f"Image URL: {image_url}\n")
        f.write(f"Photographer: {img['user']['name']}\n")
        f.write(f"Download Date: {os.popen('date').read().strip()}\n")
        if all_tags:
            f.write(f"Tags: {', '.join(all_tags)}\n")
    print(f"✅ Saved description with {len(all_tags)} tags: {description_path}")