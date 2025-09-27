from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_KEY'))

response = client.chat.completions.create(
    model="gpt-4o-mini",  # lightweight + cheaper
    messages=[
        {"role": "user", "content": "hi"}  # short input = fewer tokens
    ],
    max_tokens=3  # cap output length
)

print(response.choices[0].message.content)