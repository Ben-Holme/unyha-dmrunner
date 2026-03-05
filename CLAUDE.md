# CLAUDE.md — AI Assistant Guide for `unyha-dmrunner`

This file provides context, conventions, and workflows for AI assistants (Claude Code and similar tools) working in this repository.

---

## Project Overview

**unyha-dmrunner** is a browser-based DM Runner (Dungeon Master Runner) tool for the fantasy RPG **Unyha**. It is a developer/game-master utility — not a player-facing app — used to drive and test AI agent pipelines that generate in-game NPC behaviour and quest content.

The tool communicates with the **OpenAI API (GPT-4o)** and runs a structured multi-stage prompt pipeline to produce grounded, world-consistent game content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (JSX, functional components) |
| Build tool | Vite 7 |
| Package manager | **Yarn with Plug'n'Play** (no `node_modules` directory) |
| Language | JavaScript (`.js` / `.jsx`) — no TypeScript |
| Linter | ESLint 9 (flat config) with `react-hooks` and `react-refresh` plugins |
| API | OpenAI `/v1/chat/completions` — model `gpt-4o` |

---

## Repository Structure

```
unyha-dmrunner/
├── CLAUDE.md                   # This file
├── README.md                   # Default Vite/React template readme (not project docs)
├── index.html                  # Vite entry HTML
├── vite.config.js              # Vite config (React plugin only)
├── eslint.config.js            # ESLint flat config
├── package.json                # Dependencies and scripts
├── yarn.lock / .pnp.cjs / .pnp.loader.mjs  # Yarn PnP files — do not edit
├── .yarn/                      # Yarn internals
├── .claude/settings.local.json # Claude Code local permission overrides
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx                # React entry point — mounts <App />
    ├── App.jsx                 # *** Single monolithic component — all app logic ***
    ├── App.css                 # Component styles
    ├── index.css               # Global styles (minimal)
    ├── assets/
    │   └── react.svg
    └── data/                   # Markdown prompt templates (loaded as raw strings)
        ├── sys-world.md        # System prompt: Unyha world rules
        ├── sys-agent.md        # System prompt: agent pipeline rules
        ├── tpl-distill.md      # Stage 1 template: compress raw game state
        ├── tpl-plan.md         # Stage 2 template: choose an action
        ├── tpl-act-thought.md  # Stage 3 template: generate internal NPC thought
        ├── tpl-act-outpost.md  # Stage 3 template: generate road outpost encounter
        ├── spec-thought.md     # Action spec: when to use generateInternalThought
        ├── spec-outpost.md     # Action spec: when to use generateRoadOutpost
        ├── tpl-quest-plan.md   # Quest gen stage 1: approve/reject theme
        ├── tpl-quest-gen.md    # Quest gen stage 2: generate quest JSON
        ├── quest-types.md      # Quest type definitions and output contracts
        ├── items.md            # Valid item ID list for quest generation
        └── item-notes.md       # Special rules for specific items
```

---

## Application Architecture

### Single Component Design

All application logic lives in `src/App.jsx`. It is intentionally monolithic — do not split into sub-components without good reason.

### Two Parallel Pipelines

The app has two independent tool modes, each with its own state and controls:

#### 1. DM Runner (NPC / Encounter Pipeline)

A three-stage sequential agent loop:

```
distill → plan → act
```

| Stage | Template | Purpose |
|---|---|---|
| `distill` | `tpl-distill.md` | Compress raw game state into a compact working-memory snapshot |
| `plan` | `tpl-plan.md` | Choose one action: `generateInternalThought`, `generateRoadOutpost`, or `none` |
| `act` | `tpl-act-thought.md` or `tpl-act-outpost.md` | Execute the chosen action |

**State variables:** `ctx`, `sys`, `tpl`, `specs`, `stages`, `active`, `running`, `done`, `log`, `abort`

**Key functions:**
- `call(key, userMsg)` — makes a single OpenAI API call, returns parsed JSON
- `run()` — orchestrates the full distill → plan → act pipeline
- `stop()` / `reset()` — abort and clear pipeline state
- `buildSys()` — concatenates `sys.worldContext.body` + `sys.agentRules.body` into a single system prompt

#### 2. Quest Generator Pipeline

A two-stage pipeline:

```
plan (theme approval) → generate (quest JSON)
```

**State variables:** `qCtx`, `qTpl`, `qStages`, `qActive`, `qRunning`, `qDone`, `qLog`, `qAbort`

**Key functions:** `qCall`, `qRun`, `qStop`, `qReset`, `qRenderStage`

### Template Interpolation

Prompt templates use `{placeholder}` syntax for variable substitution. Substitution is done with simple `String.replace()` calls inside `run()` / `qRun()`.

### Custom JSON Fence Notation

