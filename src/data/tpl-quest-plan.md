# Quest Plan

You are deciding what the next quest should advance.

## Active arc

{arc}

## Chronicle — what has been revealed so far

{chronicle}

## Season day: {seasonDay}

Season escalation tiers:
- Days 1–2: mystery hooks, strange clues, uneasy NPCs — no names or answers yet
- Days 3–5: a name surfaces, a location confirmed, a betrayal hinted — mysteries begin resolving
- Days 6–7: confrontation stakes, boss connection explicit, resolution pressure

## Other active arcs this season

{otherArcs}

When season day is 6 or 7: look for narrative bridges between the active arc and other season arcs — shared locations, overlapping NPC roles, or thematic convergence toward the season boss. Route the next quest beat toward a point where arcs can intersect.

## Player context

{context}

## Your task

- If an active arc is provided: select what aspect of the arc to surface or advance next. Stay within what the season day tier allows — do not resolve mysteries ahead of their time. Consider what the chronicle says is already known and build on it without repeating it.
- If season day is 6–7 and other arcs exist: look for convergence opportunities.
- If no active arc is provided: propose a theme that fits naturally from the immediate player context.
- Do NOT invent facts outside the arc and context.
- Output valid JSON only. No code fences.

## Output format

($
  "mode": "plan",
  "theme": "",       // short theme name — if arc-driven, reference the arc aspect being surfaced
  "arcAspect": "",   // which open mystery or escalation element this quest advances (blank if no arc)
  "reasoning": ""    // 2-4 sentences explaining the choice given arc, chronicle, and season day
$)
