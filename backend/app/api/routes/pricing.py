from fastapi import APIRouter, HTTPException
from app.schemas.pricing import PricingRequest, PricingResponse
from app.services import rules_engine, claude_service

router = APIRouter()

@router.post("/pricing", response_model=PricingResponse)
async def calculate_price(req: PricingRequest):
    if req.room_type not in ("standard", "very_small_standard", "ensuite", "studio"):
        raise HTTPException(status_code=422, detail="Invalid room_type")

    engine_result = rules_engine.calculate(req)
    ai_summary = await claude_service.explain_price(req, engine_result)

    return PricingResponse(
        recommended_price=engine_result["recommended_price"],
        price_range=engine_result["price_range"],
        position_score=engine_result["position_score"],
        breakdown=engine_result["breakdown"],
        ai_summary=ai_summary,
    )
