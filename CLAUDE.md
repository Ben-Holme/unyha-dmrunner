# CLAUDE.md — AI Assistant Guide for `unyha-dmrunner`

This file provides context, conventions, and workflows for AI assistants (Claude Code and similar tools) working in this repository.

---

## Repository Overview

**Repository:** `Ben-Holme/unyha-dmrunner`

This repository is in its initial state. Update this section as the project evolves to describe:
- What the application does
- Its primary language(s) and runtime
- Who uses it and how it is deployed

---

## Repository Structure

Document the directory layout here as the project grows. Example template:

```
unyha-dmrunner/
├── CLAUDE.md           # This file
├── README.md           # User-facing documentation
├── .gitignore
├── src/                # Application source code
├── tests/              # Test suite
├── docs/               # Additional documentation
└── ...
```

---

## Development Workflow

### Branching Strategy

- **Main branch:** `main` (or `master`) — stable, production-ready code
- **Feature branches:** `feature/<short-description>`
- **Bug fix branches:** `fix/<short-description>`
- **AI-generated branches:** `claude/<description>-<session-id>` (automatically created by Claude Code)

### Common Git Operations

```bash
# Create and switch to a new feature branch
git checkout -b feature/my-feature

# Stage and commit changes
git add <files>
git commit -m "feat: concise description of change"

# Push branch and set upstream
git push -u origin <branch-name>
```

### Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code restructuring without behaviour change |
| `test:` | Adding or updating tests |
| `chore:` | Build system, dependency updates, CI changes |

Example: `feat: add DM routing logic for new provider`

---

## Build & Test

> Fill in the actual commands once the project is bootstrapped.

```bash
# Install dependencies
<install command>

# Run the application locally
<run command>

# Run tests
<test command>

# Lint / format
<lint command>
```

---

## Code Conventions

Document project-specific conventions here as they emerge. Common areas to cover:

- **Language / runtime version** (e.g., Node 22, Python 3.12, Go 1.22)
- **Formatter / linter** (e.g., ESLint + Prettier, Black + Ruff, gofmt)
- **Import order** rules
- **Naming conventions** (files, variables, functions, types)
- **Error handling patterns**
- **Logging approach**

---

## Key Files to Know

| File/Directory | Purpose |
|----------------|---------|
| `CLAUDE.md` | AI assistant guide (this file) |
| *(add more as the project grows)* | |

---

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Read before editing** — always read a file before modifying it.
2. **Stay focused** — only change what is necessary for the task; avoid unrelated refactors.
3. **Follow existing style** — match indentation, naming, and patterns already in the codebase.
4. **Write targeted commits** — one logical change per commit with a clear message.
5. **Use the correct branch** — develop on `claude/<description>-<session-id>` branches; never push directly to `main`.
6. **Never force-push** to `main` or shared branches.
7. **Test before pushing** — run the test suite and linter before committing.
8. **Update this file** — if you discover new conventions or structure, update CLAUDE.md.

---

## Security Notes

- Do not commit secrets, credentials, API keys, or `.env` files.
- Validate all external input at system boundaries.
- Avoid introducing common vulnerabilities (OWASP Top 10): SQLi, XSS, command injection, etc.

---

*Last updated: 2026-03-04. Keep this file current as the project evolves.*
