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

query = 'travelhappy romantic date idea'

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
    alt_desc = img.get('alt_description', f'image_{idx}')
    # Sanitize folder name by removing/replacing invalid characters
    folder_name = f"image_{idx}"

    tags = img.get('tags', [])
    
    # Create individual folder for this image
    image_folder = f'unsplash_images/{folder_name}'
    os.makedirs(image_folder, exist_ok=True)
    
    # Download the image
    image_url = img['urls']['regular']
    image_path = f'{image_folder}/image.jpg'
    download_image(image_url, image_path)
    
    # Save the alt description as a text file
    description_path = f'{image_folder}/description.txt'
    with open(description_path, 'w', encoding='utf-8') as f:
        f.write(f"Alt Description: {alt_desc}\n")
        f.write(f"Image URL: {image_url}\n")
        f.write(f"Download Date: {os.popen('date').read().strip()}\n")
        f.write(f"Photographer: {img['user']['name']}\n")
        if tags: 
            f.write(f"Tags: {', '.join(tags)}\n")
    print(f"✅ Saved description: {description_path}")