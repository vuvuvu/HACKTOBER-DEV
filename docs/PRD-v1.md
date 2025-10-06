# Product Requirements Document – Hacktober‑Dev

## Overview

Hacktober‑Dev is a GitHub App and CLI that playfully measures the “hackiness” of a software developer’s workflow.  It analyses pull requests and repository history to compute a **Hack Index** and surfaces concrete behaviours (habits) that developers can improve.  The tone is tongue‑in‑cheek but the intent is constructive: to encourage better practices around code review size, CI hygiene, documentation and commit messages.

## Goals

* **Awareness.** Help developers understand their own habits by surfacing metrics and patterns that correlate with hacky behaviour.
* **Guidance.** Provide actionable suggestions for improving practices (e.g. break up large PRs, write better commit messages, update docs).
* **Fun.** Embrace humour and Hacktoberfest spirit while avoiding harassment.  The experience should be opt‑in and light‑hearted.
* **Extensibility.** Allow the community to contribute new metrics, habit detectors and levels via JSON definitions or plug‑in modules.

## Non‑Goals

* **Ranking developers.** The Hack Index is not intended for performance reviews, hiring or firing decisions.  No leaderboards or public rankings.
* **Language‑specific analysis.** The first version focuses on language‑agnostic signals (PR size, CI runs, docs).  Language‑specific static analysis may be added later.
* **Perfect accuracy.** The tool should err on the side of fun and simplicity rather than perfect precision.

## Users

* **Individual developers** curious about their habits.
* **Mentors and educators** looking for talking points to coach learners on better practices.
* **Open source maintainers** who want to encourage smaller PRs and better documentation from contributors.

## Success metrics

* **Adoption** – number of installations of the GitHub App and runs via CLI.
* **Engagement** – percentage of PRs where developers view and respond to the hack index report.
* **Community contributions** – number of new metrics, habits and levels contributed during Hacktoberfest.
* **Qualitative feedback** – issues or discussions indicating that the tool encouraged behaviour change.

## Functional requirements

1. **GitHub App**
   - Listens to `pull_request.opened` and `pull_request.synchronize` events.
   - Computes metrics for the current PR (size, CI first‑try success, docs touched).
   - Evaluates habit detectors against metrics.
   - Posts or updates a single comment on the PR with a markdown report.
2. **Metrics**
   - PR size ratio: indicator that the PR changed more than an 800‑line threshold.
   - First‑try green ratio: fraction of check runs that succeed on the first run.
   - Documentation touch flag: true if docs are updated when code changes.
   - Additional metrics can be added in future via plug‑ins.
3. **Habit detectors**
   - Defined by JSON files conforming to `schema/habit.schema.json`.
   - Evaluate a single metric using a comparison operator and threshold.
   - Emit guidance when triggered.
4. **Hack levels and profile levels**
   - Defined in JSON files conforming to `hack-level.schema.json` and `profile-level.schema.json`.
   - Not yet used in the first vertical slice but available for contributors to extend.
5. **CLI / local mode** (future)
   - Developers can run the tool against a local repository to compute their own hack index.
6. **Configuration** (future)
   - A `.hackometer.yml` file allows overriding thresholds, enabling/disabling rules and opting out of the report.

## Non‑functional requirements

* **Performance.** PR analysis should complete within a few seconds to avoid delaying CI feedback.
* **Privacy.** Only public repository data or data authorised via the GitHub App installation is used.  No personal information is collected.  Telemetry is opt‑in.
* **Reliability.** The GitHub App should gracefully handle API failures and never block merges.
* **Security.** All dependencies are pinned; the app never executes untrusted code.  The GitHub App runs in a stateless environment.

## Architecture

* **Probot app (Node 20)** running on a serverless platform (e.g. AWS Lambda or Kubernetes).  The entrypoint is `src/index.ts`.
* **GitHub webhooks** trigger the app to analyse pull requests.
* **Octokit GraphQL/REST** APIs are used to fetch PR details, check runs and file lists.
* **JSON definitions** live in the repository (`levels/`, `habits/`, `profiles/`) and are validated at build time by a CI script.
* **Reporting** is done via GitHub issue comments.  A hidden HTML comment is used to find and update the previous report.

## Data model

* **MetricResult** – simple structure containing numeric ratios and booleans for each metric.
* **HabitDefinition** – JSON object specifying a metric, a comparison operator, a threshold and guidance text.
* **HackLevel** – JSON object mapping metrics to threshold rules; triggers playful levels like “Merge Goblin”.
* **ProfileLevel** – JSON object mapping aggregated metrics and score ranges to levels like “Habitual Offender”.

## Permissions and privacy

The GitHub App requires the following scopes:

* **Read** access to pull requests and checks to compute metrics.
* **Write** access to issues to post comments.

The app does not collect or transmit personally identifiable information.  It reports only aggregated metrics.  Telemetry about usage will be opt‑in and anonymised.

## Contribution model

* Contributors add new definitions under `levels/`, `profiles/profile-levels/` and `habits/` as JSON files.  A validation script run in CI ensures that they conform to their schemas.
* Contributors can implement new detectors in TypeScript under `src/habits/` and import them in `src/habits.ts` (future work).
* A Code of Conduct and contributing guidelines govern community interactions.

## Risks and mitigations

* **Abuse of scores.** To prevent misuse, the README and code of conduct emphasise responsible use, and the tool avoids public leaderboards.
* **False positives.** Metrics may not always reflect intent.  The guidance encourages developers to consider context.
* **Maintainer load.** A clear governance process and “good first issues” will help manage contributions during Hacktoberfest.

## Milestones

1. **Vertical slice (MVP).**
   - Probot app scaffolded in TypeScript.
   - Basic metrics (PR size ratio, first‑try green ratio, docs touch flag).
   - Habit detectors loaded from JSON definitions.
   - Report posted as a comment on pull requests.
2. **Configuration and rule packs.**
   - Support `.hackometer.yml` for per‑repo configuration.
   - Allow enabling/disabling metrics and setting custom thresholds.
3. **Profile scanning.**
   - Separate GitHub App endpoint or CLI to scan a user’s recent PRs across repos and compute a profile hack index.
4. **Plugin API.**
   - Allow detectors written in separate packages (Node, Python, etc.) to emit findings into a standard evidence schema.

## Acceptance criteria

* The app can be installed on a repository and will post a hack index report on PR creation or update.
* The report contains at least the three base metrics and any triggered habits.
* All JSON definitions in the repo validate against their schemas.
* The CI workflow passes on the default branch.
