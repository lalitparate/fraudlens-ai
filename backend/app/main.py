from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import dashboard, transactions

app = FastAPI(
    title="FraudLens AI API",
    description="Research prototype API for distributed fraud detection and explainable AI.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api")
app.include_router(transactions.router, prefix="/api")


@app.get("/")
def root():
    return {
        "name": "FraudLens AI API",
        "status": "running",
        "note": "Starter API uses illustrative demo data, not a trained fraud model.",
        "docs": "/docs",
    }
