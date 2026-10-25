import re
import asyncio
import httpx
from app.core.config import settings

SERPER_URL = "https://google.serper.dev/search"

ROOM_TYPE_KEYWORDS = {
    "standard":            "room share house",
    "very_small_standard": "single room",
    "ensuite":             "ensuite",
    "studio":              "studio",
}

# "other" is our catch-all — no specific suburb, fall back to city-wide
_SUBURB_SEARCH_LABELS: dict[str, str] = {
    "other": "Sydney",
}

# Snippet fallback: $450pw / $450/pw / $450/wk / $450 per week
SNIPPET_PRICE_RE = re.compile(
    r"\$(\d{3,4})(?:/pw|pw|/wk|wk|\s+per\s+week|,|\s|$)", re.IGNORECASE
)

# Per-site search configuration
SITES = [
    {
        "source": "Flatmates",
        "site": "flatmates.com.au",
        "query_suffix": "pw",
        # Individual listing URLs contain -P followed by digits
        "listing_re": re.compile(r"-P\d+"),
        "title_price_re": re.compile(r"\|\s*\$(\d+)"),
    },
    {
        "source": "FlatmatesFinder",
        "site": "flatmatesfinder.com.au",
        "query_suffix": "per week",
        # FlatmatesFinder listing URLs have at least two meaningful path segments
        "listing_re": re.compile(r"flatmatesfinder\.com\.au/[^/]+/[^/?]+"),
        "title_price_re": re.compile(r"\$\s*(\d{3,4})"),
    },
    {
        "source": "realestate.com.au",
        "site": "realestate.com.au",
        "query_suffix": "per week",
        # Individual property pages always contain /property-
        "listing_re": re.compile(r"/property-"),
        "title_price_re": re.compile(r"\$\s*(\d{3,4})"),
    },
]


def _extract_price(title: str, snippet: str, title_price_re: re.Pattern) -> int | None:
    m = title_price_re.search(title)
    if m:
        val = int(m.group(1))
        return val if 100 < val < 2000 else None
    m = SNIPPET_PRICE_RE.search(snippet)
    if m:
        val = int(m.group(1))
        return val if 100 < val < 2000 else None
    return None


async def _search_site(
    client: httpx.AsyncClient,
    suburb_label: str,
    room_keyword: str,
    site_cfg: dict,
) -> list[dict]:
    query = f"site:{site_cfg['site']} {suburb_label} {room_keyword} {site_cfg['query_suffix']}"
    resp = await client.post(
        SERPER_URL,
        headers={"X-API-KEY": settings.serper_api_key, "Content-Type": "application/json"},
        json={"q": query, "gl": "au", "num": 10},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()

    results = []
    for item in data.get("organic", []):
        url = item.get("link", "")
        title = item.get("title", "")
        snippet = item.get("snippet", "")

        if not site_cfg["listing_re"].search(url):
            continue

        price = _extract_price(title, snippet, site_cfg["title_price_re"])
        clean_title = re.split(r"\s*\|", title)[0].strip()
        results.append({
            "description": clean_title,
            "url": url,
            "price": price,
            "source": site_cfg["source"],
        })

        if len(results) == 4:
            break

    return results


async def search_competitors(room_type: str, suburb: str) -> list[dict]:
    suburb_label = _SUBURB_SEARCH_LABELS.get(suburb, suburb.replace("_", " ").title())
    room_keyword = ROOM_TYPE_KEYWORDS.get(room_type, "room")

    async with httpx.AsyncClient() as client:
        site_results = await asyncio.gather(
            *[_search_site(client, suburb_label, room_keyword, s) for s in SITES],
            return_exceptions=True,
        )

    results = []
    for batch in site_results:
        if isinstance(batch, Exception):
            continue  # skip failed individual site searches, surface the rest
        results.extend(batch)

    return results
