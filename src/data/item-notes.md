## charEvent

Triggers a named engine event. Only use when a quest type in the Quest types section instructs you to. Follow the exact `special` string format specified for that type — the format is fixed and the engine will not recognize variations.

## fame

Special currency item tracking player reputation level. Use as a reward item to grant fame points. Do not use as an objective, requiredItem, or advanceItem.

## objective

Internal quest-tracking item managed by the engine. Do not use directly in quest generation.

## key / keyBlank

key: a specific locked-door key. keyBlank: an unconfigured key that can be cut.

## recallRune

A magical rune that allows teleportation to a marked location. Use as a reward or required item for travel/escape quests.

## letter

A written letter or note item. Useful as a deliver-this objective or as a requiredItem when the player must carry correspondence.

## oldstoryitem

A lore artifact tied to the persistent world history. Pulls a random item from the lost story items pool. Hard to think of use cases other than magical ones where Unyha randomly grants a story item from the past. Don't use unless it matches the situation.

## deedRescueBelongings

A special deed for rescuing lost belongings. Use as an objective or reward for recovery quests.

## vendorDeed

A deed granting vendor rights. High-value reward item for significant quests.

## houseDeed

Property deeds (small stone house, wood house, plaster tower, stone tower). High-value rewards. Do not use as objective or advance items.

## tamedDeed

A deed for a tamed animal. Reward item for taming-related quests.

## pearlOfPower

A rare magical item. Use as a high-value reward or rare objective.

## ringOfFire / ringOfTheCircle

Faction-specific rings. ringOfTheCircle is tied to The Circle faction — use in quests involving that faction.

## spellbook / spellbook2

Spellbooks that teach magic. Use as rewards for magic-related quests.

## tomeDmg

A tome that boosts damage. Use as a reward for combat quests.
