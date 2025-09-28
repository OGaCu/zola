from turtle import st
import requests
import dotenv 
import os
from typing import List

dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
tripadvisor_key = os.getenv("TRIPADVISOR_KEY")

class TripAdvisorAction:
    @staticmethod
    def prepare_itenary(query: str) -> dict:
        activities = []
        restaurants = []
        hotels = []
        activities_response = TripAdvisorAction.query_locations(query, "attractions")
        for location in activities_response:
            id = location['location_id']
            print(f" ================================ Getting details for {id} =================================")
            response = TripAdvisorAction._get_location_details(id)
            activities.append(response)
        restaurants_response = TripAdvisorAction.query_locations(query, "restaurants")
        for location in restaurants_response:
            id = location['location_id']
            print(f" ================================ Getting details for {id} =================================")
            response = TripAdvisorAction._get_location_details(id)
            restaurants.append(response)
        hotels_response = TripAdvisorAction.query_locations(query, "hotels")
        for location in hotels_response:
            id = location['location_id']
            print(f" ================================ Getting details for {id} =================================")
            response = TripAdvisorAction._get_location_details(id)
            hotels.append(response)
        return activities, restaurants, hotels

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
    def _get_location_by_query(query: str, category: str, limit: int = 5) -> dict:
        url = f"https://api.content.tripadvisor.com/api/v1/location/search"
        params = {
            "key": tripadvisor_key,
            "searchQuery": query,
            "category": category, # "hotels", "attractions", "restaurants"
        }
        response = requests.get(url, params=params)
        return response.json()['data'][:limit]
    
    
    
# write a few tests for the TripAdvisorAction class
if __name__ == "__main__":
    response = TripAdvisorAction.query_locations("New York", "hotels")
    for location in response:
        id = location['location_id']
        print(f" ================================ Getting details for {id} =================================")
        response = TripAdvisorAction._get_location_details(id)
        print(response)
