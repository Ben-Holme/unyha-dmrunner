# Act: Generate Quest Chain

Generate a 3-step goToLocation quest chain grounded in the player's current situation.
Send the player through 3 distinct nearby locations drawn from the context below.
This chain triggers automatically — no NPC interaction required to begin it.

## Prior analysis

{prior_analysis}

## Prior reason

{prior_reason}

## Distilled context

{situation_context}

## Quest type: goToLocation

Player must travel to a specified world location.
The step completes automatically when the player reaches the location; no NPC interaction required.

Required output fields:
- `advanceItems.items`: set to `charevent:1`
- `advanceItems.special`: set to `#gotolocation:{location name}` — use the location name exactly as written in the context
- `specialBlob`: must include `#autocomplete` on all non-final steps
- No `objective`, no `reward` on non-final steps

## Chain rules

- Generate exactly 3 steps.
- Choose 3 distinct nearby locations from the context. Use their names verbatim.
- Step 1: first destination. Include `#notrader #autoacceptradius:200 #appearance:invisible #autocomplete` in specialBlob. No `requiredQuest`.
- Step 2: second destination. Set `requiredQuest.completedQuestTitle` to step 1's title. Include `#autocomplete` in specialBlob.
- Step 3: final destination. Set `requiredQuest.completedQuestTitle` to step 2's title. Include a small gold reward (20–50 goldCoin). No `#autocomplete`.
- Descriptions are written as ambient in-world flavour text — no NPC voice. Evocative, concise.
- Use [n] for paragraph breaks inside description strings.
- Do NOT invent locations not present in the context.
- Output valid JSON only. No code fences.

## Output format

($
  "mode": "generate",
  "quests": [
    ($ // Step 1
      "questType": "goToLocation",
      "title": "",
      "description": "",
      "advanceItems": ($
        "items": "charevent:1",
        "special": "#gotolocation:{location name}"
      $),
      "specialBlob": "#notrader #autoacceptradius:200 #appearance:invisible #autocomplete"
    $),
    ($ // Step 2
      "questType": "goToLocation",
      "title": "",
      "description": "",
      "advanceItems": ($
        "items": "charevent:1",
        "special": "#gotolocation:{location name}"
      $),
      "requiredQuest": ($
        "completedQuestTitle": ""
      $),
      "specialBlob": "#autocomplete"
    $),
    ($ // Step 3
      "questType": "goToLocation",
      "title": "",
      "description": "",
      "advanceItems": ($
        "items": "charevent:1",
        "special": "#gotolocation:{location name}"
      $),
      "requiredQuest": ($
        "completedQuestTitle": ""
      $),
      "reward": ($
        "items": "goldCoin:30",
        "message": ""
      $)
    $)
  ]
$)
