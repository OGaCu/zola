from schema.Plan import Plan
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_KEY'))

class OpenAiActions:
    @staticmethod
    def createItinerary(plan: Plan) -> str:
        # Use the existing prompt logic
        date_range = f"{plan.dateFrom} to {plan.dateTo}"
        alt_texts = []  # You can populate this with additional ideas if needed
        
        prompt = itinerary_prompt_template(
            date=date_range,
            location=plan.location,
            num_people=plan.numPeople,
            mood=plan.mood,
            alt_texts=alt_texts
        )
        
        # Make actual OpenAI API call
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,  # give enough room for the response
            response_format={"type": "json_object"}  # 👈 This forces valid JSON
        )
        
        return response.choices[0].message.content

def itinerary_prompt_template(date, location, num_people, mood, alt_texts):

    alt_text_md = "\n".join([f"- {text}" for text in alt_texts])

    prompt = f"""
You are a professional travel event planner with expertise in creating personalized, immersive travel experiences. Your goal is to create a detailed, day-by-day travel itinerary in Markdown format that is visually appealing, easy to follow, and tailored to the traveler's preferences.

Trip Details:
- Date: {date}
- Location: {location}
- Number of People: {num_people}
- Mood: {mood}
- Additional Ideas: {alt_text_md}

Requirements:
- Organize the itinerary by day and time, considering travel time between locations.
- Recommend restaurants, bars, cafes, and local dining spots.
- Suggest activities, attractions, and highlights that align with the mood.
- Include local tips, best times to visit, and insider knowledge.
- Use headings and subheadings to structure the itinerary clearly in Markdown.
- Make the itinerary engaging, fun, and practical for travelers.

Format Output Example:

### Day 1 – [Date]
**Morning:**  
- Activity / Location (include tips or notes)  
- Cafe / Breakfast spot

**Afternoon:**  
- Activity / Lunch spot  

**Evening:**  
- Activity / Dinner spot  
- Optional nightlife or local experience

Repeat for each day of the trip.

"""
    return prompt.strip()