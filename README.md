# SEDL!
## Overview
SEDL! is a turn-based game simulating a clash of civilizations.

<p align="center">
  <img src="https://github.com/acarrara/sedl/blob/master/SEDL.png" alt="SEDL" />
</p>

There are two players, called *Lords*. They live in the same world and fight for survival. 
Every Lord starts with one *settlement* on a *region*. The goal of a Lord is to control all the settlements in the world.

A *domain* is a set of adjacent regions. A region could be *plain*, *water*, *forest*, *hill*, *mountain*, or *settlement*.

A Lord harvest their domains at the beginning of their turn. Goods provide coins. Lords spend coins to expand their domain.

Lords can *colonize*, *conquer*, *settle* and *fortify* regions. They can do these only on regions next to a domain containing at least a settlement. Lords can *rally*, too.

## Terrains
### Plain
Standard terrain. Easiest to colonize and conquer, low in resources — food.
### Water
Easy to colonize and conquer, low in resources — food. Lords can’t build settlements on water.
### Forest
Some difficulty to colonize and conquer, medium resources — wood, food.
### Hill
Some difficulty to colonize and conquer, low resources — food.
### Mountain
Hard to colonize and conquer, rich in resources — wood, iron.
### Settlement
Settlements are at the mercy of troops if invaded. They also give no resources. They have a maintenance cost — Lord's peasants live here. 
Every settlement and its people can sustain up to 100 regions. A Lord needs another settlement to conquer or colonize more regions.

If a Lord loses all of their settlements, they lose the game.

## Actions
### Harvesting
Harvesting happens at the beginning of each turn. The Lord's peasants collect their goods and transform them into coins.
Every type of region has a different worth in coins. The amount collected is the sum of every region's worth. 
### Sustaining
Lords must sustain settlements and fortified regions. After the harvesting, Lords pay the sustenance costs. 
If they don't have enough coins, they must pay for settlements first, so they revoke every fortification. 
If they can't still pay for settlements, the peasants will revolt against the Lord and won't do anything more until the next turn.
Harvesting happens before the sustenance payments, so it wont't affect the treasure.  

### Colonize
Every type of terrain has a different colonization cost. Lords can only colonize regions next to a domain containing at least a settlement.
A colonized plot joins immediately the Lord's domain.
Once colonized, a region is untouchable for three turns.

### Conquer
Cost of conquer in a normal environment for regions is the colonization cost, double.
Lords can only conquer enemy regions next to a domain containing at least a settlement.
Once conquered, a region is untouchable for three turns.

### Fortify
Lords can fortify every colonizable region in their domain — not settlements.
Fortification doubles the cost of conquer for every enemy on that region.

Its cost is equal to the cost of colonization for that region. 
Lords must sustain ongoing fortifications. they can revoke the fortifications, too.

A Lord cannot fortify an already fortified region.

### Settle
Lord can build a settlement on a region. They can only do it twice — they can still own more than three by conquer. When a Lord owns all the settlements on the map, they win the game.
The region is no more colonizable and doesn’t farm. Lords must sustain settlements.

### Rally
A Lord can rally whenever he wants in their turn, but only once per turn.

Rally means that a Lord harvest more for that turn, but ignoring a correct seeding for the next one.
Rally adds 20% of the harvest income for that turn, but also halves the income of the following Lord's turn.

## Coefficients

|Terrain   |Colonize|Harvest|Conquer|Conquer (fortified)|Maintenance|
|----------|--------|-------|-------|-------------------|-----------|
|Plain     |4       |1      |8      |16                 |4          |
|Water     |6       |1      |12     |24                 |6          |
|Forest    |8       |2      |8      |16                 |8          |
|Hill      |6       |1      |12     |24                 |6          |
|Mountain  |10      |3      |20     |40                 |10         |
|Settlement|0       |0      |0      |0                  |4          |

## What does SEDL mean?
You pronounce 'SEDL' as *settle*. I like it.
