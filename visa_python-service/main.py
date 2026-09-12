from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(title="Visa Analytics Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"service": "Visa Analytics Service", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/reports/summary")
async def summary():
    return {
        "success": True,
        "data": {
            "total_applications": 3,
            "approval_rate": 33.3,
            "avg_processing_days": 12,
            "revenue": 75000,
            "by_visa_type": [
                {"type": "Tourist Visa", "count": 1, "revenue": 15000},
                {"type": "Student Visa", "count": 1, "revenue": 35000},
                {"type": "Business Visa", "count": 1, "revenue": 25000}
            ],
            "by_status": {
                "submitted": 1,
                "under_review": 1,
                "approved": 1
            },
            "top_destinations": ["United Kingdom", "Canada", "UAE"],
            "generated_by": "Python FastAPI"
        }
    }

@app.get("/reports/processing-time")
async def processing_time():
    return {
        "success": True,
        "data": {
            "average_days": 12,
            "fastest": 7,
            "slowest": 45,
            "by_type": [
                {"type": "Tourist Visa", "avg_days": 10},
                {"type": "Business Visa", "avg_days": 14},
                {"type": "Student Visa", "avg_days": 28},
                {"type": "Work Visa", "avg_days": 40}
            ]
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
