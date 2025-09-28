from dotenv import load_dotenv
import os
import requests

# Load environment variables
load_dotenv()

# Get API key
tripadvisor_key = os.getenv("TRIPADVISOR_KEY")

# Example endpoint: search for locations
url = "https://api.content.tripadvisor.com/api/v1/location/search"

params = {
    "key": tripadvisor_key,
    "searchQuery": "New York"
}

headers = {
    "Accept": "application/json"
}

# Make request
response = requests.get(url, headers=headers, params=params)

# Check response
if response.status_code == 200:
    print("✅ Success!")
    print(response.json())
else:
    print(f"❌ Error {response.status_code}: {response.text}")