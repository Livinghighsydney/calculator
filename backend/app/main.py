from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import pricing, competitor, kb

app = FastAPI(title="Better Coliving Pricing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pricing.router, prefix="/api")
app.include_router(competitor.router, prefix="/api")
app.include_router(kb.router, prefix="/api")

@app.get("/health")
def health():
    return {"status": "ok"}
