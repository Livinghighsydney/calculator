from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    claude_api_key: str = ""
    serper_api_key: str = ""
    allowed_origins: str = "http://localhost:5173"
    kb_api_url: str = "https://api.livinghigh.com.au"
    kb_email: str = ""
    kb_password: str = ""
    pricing_image_path: Path = Path(__file__).parents[3] / "docs" / "image3.jpeg"

    model_config = {"env_file": ".env"}

settings = Settings()
