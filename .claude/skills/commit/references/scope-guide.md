# honeypot-client Git Scope Guide

Use this guide when selecting branch names, commit scopes, PR title scopes, and logical commit groups.

## Runtime Discovery

Prefer changed files over guesses:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" auto
```

Use `staged` when the user specifically asks about staged changes:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" staged
```

## Scope Priority

Choose the most specific meaningful scope:

1. Feature/domain area (derive from changed `src/features/*` or `src/entities/*` directory name)
2. FSD layer such as `features`, `entities`, `widgets`, or `shared`
3. Cross-cutting scope such as `harness`, `docs`, `ci`, `config`, or `global`

## Common Scope Mapping

| Changed Area                                     | Preferred Scope                   | When to Use                                   |
| ------------------------------------------------ | --------------------------------- | --------------------------------------------- |
| `src/features/<domain>`                          | `<domain>` (derive from dir name) | Feature-level user action or form changes     |
| `src/entities/<domain>`                          | `<domain>` (derive from dir name) | Domain types, API functions, or query hooks   |
| `src/views/<page>`, `src/app/<page>`             | `<page>` (derive from dir name)   | Page composition or routing changes           |
| `src/shared/**`                                  | `shared`                          | Shared utilities, hooks, styles, or API infra |
| `.claude/**`                                     | `harness`                         | Agent, skill, rule, hook, or settings changes |
| `.github/**`                                     | `ci`                              | Workflow or PR template changes               |
| `docs/**`, `README.md`, `CLAUDE.md`, `AGENTS.md` | `docs`                            | Documentation-only changes                    |
| Tooling config                                   | `config`                          | TypeScript, ESLint, Prettier, Next, package   |

## Commit Type Selection

| Type       | Use For                                              |
| ---------- | ---------------------------------------------------- |
| `feat`     | User-visible capability or new app behavior          |
| `fix`      | Bug fix or regression fix                            |
| `refactor` | Internal restructuring without behavior change       |
| `style`    | Visual styling or formatting-only UI changes         |
| `chore`    | Harness, tooling, dependency, or maintenance changes |
| `docs`     | Documentation-only changes                           |
| `test`     | Test-only changes                                    |
| `ci`       | GitHub Actions or CI changes                         |

## Examples

```text
chore(harness): add Git workflow automation
fix(auth): align form defaults with schema
feat(shared): add axios interceptor
docs: update setup instructions
```
