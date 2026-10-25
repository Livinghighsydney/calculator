from fastapi import APIRouter, HTTPException
from app.services.kb_service import list_properties, get_rooms

router = APIRouter()

@router.get("/kb/properties")
async def properties():
    try:
        return await list_properties()
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

@router.get("/kb/properties/{page_id}/rooms")
async def rooms(page_id: int):
    try:
        return await get_rooms(page_id)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
