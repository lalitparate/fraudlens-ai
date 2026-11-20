from app.schemas.transaction import TransactionInput

def analyse_transaction(txn: TransactionInput) -> dict:
    # Deliberately simple illustrative rule for wiring the UI.
    # This is NOT a trained model and must not be represented as research output.
    score = 0.15
    reasons = []

    if txn.amount >= 50000:
        score += 0.35
        reasons.append("Transaction amount is high relative to this demo rule.")
    if txn.transaction_type.upper() in {"TRANSFER", "CASH_OUT"}:
        score += 0.20
        reasons.append("Transaction type is included in the demo review rule.")
    if txn.old_balance_org > 0 and txn.new_balance_org == 0:
        score += 0.20
        reasons.append("Origin balance becomes zero in the supplied values.")

    score = min(score, 0.95)
    risk = "HIGH" if score >= 0.65 else "MEDIUM" if score >= 0.35 else "LOW"
    if not reasons:
        reasons.append("No high-risk condition was triggered by the illustrative demo rules.")

    return {
        "mode": "DEMO RULES — NOT A TRAINED MODEL",
        "risk": risk,
        "risk_score": round(score, 2),
        "explanation": " ".join(reasons),
        "disclaimer": "This result is illustrative only. It is not a financial decision or a validated fraud prediction.",
    }
