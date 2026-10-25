from datetime import date
from app.schemas.pricing import PricingRequest, BreakdownRow

RANGES = {
    "standard":            {"summer": (340, 370), "winter": (295, 330)},
    "very_small_standard": {"summer": (320, 320), "winter": (270, 285)},
    "ensuite":             {"summer": (395, 410), "winter": (350, 370)},
    "studio":              {"summer": (420, 470), "winter": (375, 420)},
}

SUBURB_TIERS = {
    "surry_hills": "high", "redfern": "high", "chippendale": "high",
    "neutral_bay": "low",
}

# Size sets the BASE position within the range — the doc says this is the primary driver
SIZE_BASE = {"small": 0.20, "medium": 0.50, "large": 0.80}

LARGE_BATCH_PENALTY = 20


def get_season(month: int | None = None) -> str:
    m = month if month is not None else date.today().month
    return "winter" if 4 <= m <= 8 else "summer"


def _round5(v: float) -> int:
    return round(v / 5) * 5


def calculate(req: PricingRequest) -> dict:
    season = get_season(req.month)
    range_min, range_max = RANGES[req.room_type][season]
    span = range_max - range_min

    breakdown: list[BreakdownRow] = []

    # Season + room type set the range
    breakdown.append(BreakdownRow(
        factor="Season",
        finding=f"{'Summer' if season == 'summer' else 'Winter'} ({date.today().strftime('%B')})",
        effect=f"Base ${range_min}–${range_max}"
    ))
    breakdown.append(BreakdownRow(
        factor="Room Type",
        finding=req.room_type.replace("_", " ").title(),
        effect="Tier set"
    ))

    # Room size — primary position driver
    position = SIZE_BASE[req.size]
    size_label = {"small": "Bottom third", "medium": "Mid-range", "large": "Top third"}[req.size]
    breakdown.append(BreakdownRow(factor="Room Size", finding=req.size.title(), effect=size_label))

    # Suburb — adjusts ±0.15 within the size band
    tier = SUBURB_TIERS.get(req.suburb, "average")
    suburb_nudge = {"high": 0.15, "average": 0.0, "low": -0.15}[tier]
    position += suburb_nudge
    breakdown.append(BreakdownRow(
        factor="Suburb",
        finding=f"{req.suburb.replace('_', ' ').title()} ({tier} demand)",
        effect="Higher end ↑" if suburb_nudge > 0 else ("Lower end ↓" if suburb_nudge < 0 else "Middle of range")
    ))

    # Quality — adjusts ±0.10
    quality_nudge = 0.10 if req.quality == "modern" else -0.10
    position += quality_nudge
    breakdown.append(BreakdownRow(
        factor="House Quality",
        finding="Modern" if req.quality == "modern" else "Older style",
        effect="Pushes higher ↑" if quality_nudge > 0 else "Pushes lower ↓"
    ))

    # House flags
    if req.cleveland_st:
        position -= 0.15
        breakdown.append(BreakdownRow(factor="Cleveland St", finding="Yes", effect="Older boarding house ↓"))
    if req.large_house:
        position -= 0.10
        breakdown.append(BreakdownRow(factor="20+ Room House", finding="Yes", effect="Large communal house ↓"))

    position = max(0.0, min(1.0, position))
    price = _round5(range_min + position * span)

    # Large batch penalty after range positioning
    if req.large_batch:
        price -= LARGE_BATCH_PENALTY
        breakdown.append(BreakdownRow(
            factor="Vacancy Load",
            finding="Large batch",
            effect=f"−${LARGE_BATCH_PENALTY} to fill faster"
        ))
    else:
        breakdown.append(BreakdownRow(factor="Vacancy Load", finding="Normal batch", effect="No adjustment"))

    return {
        "recommended_price": price,
        "price_range": {"min": range_min, "max": range_max},
        "position_score": round(position, 2),
        "breakdown": breakdown,
        "season": season,
    }
