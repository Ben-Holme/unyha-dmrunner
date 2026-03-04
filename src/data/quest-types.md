## gatherCommonResource
Player must bring a specified quantity of an item the quest giver already accepts as a common commodity.
Use when the narrative frames the player as supplying a cause, group, or individual with a resource they need — arrows, coins, potions, weapons, etc.
The quest giver does not care how the item was obtained; any matching `itemid` in the player's inventory satisfies the objective.
Do NOT set `objective.special` — a unique key must not be required.

Required output fields:
- `objective.itemid`: the item the player must collect
- `objective.amount`: how many are needed
- No `objective.special` — omit entirely

Example:
($
  "title": "...",
  "description": "...",
  "objective": ($
    "itemid": "arrow",
    "amount": 20
  $),
  "reward": ($
    "items": "goldCoin:40",
    "message": "..."
  $)
$)

---

## acquireSpecialMonsterLoot
Player must slay specific monsters until enough custom loot items have been gathered.
Use when the narrative calls for hunting a named enemy type — bandits, orcs, a particular creature — and collecting proof (a head, pelt, trophy, etc.).

While the quest is active, the engine enables a unique monster drop: all monsters whose name matches `monsterName` have a chance to drop the specified item. The dropped item carries a `nameOverride` and a unique `special` string used as a key — the quest only accepts items with that exact `special` value.

The `questDropItem` block is automatically derived from `objective` and `monsterName` — do NOT include it in your output.

Required output fields:
- `objective.itemid`: base item type for the drop (e.g. `"head"`)
- `objective.amount`: how many are required
- `objective.nameOverride`: display name shown to the player (e.g. `"bandit head"`)
- `objective.special`: unique drop key, format `#uniqueid:{short-identifier}` — must be globally unique; keep it short and descriptive
- `monsterName`: the monster name string the engine matches against to enable the custom drop

Example:
($
  "title": "...",
  "description": "...",
  "objective": ($
    "itemid": "head",
    "amount": 3,
    "nameOverride": "bandit head",
    "special": "#uniqueid:banditHeadRoad42"
  $),
  "monsterName": "Bandit",
  "reward": ($
    "items": "goldCoin:60",
    "message": "..."
  $)
$)

---

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
