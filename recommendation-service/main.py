# main.py (Service B - Backend Python)
# Install: pip install fastapi uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Setup CORS agar bisa diakses dari Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Saat production ganti dengan URL Vercel
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Data untuk Rekomendasi
recommendations = [
    {"id": "rec1", "title": "Advanced Facade Design", "reason": "Trending now"},
    {"id": "rec2", "title": "Sustainable Bamboo", "reason": "Based on your history"}
]

@app.get("/api/recommendations")
def get_recommendations():
    return {"data": recommendations, "source": "Service B (Python)"}

# Cara run: uvicorn main:app --reload --port 8000