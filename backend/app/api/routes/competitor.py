from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.competitor_service import search_competitors

router = APIRouter()

class CompetitorRequest(BaseModel):
    room_type: str
    suburb: str

@router.post("/competitors")
async def get_competitors(req: CompetitorRequest):
    try:
        results = await search_competitors(req.room_type, req.suburb)
        return {"competitors": results}
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Search failed: {str(e)}")
