# Zola Backend API

## Setup Instructions

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install fastapi uvicorn python-multipart
   ```

4. **Run the development server:**

   ```bash
   python main.py
   ```

   Or using uvicorn directly:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The server will start on `http://localhost:8000` with the following features:

- **Auto-reload**: Code changes automatically restart the server
- **CORS enabled**: Frontend can make requests from `localhost:3000` and `localhost:5173`
