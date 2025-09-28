#!/usr/bin/env python3
"""
First-time user script to populate the saved_images folder with 150 images
Run this script before starting the server for the first time
"""

import os
import sys

# Add the current directory to Python path to import our modules
sys.path.append(os.path.dirname(__file__))

from actions.unsplashActions import UnsplashAction

def main():
    print("🚀 Zola Image Setup Script")
    print("=" * 50)
    print("This script will download 150 random images from Unsplash")
    print("and save them locally for faster loading.")
    print()
    
    # Check if .env file exists
    env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    if not os.path.exists(env_path):
        print("❌ Error: .env file not found!")
        print("Please create a .env file in the project root with:")
        print("UNSPLASH_ACCESS_KEY=your_unsplash_access_key")
        return
    
    print("✅ Found .env file")
    print()
    
    # Create saved_images directory
    images_dir = os.path.join(os.path.dirname(__file__), 'saved_images')
    os.makedirs(images_dir, exist_ok=True)
    print(f"📁 Created images directory: {images_dir}")
    print()
    
    # Check if images already exist
    existing_folders = [f for f in os.listdir(images_dir) if f.startswith('image_')]
    if existing_folders:
        print(f"⚠️  Found {len(existing_folders)} existing images")
        response = input("Do you want to continue and add more images? (y/n): ")
        if response.lower() != 'y':
            print("Setup cancelled.")
            return
    
    print("🔄 Starting image download...")
    print("This may take a few minutes depending on your internet connection.")
    print()
    
    # Download images
    saved_count = UnsplashAction.save_images()
    
    print()
    print("=" * 50)
    if saved_count > 0:
        print(f"✅ Setup complete! Downloaded {saved_count} images")
        print("You can now start the server with: python3 main.py")
    else:
        print("❌ Setup failed. Please check your internet connection and API key.")
    print("=" * 50)

if __name__ == "__main__":
    main()