Prompt templates use `($` and `$)` instead of `{` and `}` for JSON examples. This avoids conflicts with JavaScript template literal interpolation when the templates are embedded in JS strings.

### Data Loading

All `src/data/*.md` files are imported using Vite's `?raw` suffix:
```js
import _SYS_WORLD from "./data/sys-world.md?raw";
```
Changes to `.md` files take effect on the next dev server HMR reload.

### API Configuration

The OpenAI API key is read from the environment variable `VITE_OPENAI_API_KEY`:
```js
const apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? "";
```
Create a `.env` file at the project root (never commit it):
```
VITE_OPENAI_API_KEY=sk-...
```

### Presets

`PRESETS` in `App.jsx` contains hardcoded player context snapshots (character profiles, stats, inventory, location) used to quickly populate the context input for testing. Add new presets to this array.

---

## Development Workflow

### Setup

```bash
# Install dependencies (Yarn PnP — no node_modules)
yarn install

# Start dev server with HMR
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint
yarn lint
```

> **Yarn PnP:** There is no `node_modules/` directory. Dependencies are resolved via `.pnp.cjs`. Do not run `npm install` or delete PnP files.

### Environment

Copy `.env.example` to `.env` (or create `.env`) and set your OpenAI key:
```
VITE_OPENAI_API_KEY=sk-...
```

### Branching

- **`main`** — stable, committed from developer's machine
- **`claude/<description>-<session-id>`** — AI-generated branches (auto-created by Claude Code)

### Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New feature or pipeline stage |
| `fix:` | Bug fix |
| `docs:` | Documentation (including `.md` data files) |
| `refactor:` | Code restructuring without behaviour change |
| `chore:` | Build config, deps, tooling |

---

## Code Conventions

- **Language:** JavaScript + JSX. No TypeScript. No `.ts`/`.tsx` files.
- **Imports:** Named React hooks (`useState`, `useRef`) imported explicitly.
- **Styling:** Inline style objects for component-level styles; `App.css` for class-based styles.
- **ESLint rule:** `no-unused-vars` ignores variables matching `/^[A-Z_]/` — uppercase constants imported from data files are exempt.
- **No test suite** currently exists. Manual testing via the UI with presets.
- **No external state management** (no Redux, Zustand, etc.) — `useState` only.

---

## Key Files for AI Assistants

| File | When to read it |
|---|---|
| `src/App.jsx` | Any UI or pipeline logic change |
| `src/data/tpl-*.md` | Changing prompt structure or output format |
| `src/data/sys-*.md` | Changing world rules or agent framework rules |
| `src/data/items.md` | Adding/removing valid item IDs |
| `src/data/item-notes.md` | Adding special item behaviour rules |
| `src/data/quest-types.md` | Adding/modifying quest type output contracts |
| `vite.config.js` | Build configuration changes |
| `eslint.config.js` | Linting rule changes |
| `package.json` | Dependency changes |

---

## Unyha World Context (for prompt editing)

When editing prompt templates, preserve these world constraints (from `sys-world.md`):

- Unyha is an open-world fantasy RPG played in discrete **seasons**; centuries pass between seasons.
- Players control a new character each season, building a persistent **House** (family lineage).
- Player characters are **Spiritfolk** (distinct spirit race, medieval goth aesthetic); NPC townsfolk are human.
- **Items** are player-crafted, magically enhanceable, and may become **heirlooms** tied to Houses.
- **World history is persistent** and shaped by player actions.
- Do not invent new races, factions, cosmology, or world rules not already established.

---

## AI Assistant Guidelines

1. **Read before editing** — always read a file before modifying it.
2. **Stay focused** — only change what is necessary; avoid unrelated refactors.
3. **Match existing style** — inline styles, hook patterns, variable naming already in `App.jsx`.
4. **Prompt template changes are high-stakes** — changes to `src/data/*.md` directly affect AI output quality and output format contracts. Be precise.
5. **Never break the output contract** — pipeline stages expect specific JSON shapes. Changing a template's output format requires updating the consuming code in `App.jsx` simultaneously.
6. **Correct branch** — develop on `claude/<description>-<session-id>`; never push to `main`.
7. **Never commit `.env`** or any file containing API keys.
8. **No TypeScript migration** unless explicitly requested.
9. **Update this file** when you discover new conventions or significant structural changes.

---

## Security Notes

- `VITE_OPENAI_API_KEY` is a client-side env var — it will be bundled into the production build. This tool is intended for local/internal developer use only, not public deployment.
- Do not add new `VITE_` secrets that would be exposed in production builds without first discussing the deployment model.
- Validate or sanitise any new external inputs at the boundary before passing to API calls.

---

*Last updated: 2026-03-04. Keep this file current as the project evolves.*
