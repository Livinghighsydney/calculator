import re
import time
import httpx
from app.core.config import settings

# --- Token cache ---
_token_cache: dict = {"token": None, "expires_at": 0}


async def _get_token() -> str:
    if _token_cache["token"] and time.time() < _token_cache["expires_at"] - 60:
        return _token_cache["token"]

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{settings.kb_api_url}/api/v1/auth/login",
            data={"username": settings.kb_email, "password": settings.kb_password},
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()

    token = data["access_token"]
    # JWT exp is ~30min; cache for 25min
    _token_cache.update({"token": token, "expires_at": time.time() + 1500})
    return token


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


# --- Property list ---
async def list_properties() -> list[dict]:
    token = await _get_token()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{settings.kb_api_url}/api/v1/pages",
            params={"type": "building"},
            headers=_auth(token),
            timeout=10,
        )
        resp.raise_for_status()

    return [
        {"id": p["id"], "title": p["title"], "suburb": p.get("suburb", "")}
        for p in resp.json()
    ]


# --- Room extraction ---
# Ricoh embed domains → canonical view domain for og:image fetch
_RICOH_EMBED_RE = re.compile(
    r'src="https?://(?:embed\.ricohtours\.com|embed\.ricoh360\.com)/([0-9a-f-]{36})"',
    re.IGNORECASE,
)
_ROOM_LABEL_RE = re.compile(
    r'<(?:strong|h[1-4])[^>]*>([^<]*Room\s*\d+[^<]*)</(?:strong|h[1-4])>',
    re.IGNORECASE,
)
_OG_IMAGE_RE = re.compile(r'og:image" content="([^"]+)"')


async def _ricoh_og_image(uuid: str) -> str | None:
    """Fetch the 2048px equirectangular thumbnail URL from a Ricoh tour."""
    async with httpx.AsyncClient(follow_redirects=True) as client:
        try:
            resp = await client.get(
                f"https://view.ricoh360.com/{uuid}",
                timeout=8,
            )
            m = _OG_IMAGE_RE.search(resp.text)
            return m.group(1) if m else None
        except Exception:
            return None


async def get_rooms(page_id: int) -> list[dict]:
    token = await _get_token()
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{settings.kb_api_url}/api/v1/pages/{page_id}",
            headers=_auth(token),
            timeout=10,
        )
        resp.raise_for_status()

    content = resp.json().get("content", "")

    # Walk through content finding (label, uuid) pairs
    # Strategy: find each Room label, then look forward for the next Ricoh embed
    label_positions = [
        (m.start(), re.sub(r'[\s\xa0]*below[\s\xa0:]*$', '', m.group(1), flags=re.IGNORECASE).strip())
        for m in _ROOM_LABEL_RE.finditer(content)
    ]

    rooms = []
    seen_uuids: set[str] = set()

    for i, (pos, label) in enumerate(label_positions):
        end = label_positions[i + 1][0] if i + 1 < len(label_positions) else pos + 800
        chunk = content[pos:end]
        m = _RICOH_EMBED_RE.search(chunk)
        if not m:
            continue
        uuid = m.group(1)
        if uuid in seen_uuids:
            continue
        seen_uuids.add(uuid)
        rooms.append({"label": label, "uuid": uuid})

    # Fetch og:image URLs concurrently
    import asyncio
    image_urls = await asyncio.gather(*[_ricoh_og_image(r["uuid"]) for r in rooms])

    return [
        {**room, "image_url": img_url}
        for room, img_url in zip(rooms, image_urls)
        if img_url  # skip rooms where image fetch failed
    ]
