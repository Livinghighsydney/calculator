from datetime import date
from app.schemas.pricing import PricingRequest, BreakdownRow

RANGES = {
    "standard":            {"summer": (340, 370), "winter": (295, 330)},
    "very_small_standard": {"summer": (320, 320), "winter": (270, 285)},
    "ensuite":             {"summer": (395, 410), "winter": (350, 370)},
    "studio":              {"summer": (420, 470), "winter": (375, 420)},
}

SIZE_BASE = {"small": 0.20, "medium": 0.50, "large": 0.80}

LOCATION_DEMAND_NUDGE = {"high": 0.15, "average": 0.0, "low": -0.15}

LARGE_BATCH_PENALTY = 20
BALCONY_PREMIUM = 20


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

    # Location demand — staff-set, replaces hardcoded suburb tiers
    demand = req.location_demand
    location_nudge = LOCATION_DEMAND_NUDGE.get(demand, 0.0)
    position += location_nudge
    demand_label = {"high": "High demand area ↑", "average": "Average demand", "low": "Lower demand area ↓"}[demand]
    breakdown.append(BreakdownRow(
        factor="Location",
        finding=demand.title() + " demand",
        effect=demand_label
    ))

    # Quality — adjusts ±0.10
    quality_nudge = 0.10 if req.quality == "modern" else -0.10
    position += quality_nudge
    breakdown.append(BreakdownRow(
        factor="House Quality",
        finding="Modern" if req.quality == "modern" else "Older style",
        effect="Pushes higher ↑" if quality_nudge > 0 else "Pushes lower ↓"
    ))

    # House flags — position-based
    if req.very_old:
        position -= 0.20
        breakdown.append(BreakdownRow(factor="Building Condition", finding="Very old / deteriorating", effect="Significantly lower ↓↓"))
    if req.poor_bathroom_ratio:
        position -= 0.15
        breakdown.append(BreakdownRow(factor="Bathroom Ratio", finding="5+ rooms per bathroom", effect="Pushes lower ↓"))
    if req.cleveland_st:
        position -= 0.15
        breakdown.append(BreakdownRow(factor="Cleveland St", finding="Yes", effect="Older boarding house ↓"))
    if req.large_house:
        position -= 0.10
        breakdown.append(BreakdownRow(factor="20+ Room House", finding="Yes", effect="Large communal house ↓"))

    position = max(0.0, min(1.0, position))
    price = _round5(range_min + position * span)

    # Balcony — flat premium on top of range positioning
    if req.balcony:
        price += BALCONY_PREMIUM
        breakdown.append(BreakdownRow(factor="Balcony", finding="Yes", effect=f"+${BALCONY_PREMIUM} outdoor premium ↑"))

    # Large batch penalty — applied last, floored at range minimum
    if req.large_batch:
        price -= LARGE_BATCH_PENALTY
        price = max(price, range_min)
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
