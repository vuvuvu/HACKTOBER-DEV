---
title: Authoring New Metrics
tags: metrics, calculators, contributors, guide
quick summary: Step‑by‑step guide for adding new hackiness metrics to hacktober-dev
date created: 2025-10-06
date updated: 2025-10-06
---

# 🧭 Authoring New Metrics (Step‑by‑Step)

This guide shows how to add a new metric to hacktober-dev, using the same pattern as the five metrics recently added:

- `conventional-commit-adherence`
- `issue-linking-discipline`
- `revert-hotfix-density`
- `wip-commit-usage`
- `weekend-intensity`

You will:
1) Implement a calculator function in `src/calculators`
2) Export it from `src/calculators/index.ts`
3) Add a metric definition in `data/metrics`
4) Build and verify via the CLI
5) (Optional) Create achievements tied to your metric

No engine/type changes required — calculators take `Commit[]` and return a numeric score.

---

## 1) Design your metric

Clarify what you want to measure and why. Good sources of inspiration:

- `docs/Good vs Bad Programming Quotes.md` — principles from Knuth, Fowler, Beck, Metz, Ousterhout, etc.
- `docs/hackiness-measurement-prd.md` — product framing for balanced, non‑judgmental insights.

Decide:
- Input: can you measure it from commit messages and timestamps only?
- Range: what’s the maximum points this metric should contribute? (`max` in JSON)
- Polarity: is “more” better or worse? (See Calibration & Polarity below.)

Tip: Start with simple heuristics (regex on commit messages, day/time buckets). You can iterate later with diff‑based stats.

---

## 2) Implement the calculator

Create a new file: `src/calculators/<metric-id>.ts`

Calculator signature:

```ts
import { Commit } from '../types';

export function calculateMyNewMetric(commits: Commit[]): number {
  if (commits.length === 0) return 0;
  // 1) compute a ratio or count from commit messages/dates
  // 2) scale to your target range (0..max defined in JSON)
  const ratio = 0; // replace with your logic
  const score = ratio * 10; // example: cap at 10 points
  return Math.round(score * 100) / 100; // keep outputs tidy
}
```

Examples in codebase you can model:
- `src/calculators/conventional-commit-adherence.ts`
- `src/calculators/issue-linking-discipline.ts`
- `src/calculators/revert-hotfix-density.ts`
- `src/calculators/wip-commit-usage.ts`
- `src/calculators/weekend-intensity.ts`

Implementation tips:
- When sorting, consider using a copy (`commits.slice().sort(...)`) to avoid side effects.
- Skip non‑informative messages if needed (e.g., merge commits starting with `Merge`).
- Keep regexes readable; prefer explicit word boundaries for keywords.
- Return a score already scaled to your desired `max` — the analyzer clamps to `max`.

---

## 3) Export the calculator

Add a named export in `src/calculators/index.ts` with the exact function name you will reference in JSON:

```ts
export { calculateMyNewMetric } from './my-new-metric';
```

The analyzer looks up calculators dynamically by this export name.

---

## 4) Define the metric (JSON)

Create `data/metrics/<metric-id>.json`:

```json
{
  "id": "my-new-metric",
  "name": "My New Metric",
  "description": "One‑line human description",
  "weight": 10,
  "calculator": "calculateMyNewMetric",
  "max": 10
}
```

Field notes:
- `id`: kebab‑case identifier used in reports/achievements.
- `calculator`: must exactly match the exported function name.
- `max`: upper bound used by the analyzer to clamp scores.
- `weight`: influences your metric’s contribution to totals/UX (future use).

Examples in the repo:
- `data/metrics/conventional-commit-adherence.json`
- `data/metrics/issue-linking-discipline.json`
- `data/metrics/revert-hotfix-density.json`
- `data/metrics/wip-commit-usage.json`
- `data/metrics/weekend-intensity.json`

---

## 5) Build and verify

```bash
# Type‑check and compile
npm run build

# Analyze current repo (use any Git repo path)
node dist/cli.js --dir . --verbose

# Try another repo path
node dist/cli.js --dir /path/to/another/repo --verbose
```

Troubleshooting:
- If you see “Calculator function not found,” confirm the `calculator` name in JSON matches the exported function in `src/calculators/index.ts`.
- If a metric always shows 0, log a few parsed commits locally to validate your regex/time bucketing.
- `src/reporter.ts` currently assumes a display max of 20 for percentages; this only affects the percentage column, not the actual scores.

---

## 6) (Optional) Add achievements

Create a JSON file in `data/achievements/` and point its `requirement.metric` to your metric `id`:

```json
{
  "id": "my-metric-champion",
  "title": "My Metric Champion",
  "description": "Great performance on My New Metric",
  "requirement": {
    "metric": "my-new-metric",
    "value": 8,
    "operator": ">="
  },
  "badge": "🏆",
  "category": "positive"
}
```

Important: `value` is compared against the metric’s actual score (0..`max`). If you want “80% or higher” and your `max` is 10, set `value` to `8` (not `80`).

Examples:
- `data/achievements/steady-committer.json`
- `data/achievements/night-owl.json`

---

## Calibration & polarity

Different metrics convey different “directions”:
- Positive (higher is better): e.g., conventional commits, issue linking
- Negative (higher is worse): e.g., revert/hotfix density, WIP usage
- Descriptive (neutral): e.g., weekend intensity

Current engine doesn’t encode direction — you express polarity via:
- Calculator design: “negative” metrics can yield higher scores for greater risk.
- Achievements: use `operator` `">="` or `"<="` to reward or spotlight either end.

Practical calibration steps:
- Choose a realistic `max` and scale your score accordingly.
- Sample against a few repos (personal, OSS, small/large) and adjust thresholds.
- Keep regexes conservative to avoid false positives.

---

## Mapping ideas to metrics (from the Quotes doc)

- “Readability counts” / PEP‑8 consistency → message clarity, conventional commits
- “Prefer duplication over the wrong abstraction” → refactor vs. feature balance
- “Do one thing well” → small change scope (future: diff‑based)
- “Premature optimization” → require perf claims to be measured (future: benchmarking signals)
- “Contracts vs behaviors” → deprecation discipline + changelog updates (docs signals)

Start simple with commit‑only heuristics, then iterate with diff/file‑touch signals.

---

## Advanced (optional extensions)

- Diff‑based metrics: use `simple-git` to fetch per‑commit stats (adds/dels, files touched)
- Repo signals: presence of `.editorconfig`, formatters, `/.github/workflows`, `CONTRIBUTING.md`, `CHANGELOG.md`
- Debt density: source scans for `TODO|FIXME|HACK|XXX` normalized by LOC
- Deep mode: add a `--deep` flag to enable heavier analyses behind a user opt‑in

These require passing a richer context to calculators; keep commit‑only metrics simple and fast.

---

## Checklist before opening a PR

- New file in `src/calculators/` with exported `calculate…` function
- Export added to `src/calculators/index.ts`
- JSON in `data/metrics/` with matching `calculator` name and sensible `max`
- CLI runs with `--verbose` and shows your metric row without warnings
- (Optional) Achievement JSON added and reachable (threshold matches metric max)

That’s it — you’ve added a new metric! 🚀

