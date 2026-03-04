## goto
Player must travel to a specific trader (quest giver / NPC) and interact with them.
Use when the quest involves meeting, reporting to, or trading with a named trader at a location.

Required output fields:
- `advanceItems.items`: set to `charevent:1`
- `advanceItems.special`: set to `#gototrader:{trader's title}` — replace with the actual trader title
- `characterTitle`: the title of the trader giving the quest (same value used in the special string)

Example:
($
  "title": "...",
  "description": "...",
  "advanceItems": ($
    "items": "charevent:1",
    "special": "#gototrader:The Old Tanner"
  $),
  "characterTitle": "The Old Tanner",
  "reward": ($
    "items": "goldCoin:30",
    "message": "..."
  $)
$)
