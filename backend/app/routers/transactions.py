from fastapi import APIRouter
from app.schemas.transaction import TransactionInput
from app.services.demo_predictor import analyse_transaction

router = APIRouter(tags=["Transactions"])

@router.get("/transactions")
def list_transactions():
    return {
        "mode": "DEMO DATA",
        "items": [
            {"id": "TXN-1001", "type": "PAYMENT", "amount": 12500, "risk": "LOW", "score": 0.08},
            {"id": "TXN-1002", "type": "TRANSFER", "amount": 85000, "risk": "HIGH", "score": 0.94},
            {"id": "TXN-1003", "type": "CASH_OUT", "amount": 32000, "risk": "MEDIUM", "score": 0.61},
            {"id": "TXN-1004", "type": "CASH_IN", "amount": 4200, "risk": "LOW", "score": 0.03},
        ],
    }

@router.post("/predict")
def predict(payload: TransactionInput):
    return analyse_transaction(payload)
