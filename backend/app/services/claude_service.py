import base64
import anthropic
from app.core.config import settings
from app.core.prompts import build_pricing_prompt

client = anthropic.Anthropic(api_key=settings.claude_api_key)

_PRICING_IMAGE_B64 = None

def _get_pricing_image_b64() -> str:
    global _PRICING_IMAGE_B64
    if _PRICING_IMAGE_B64 is None:
        _PRICING_IMAGE_B64 = base64.standard_b64encode(
            settings.pricing_image_path.read_bytes()
        ).decode("utf-8")
    return _PRICING_IMAGE_B64


def _pricing_infographic_block() -> dict:
    return {
        "type": "image",
        "source": {"type": "base64", "media_type": "image/jpeg", "data": _get_pricing_image_b64()},
    }


def _room_image_block(url: str) -> dict:
    # Ricoh S3 thumbnails are publicly accessible — pass by URL, no download needed
    return {
        "type": "image",
        "source": {"type": "url", "url": url},
    }


async def explain_price(req, engine_result: dict) -> str:
    prompt = build_pricing_prompt(req, engine_result)

    content = [_pricing_infographic_block()]

    if req.room_image_url:
        content.append(_room_image_block(req.room_image_url))
        content.append({
            "type": "text",
            "text": "The second image above is the actual 360° tour photo of this specific room. "
                    "Use it to verify the quality assessment and note any details that influenced the price.\n\n"
        })

    content.append({"type": "text", "text": prompt})

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=350,
        messages=[{"role": "user", "content": content}],
    )
    return message.content[0].text.strip()
