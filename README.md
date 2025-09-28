# 🌍 Zola - AI-Powered Travel Planning Platform

Zola is an intelligent travel planning application that combines AI-generated itineraries with visual inspiration and location recommendations. Create personalized travel experiences by pinning inspiring images and letting our AI craft the perfect itinerary for your trip.

## ✨ Features

- **AI-Powered Itineraries** - Generate personalized travel plans using OpenAI
- **Visual Inspiration** - Browse and pin images from Unsplash for your trip
- **Real Location Data** - Get actual recommendations from TripAdvisor API
- **Smart Search** - Find images and locations based on your destination
- **Modern UI** - Clean, responsive interface built with React and TypeScript

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Unsplash API key
- TripAdvisor API key
- OpenAI API key

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/OGaCu/zola
   cd zola
   cd frontend && npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.template .env
   # Add your API keys to .env file
   ```

3. **Start the backend**
   ```bash
   cd backend
   python setup_images.py
   python main.py
   ```

4. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:5173` to start planning your trip!

## 🎯 How to Use

1. **Search for images** - Use the search bar to find inspiration for your destination
2. **Pin your favorites** - Click on images to pin them to your trip
3. **Plan your trip** - Fill in dates, location, budget, and mood
4. **Generate itinerary** - Click "Generate" to create your personalized travel plan
5. **View recommendations** - See real locations and activities for your destination

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: FastAPI, Python
- **APIs**: Unsplash, TripAdvisor, OpenAI
- **State Management**: Redux Toolkit

## 📁 Project Structure

```
zola/
├── frontend/ # React + TypeScript frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── store/ # Redux state management
│ │ ├── services/ # API service layers
│ │ └── types/ # TypeScript type definitions
│ └── package.json
├── backend/ # Python FastAPI backend
│ ├── actions/ # Business logic modules
│ ├── schema/ # Pydantic data models
│ └── main.py # FastAPI application entry point
└── README.md

```

---

**Happy Traveling! 🌍✈️**

Built with ❤️ for HackGT12
