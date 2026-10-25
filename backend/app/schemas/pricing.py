from pydantic import BaseModel
from typing import Optional

class PricingRequest(BaseModel):
    room_type: str          # standard | very_small_standard | ensuite | studio
    suburb: str
    size: str               # small | medium | large
    quality: str            # modern | older  (derived from quality checklist on frontend)
    cleveland_st: bool = False
    large_house: bool = False
    large_batch: bool = False
    empty_now: Optional[int] = None
    days_14: Optional[int] = None
    days_28: Optional[int] = None
    month: Optional[int] = None          # 1–12; defaults to current month if omitted
    # Optional: S3 image URL from Ricoh 360 tour — Claude uses it to assess quality visually
    room_image_url: Optional[str] = None

class BreakdownRow(BaseModel):
    factor: str
    finding: str
    effect: str

class PricingResponse(BaseModel):
    recommended_price: int
    price_range: dict       # { min, max }
    position_score: float   # 0.0–1.0, for transparency
    breakdown: list[BreakdownRow]
    ai_summary: str
