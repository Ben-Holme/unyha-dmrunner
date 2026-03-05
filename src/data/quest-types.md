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

## GoToQuestGiver
Player is sent by the current NPC to travel to a different NPC who has the next quest.
Use when linking quest chains across different NPCs or directing the player to another area.
This is always an intermediate step — it carries no reward.
The step completes automatically when the player interacts with the destination NPC.

**Chaining rule:** In a multi-step chain, each step's `npcTitle` must be the NPC *giving* that step — which is the destination NPC from the previous step. The `advanceItems.special` points to the *next* destination.

Example of a two-step GoToQuestGiver chain:
- Step 1 is given by NPC A (`npcTitle: "NPC A"`), sends player to NPC B (`#gototrader:NPC B`)
- Step 2 is given by NPC B (`npcTitle: "NPC B"`), sends player to NPC C (`#gototrader:NPC C`)

Required output fields:
- `npcTitle`: title of the NPC giving this step — title ONLY, no name, must start with "the " (e.g. "the Warden", "the Iron Smith")
- `advanceItems.items`: set to `charevent:1`
- `advanceItems.special`: set to `#gototrader:{destination NPC title}` — title only, no name, must start with "the "
- `specialBlob`: must include `#autocomplete` (all non-final steps)
- No `objective`, no `reward` on this step

Example:
($
  "npcTitle": "the Ash Warden",
  "title": "...",
  "description": "...",
  "advanceItems": ($
    "items": "charevent:1",
    "special": "#gototrader:the Iron Smith"
  $),
  "specialBlob": "#autocomplete"
$)

---

## goToLocation
Player must travel to a specified world location.
Use when the narrative sends the player to a place rather than a person — a ruin, a camp, a road junction, etc.
The step completes automatically when the player reaches the location; no NPC interaction required.

Required output fields:
- `advanceItems.items`: set to `charevent:1`
- `advanceItems.special`: set to `#gotolocation:{location name}` — the world location the player must reach
- `specialBlob`: must include `#autocomplete`
- No `objective`, no `reward` on this step (unless it is the final step in a chain)

Example:
($
  "title": "...",
  "description": "...",
  "advanceItems": ($
    "items": "charevent:1",
    "special": "#gotolocation:The Ashford Crossing"
  $),
  "specialBlob": "#autocomplete"
$)

---

## reachTitle
Player must accumulate enough fame to hold a specified title or above.
Use when a quest giver will only deal with a player of sufficient standing, or when reaching a title is itself the goal of a quest chain step.
The step completes automatically when the player's title reaches the required rank; they do not need to return to an NPC.

Required output fields:
- `objective.special`: set to `#reachtitle:{title}` — the exact title the player must reach (e.g. `#reachtitle:Proven`)
- `specialBlob`: must include `#autocomplete`
- No `objective.itemid`, no `objective.amount`

Example:
($
  "title": "...",
  "description": "...",
  "objective": ($
    "special": "#reachtitle:Proven"
  $),
  "specialBlob": "#autocomplete"
$)

---

## reachSkillLevel
Player must train a specified skill to a target level.
Use when a quest giver requires demonstrated proficiency, or when skill growth is the narrative focus of a step.
The step completes automatically when the player's skill reaches the required level; they do not need to return to an NPC.

Required output fields:
- `skillName`: string — the skill the player must level (e.g. `"Smithing"`)
- `skillLevel`: int — the target level the player must reach
- `specialBlob`: must include `#autocomplete`
- No `objective`

Example:
($
  "title": "...",
  "description": "...",
  "skillName": "Smithing",
  "skillLevel": 5,
  "specialBlob": "#autocomplete"
$)
