from fastapi import APIRouter

router = APIRouter(tags=["Dashboard"])

@router.get("/health")
def health():
    return {"status": "ok", "service": "fraudlens-api", "mode": "demo"}

@router.get("/dashboard/summary")
def dashboard_summary():
    # Illustrative UI values only. Replace with measured results from the research pipeline.
    return {
        "mode": "DEMO DATA",
        "transactions_scanned": 125000,
        "flagged_transactions": 1842,
        "review_rate_percent": 1.47,
        "model_precision": 0.985,
        "fraud_rate_percent": 0.82,
        "spark_status": "Not connected",
        "streaming_status": "Simulation not started",
    }
