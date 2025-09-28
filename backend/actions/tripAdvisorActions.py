from turtle import st
import requests
import dotenv 
import os
from typing import List
from schema.Location import Location

dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
tripadvisor_key = os.getenv("TRIPADVISOR_KEY")

class TripAdvisorAction:
    @staticmethod
    def _parse_location_response(response: dict) -> Location:
        """
        Parse TripAdvisor API response into Location object
        """
        try:
            print(response)
            # Extract basic information
            location_id = str(response.get('location_id', ''))
            name = response.get('name', '')
            
            # Extract address information from address_obj
            address = None
            address_obj = response.get('address_obj', {})
            if address_obj:
                address = address_obj.get('address_string', None)
                if not address:
                    # Build address from components if address_string not available
                    address_parts = []
                    if address_obj.get('street1'):
                        address_parts.append(address_obj['street1'])
                    if address_obj.get('city'):
                        address_parts.append(address_obj['city'])
                    if address_obj.get('state'):
                        address_parts.append(address_obj['state'])
                    if address_obj.get('country'):
                        address_parts.append(address_obj['country'])
                    address = ', '.join(address_parts) if address_parts else None
            
            # Extract contact information
            phone = response.get('phone', None)
            website = response.get('website', None)
            
            # Extract rating
            rating = None
            if 'rating' in response:
                try:
                    rating = float(response['rating'])
                except (ValueError, TypeError):
                    rating = None
            
            # Extract description
            description = response.get('description', None)
            
            # Extract amenities (for hotels) - not present in this attraction example
            amenities = []
            if 'amenities' in response:
                amenities = response['amenities']
            
            # Extract styles/cuisine types from subcategory and groups
            styles = []
            if 'subcategory' in response:
                styles = [sub.get('localized_name', sub.get('name', '')) for sub in response['subcategory']]
            
            # Extract trip types
            trip_types = []
            if 'trip_types' in response:
                trip_types = [trip.get('localized_name', trip.get('name', '')) for trip in response['trip_types']]
            
            # Extract web URL
            web_url = response.get('web_url', None)
            
            # Extract photo URL - need to construct from photo_count and see_all_photos
            photo_url = TripAdvisorAction._get_location_image(location_id)
            
            # Extract price level - not present in this attraction, but might be in restaurants/hotels
            price_level = None
            if 'price_level' in response:
                price_level = response['price_level']
            elif 'price' in response:
                price_level = response['price']
            
            return Location(
                location_id=location_id,
                name=name,
                category="",
                description=description,
                address=address,
                phone=phone,
                price_level=price_level,
                rating=rating,
                amenities=amenities,
                styles=styles,
                trip_types=trip_types,
                web_url=web_url,
                photo_url=photo_url
            )
        except Exception as e:
            print(f"Error parsing location response: {e}")
            # Return a minimal Location object if parsing fails
            return Location(
                location_id=str(response.get('location_id', '')),
                name=response.get('name', 'Unknown'),
                category=""
            )

    @staticmethod
    def get_locations(query: str) -> tuple[List[Location], List[Location], List[Location]]:
        """
        Prepare itinerary by fetching and parsing locations from TripAdvisor
        Returns tuple of (activities, restaurants, hotels) as Location objects
        """
        activities = []
        
        # Get activities/attractions
        activities_response = TripAdvisorAction._get_location_by_query(query)
        for location in activities_response:
            id = location['location_id']
            response = TripAdvisorAction._get_location_details(id)
            parsed_location = TripAdvisorAction._parse_location_response(response)
            activities.append(parsed_location)
        return activities

    @staticmethod
    def _get_location_details(location_id: str) -> dict:
        url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/details"
        params = {
            "key": tripadvisor_key,
            "language": "en",
            "currency": "USD",
        }
        response = requests.get(url, params=params)
        return response.json()
    @staticmethod
    def _get_location_by_query(query: str, limit: int = 5) -> dict:
        url = f"https://api.content.tripadvisor.com/api/v1/location/search"
        params = {
            "key": tripadvisor_key,
            "searchQuery": query,
        }
        response = requests.get(url, params=params)
        return response.json()['data'][:limit]
    @staticmethod
    def _get_location_image(location_id: str) -> str:
        url = f"https://api.content.tripadvisor.com/api/v1/location/{location_id}/photos"
        params = {
            "key": tripadvisor_key,
            "language": "en",
            "currency": "USD",
        }
        response = requests.get(url, params=params)
        return response.json()["data"][0]["images"]["original"]["url"]
    
    
# write a few tests for the TripAdvisorAction class
if __name__ == "__main__":
    # Test the prepare_itenary method
    images = TripAdvisorAction._get_location_image("8093951")
    print(images)
