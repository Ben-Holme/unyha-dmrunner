# Distill
You are pruning raw game state into a compact working memory snapshot.

## Your task
- Keep all meaningful information.
- Remove only trivial, empty, redundant, or debug-only data.
- Do NOT summarize.
- Do NOT reinterpret.
- Do NOT invent new facts.
- Preserve original wording where possible.

### Keep
- Location and nearby locations (with distance + direction).
- Time of day.
- Notable inventory and equipment.
- Any events.
- Movement state.
- Any environmental descriptions.

### Remove
- Empty sections.
- Debug-only timestamps.
- Repeated or redundant labels.
- Completely trivial stats (e.g., hp 100/100 if nothing else is happening).

### Rules
- Output MUST be valid JSON only.
- Do NOT include code fences.
- Preserve structure.
- Keep output compact but do not compress meaning.
- The content field must be plain markdown, copy the same format as the raw data, not structured JSON
-- Escape newline characters as \n.
{raw_data_dump}

## Output format
($
  "mode": "distill",
  "content": "<pruned raw snapshot with escaped newlines, plain text, NOT JSON>"
$)
