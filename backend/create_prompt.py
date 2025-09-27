def make_itinerary_prompt(date, location, num_people, mood, alt_texts):
    """
    Create a markdown-formatted prompt for ChatGPT to generate a travel itinerary.

    Parameters:
        date (str): Trip date (e.g., '2025-05-10')
        location (str): Destination (e.g., 'Kyoto, Japan')
        num_people (int): Number of travelers
        mood (str): Mood of the trip (e.g., 'adventurous', 'relaxing', 'romantic')
        alt_texts (list): Alt text list from Unsplash images
    Returns:
        str: Markdown-formatted prompt string
    """

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

