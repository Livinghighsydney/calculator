from datetime import date
from app.schemas.pricing import PricingRequest, BreakdownRow

RANGES = {
    "standard":            {"summer": (340, 370), "winter": (295, 330)},
    "very_small_standard": {"summer": (320, 320), "winter": (270, 285)},
    "ensuite":             {"summer": (395, 410), "winter": (350, 370)},
    "studio":              {"summer": (420, 470), "winter": (375, 420)},
}

# Size anchors the base price: small = range floor, medium = midpoint, large = ceiling
SIZE_POSITION = {"small": 0.0, "medium": 0.5, "large": 1.0}

# All remaining factors are flat dollar adjustments stacked on top of the base price.
# This lets premium combinations push above the range ceiling, which the old
# position-within-range approach could never do.
LOCATION_ADJ   = {"high": 25,  "average": 0,   "low": -25}
QUALITY_ADJ    = {"modern": 15, "older": -15}
BALCONY_ADJ          =  20
VERY_OLD_ADJ         = -30
POOR_BATHROOM_ADJ    = -20
CLEVELAND_ST_ADJ     = -20
LARGE_HOUSE_ADJ      = -15
LARGE_BATCH_ADJ      = -20


def get_season(month: int | None = None) -> str:
    m = month if month is not None else date.today().month
    return "winter" if 4 <= m <= 8 else "summer"


def _round5(v: float) -> int:
    return int(round(v / 5) * 5)


def _fmt(adj: int) -> str:
    return f"+${adj}" if adj > 0 else f"−${abs(adj)}"


def calculate(req: PricingRequest) -> dict:
    season = get_season(req.month)
    range_min, range_max = RANGES[req.room_type][season]
    span = range_max - range_min

    breakdown: list[BreakdownRow] = []

    # Season + room type establish the base range
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

    # Size anchors the starting price within the range
    base_price = _round5(range_min + SIZE_POSITION[req.size] * span)
    size_effect = {
        "small":  f"${base_price} (range floor)",
        "medium": f"${base_price} (midpoint)",
        "large":  f"${base_price} (range ceiling)",
    }[req.size]
    breakdown.append(BreakdownRow(factor="Room Size", finding=req.size.title(), effect=size_effect))

    price = base_price

    # Flat adjustments — can push price above or below the base range
    loc_adj = LOCATION_ADJ.get(req.location_demand, 0)
    if loc_adj != 0:
        price += loc_adj
        breakdown.append(BreakdownRow(
            factor="Location",
            finding=req.location_demand.title() + " demand",
            effect=_fmt(loc_adj)
        ))
    else:
        breakdown.append(BreakdownRow(factor="Location", finding="Average demand", effect="No adjustment"))

    q_adj = QUALITY_ADJ[req.quality]
    price += q_adj
    breakdown.append(BreakdownRow(
        factor="House Quality",
        finding="Modern" if req.quality == "modern" else "Older style",
        effect=_fmt(q_adj)
    ))

    if req.balcony:
        price += BALCONY_ADJ
        breakdown.append(BreakdownRow(factor="Balcony", finding="Yes", effect=_fmt(BALCONY_ADJ)))

    if req.very_old:
        price += VERY_OLD_ADJ
        breakdown.append(BreakdownRow(factor="Building Condition", finding="Very old / deteriorating", effect=_fmt(VERY_OLD_ADJ)))

    if req.poor_bathroom_ratio:
        price += POOR_BATHROOM_ADJ
        breakdown.append(BreakdownRow(factor="Bathroom Ratio", finding="5+ rooms per bathroom", effect=_fmt(POOR_BATHROOM_ADJ)))

    if req.cleveland_st:
        price += CLEVELAND_ST_ADJ
        breakdown.append(BreakdownRow(factor="Cleveland St", finding="Yes", effect=_fmt(CLEVELAND_ST_ADJ)))

    if req.large_house:
        price += LARGE_HOUSE_ADJ
        breakdown.append(BreakdownRow(factor="20+ Room House", finding="Yes", effect=_fmt(LARGE_HOUSE_ADJ)))

    if req.large_batch:
        price += LARGE_BATCH_ADJ
        breakdown.append(BreakdownRow(
            factor="Vacancy Load",
            finding="Large batch",
            effect=f"{_fmt(LARGE_BATCH_ADJ)} to fill faster"
        ))
    else:
        breakdown.append(BreakdownRow(factor="Vacancy Load", finding="Normal batch", effect="No adjustment"))

    return {
        "recommended_price": _round5(price),
        "price_range": {"min": range_min, "max": range_max},
        "breakdown": breakdown,
        "season": season,
    }
