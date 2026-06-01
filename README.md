# leagueStudies Riot API match-v5 reference

A single-page technical reference for ingesting League of Legends match data from the Riot public API, aimed at developers building data tools.

## What it covers

The correct call chain from a Riot ID to a full match timeline:

1. **PUUID** — resolve `gameName#tagLine` via `account-v1`
2. **Match IDs** — paginated history from `match-v5 /by-puuid`
3. **Match detail** — final-state stats (KDA, items, gold, objectives)
4. **Timeline** — per-minute snapshots + discrete events

Plus three "gotchas" that cause silent bugs:
- Regional routing (`europe` / `americas` / `asia`) vs platform IDs (`euw1`, `na1`)
- Which event types actually exist in `events[].type` (jungle camps don't)
- Numeric ID resolution via Data Dragon (champions, items, queues)

## Stack

Plain HTML + CSS + vanilla JS. No build step, no dependencies. Open `index.html` in a browser.

## Audience

Spanish-speaking developers; all copy is in Spanish.
