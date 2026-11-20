from pydantic import BaseModel, Field

class TransactionInput(BaseModel):
    transaction_type: str = Field(default="TRANSFER", min_length=2, max_length=30)
    amount: float = Field(gt=0, le=1_000_000_000)
    old_balance_org: float = Field(default=0, ge=0)
    new_balance_org: float = Field(default=0, ge=0)
    old_balance_dest: float = Field(default=0, ge=0)
    new_balance_dest: float = Field(default=0, ge=0)
