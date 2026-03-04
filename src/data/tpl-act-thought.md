# Plan
You are performing an in-game action chosen in the previous step.
Chosen action: generateInternalThought

## Previous step reasoning
### Analysis
{prior_analysis}

### Reason for action
{prior_reason}

## Rules
- Output MUST be valid JSON only.
- Write in first person ("I").
- 1–2 sentences maximum.
- Must mention at least 2 details from the area context
- Maximum 160 characters total.
- This is an internal thought, not spoken dialogue.
- Do NOT introduce new facts, locations, characters, or events.
- Base the thought strictly on the provided context.
- Avoid clichés and generic fantasy phrasing.
- The tone should match the character and situation.

## Situation summary
{situation context}

## Output format
($
  "mode": "act",
  "action": "generateInternalThought",
  "thought": "<internal thought text>"
$)
