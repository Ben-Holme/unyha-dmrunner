# Quest Generate

You are generating quest data based on an approved theme. The npc (trader) is the quest giver and the player is the receiver for the quest.

## Theme

{theme}

## Theme reasoning

{reasoning}

## Context

The context below may include named locations with xyz coordinates. Use these coordinates for the `location` field on relevant quest steps.

{context}

## Valid item IDs

Use ONLY IDs from this list for any itemid field or packed item list:
{itemIds}

## Item notes

The following items have special rules or non-obvious behavior:
{itemNotes}

## Quest types

Use ONLY the following quest types. Match the approved theme to the most appropriate type and follow its required output fields exactly:
{questTypes}

---

## specialBlob tags

| Tag                   | Description                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #autoacceptradius:N   | Player auto-accepts quest within N units of the trader. Only set on the FIRST quest in a chain. ONLY use when we want to give the player the quest by simply moving to a location ALWAYS in combination with special "#appearance:invisible" |
| #autocomplete         | Only skip this if we want the player to return to npc to complete. Use this to allow the player to complete the quest remotely as soon as they have the objective; and don't have to travel back to the npc.                                 |
| #noabandon            | Disables the player's option to abandon the quest (e.g. intro quest).                                                                                                                                                                        |
| #notrader             | Quest is registered on the player without originating from a trader (e.g. first step of a quest chain).                                                                                                                                      |
| #removetrader         | Destroys the trader and removes them from the DB after the quest is completed. Must be the last quest in a chain.                                                                                                                            |
| #dontdestroyrequired  | Required items are NOT consumed when the quest is accepted.                                                                                                                                                                                  |
| #dontdestroyobjective | Objective item stays in the player's inventory after completion.                                                                                                                                                                             |
| #pickone              | Player must choose ONE of the reward items.                                                                                                                                                                                                  |
| #newhomeadvance       | Sets a unyhatree location as the player's new home and saves it as a travel location when the quest is accepted.                                                                                                                             |
| #newhomereward        | Sets a unyhatree location as the player's new home and saves it as a travel location when the quest is completed.                                                                                                                            |
| #location:Name        | Overrides the quest location display name.                                                                                                                                                                                                   |
| #appearance:N         | Only use in special cases. Sets the NPC appearance by ID. If omitted, an int is auto-assigned as a seed for a random human appearance + name. Special values: "invisible", "spirit".                                                         |
| #gumptitle:Text       | Overrides the quest window title (default: "quest").                                                                                                                                                                                         |
| #name:Name            | Only use in special cases. Gives the NPC a specific name (placed before the title, e.g. "Lucius" in "Lucius the Wise"). If omitted, a name is picked randomly.                                                                               |
| failmsg:Text          | Overhead message the NPC says when the player lacks requirements.                                                                                                                                                                            |
| successmsg:Text       | Overhead message the NPC says when the player meets requirements.                                                                                                                                                                            |
| acceptbigtext:Text    | Full-screen UI text shown when the player accepts the quest.                                                                                                                                                                                 |
| completetext:Text     | Full-screen UI text shown when the player completes the quest.                                                                                                                                                                               |

## Rules

- Output valid JSON only. No code fences.
- Omit fields that are not relevant (do not include empty strings or null values).
- Keep descriptions flavourful but concise.
- Use [n] (not \n) for paragraph breaks inside description.
- item IDs must come from the Valid item IDs list above.
- packed item lists format: "itemid:amount" joined by commas, e.g. "goldCoin:50,potionCure:2"
- Output a `quests` array. Single-step quests are a one-element array.
- For multi-step chains: each step after the first must set `requiredQuest.completedQuestTitle` to the previous step's `title`. All steps except the last should include `#autocomplete` in `specialBlob`. Only the final step carries the reward.

## Output format

- empty field should be omitted entirely

($
  "mode": "generate",
  "arcBeat": "", // string — one sentence describing what this quest chain reveals or advances in the arc; add this to the chronicle after the session. Omit if no active arc.
  "quests": [
    ($ // Step 1
"questType": "", // string — the quest type used (from Quest types section above)
"title": "", // string — short quest title
"description": "", // string — ALWAYS written as the NPC's spoken words (first person, in-character). Exception: if #nonpc is in specialBlob, write as the player character's internal thoughts instead. Use [n] as paragraph separator.
"directTrade": false, // bool — true if simple trade quest (give items, get reward), no NPC dialogue needed
"location": "", // string — optional waypoint for the player; use xyz coords from context (e.g. "100,200,300") or a named location if no coords are available
"npcTitle": "", // string — title ONLY, NEVER a name. Must start with "the ". e.g. "the Keeper", "the Iron Smith". The system assigns a random name separately.
"objective": ($ // item the player must collect / deliver
"itemid": "", // string — real itemid from Valid item IDs list (or blank)
"amount": 1, // int — quantity required
"nameOverride": "", // string — display name override (optional)
"special": "" // string — extra tag / flag (optional)
$),
      "requiredItems": ($ // items player must already have to accept quest, use this only when it's evidently and logically important
"items": "", // string — packed list "itemid:amount,itemid:amount"
"special": "" // string — special tag applied to FIRST item only
$),
      "requirementFailMessage": "", // string — message shown when player lacks required items; only required if there are required items or quests
      "advanceItems": ($ // items handed to the player when they accept the quest, in advance
"items": "", // string — packed list
"special": "", // string — special tag on FIRST item
"nameOverride": "" // string — display name override
$),
      "shortDescriptionMessage": "", // string — one-line reminder shown in active-quest tracker
      "reward": ($ // items given as reward — typically only on the FINAL step
"items": "goldCoin:50", // string — packed list
"special": "", // string — special tag on FIRST item
"nameOverride": "", // string — display name override
"message": "" // string — message shown on quest completion
$),
      "requiredQuest": ($ // omit on step 1; set on each subsequent step
"activeQuestTitle": "", // string — quest that must be ACTIVE for this quest to show
"completedQuestTitle": "" // string — set to previous step's title to chain steps
$),
      "specialBlob": "" // string — space-separated #tags; include #autocomplete on all non-final steps
    $)
  ]
$)
