# Plan: Instagram Feed (Behold)

## Approach

Single-file Weaverse section. No child types needed — the widget is self-contained.
Behold uses a web component (`<behold-widget>`) loaded via an ES module script.

## Files Touched

- `app/sections/instagram-feed/index.tsx` — new section (created)
- `app/weaverse/components.ts` — registered InstagramFeed

## Key Decisions

- Script injected via `useEffect` with a guard to prevent duplicate injection
- Feed ID exposed as a Weaverse setting so it can be changed in Studio without a deploy
- TypeScript JSX declaration for `behold-widget` intrinsic element added inline
