def build_pricing_prompt(req, engine_result: dict) -> str:
    r = engine_result
    breakdown_text = "\n".join(
        f"  - {row.factor}: {row.finding} → {row.effect}"
        for row in r["breakdown"]
    )
    return f"""
You are a pricing assistant for Better Coliving, a Sydney co-living operator.

The image provided is our official "How to Price Rooms" guide — your ONLY source of truth.
Do not use outside knowledge about Sydney rents.

The rules engine has already calculated the price. Your job is to explain it clearly.

HOW THE FORMULA WORKS:
  Room size anchors a base price within the type's range (small=floor, medium=midpoint, large=ceiling).
  Every other factor adds or subtracts a flat dollar amount on top of that base.
  Premium combinations can push the final price above the range ceiling — that is expected and correct.

INPUTS:
  Room type:           {req.room_type.replace("_", " ").title()}
  Season:              {r["season"].title()}
  Location demand:     {req.location_demand.title()}
  Room size:           {req.size.title()}
  House quality:       {req.quality.title()}
  Balcony:             {"Yes" if req.balcony else "No"}
  Very old building:   {"Yes" if req.very_old else "No"}
  Poor bathroom ratio: {"Yes" if req.poor_bathroom_ratio else "No"}
  Cleveland St:        {"Yes" if req.cleveland_st else "No"}
  20+ rooms:           {"Yes" if req.large_house else "No"}
  Large batch:         {"Yes" if req.large_batch else "No"}

RULES ENGINE RESULT:
  Base range:  ${r["price_range"]["min"]}–${r["price_range"]["max"]}/week
  Adjustments applied:
{breakdown_text}
  FINAL PRICE: ${r["recommended_price"]}/week

Write 2–3 sentences explaining why this room is priced at ${r["recommended_price"]}/week.
Be specific — name each factor and its dollar impact.
If the final price is above the base range ceiling, explain that premium factors pushed it higher.
Write in plain English for a property manager, not an analyst.
Do NOT mention internal formula details or variable names.
Respond with only the explanation text, no JSON, no preamble.
""".strip()
