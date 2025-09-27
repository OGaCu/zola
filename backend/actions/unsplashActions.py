from typing import List
from schema.Image import Image
class UnsplashAction:
    @staticmethod
    def get_random_images() -> List[Image]:
        # TODO: Implement actual Unsplash API call
        return [Image(id="1", url="https://example.com/placeholder.jpg", description="Sample image", altText="Sample alt text", tags=["sample", "image"])]
    
    @staticmethod
    def get_images() -> List[Image]:
        # TODO: Implement actual Unsplash API call for multiple images
        return [
            Image(id="1", url="https://example.com/placeholder1.jpg", description="Sample image 1", altText="Sample alt text 1", tags=["sample", "image"]),
            Image(id="2", url="https://example.com/placeholder2.jpg", description="Sample image 2", altText="Sample alt text 2", tags=["sample", "image"]),
            Image(id="3", url="https://example.com/placeholder3.jpg", description="Sample image 3", altText="Sample alt text 3", tags=["sample", "image"])
        ]
    