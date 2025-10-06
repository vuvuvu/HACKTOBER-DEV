# Good Code: Quotes, Sources, Repo Signals, and AI Implications

A working notebook to distill later. Each entry includes a short quote (or slogan), a canonical source link, and pointers to repositories that embody the behavior. The final sections map these principles to observable repo signals and how AI coding tools can mask or boost them.

---

## Curated voices: quotes + sources

### Donald Knuth — focus on real hotspots
> “We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.”  
Source: Knuth, *Structured Programming with go to Statements* (CACM, 1974) — PDF: https://www.cs.tufts.edu/~nr/cs257/archive/don-knuth/structured-programming.pdf  
Alt PDF: https://www.cs.utexas.edu/users/EWD/ewd02xx/EWD268.PDF  

### Martin Fowler — code smells -> refactor
> “A code smell is a surface indication that usually corresponds to a deeper problem in the system.”  
Source: https://martinfowler.com/bliki/CodeSmell.html

### Kent Beck — four rules of simple design (priority order)
> Passes the tests · Reveals intention · No duplication · Fewest elements.  
Source: https://martinfowler.com/bliki/BeckDesignRules.html  
(Background: XP “simple design”).

### Tim Peters (via Guido) — readability counts
> “Readability counts.” (from The Zen of Python)  
Source: https://peps.python.org/pep-0020/

### Guido van Rossum et al. — consistency > cleverness
> PEP 8: Python’s official style guide.  
Source: https://peps.python.org/pep-0008/

### Rob Pike — prefer clarity
> “Clear is better than clever.” (Go Proverbs)  
Sources: https://go-proverbs.github.io/  
Talk: https://www.youtube.com/watch?v=PAAkCSZUG1c

### Sandi Metz — beware wrong abstractions
> “Prefer duplication over the wrong abstraction.”  
Source: *The Wrong Abstraction*: https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction

### Rich Hickey — simple ≠ easy
> “Simple Made Easy.” (simple: one concern; easy: near-at-hand)  
Talk: https://www.youtube.com/watch?v=SxdOUGdseq4  
Transcript (community): https://gist.github.com/jj1bdx/06970c44f6a0892169b4

### Linus Torvalds (& kernel maintainers) — strict style & process
> Linux kernel *CodingStyle* and *SubmittingPatches*.  
Coding style: https://github.com/torvalds/linux/blob/master/Documentation/process/coding-style.rst  
Submitting patches: https://www.kernel.org/doc/html/latest/process/submitting-patches.html

### Bjarne Stroustrup — zero-overhead principle
> “What you don’t use, you don’t pay for.” (abstraction should be free)  
C++ Core Guidelines: https://github.com/isocpp/CppCoreGuidelines  
Talk (zero-overhead theme): https://www.stroustrup.com/ETAPS10.pdf

### Joel Spolsky — pragmatic team hygiene
> “The Joel Test: 12 Steps to Better Code.”  
Source: https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/

### Ward Cunningham — the debt metaphor
> The “technical debt” metaphor (explaining refactoring).  
Video: https://www.youtube.com/watch?v=pqeJFYwnkjE

### Hyrum Wright — contracts vs. behavior
> “With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody.”  
Source: https://www.hyrumslaw.com/

### John Ousterhout — deep modules, shallow interfaces
> “It is more important for a module to have a simple interface than a simple implementation.”  
Book site: https://web.stanford.edu/~ouster/cgi-bin/psd/  
(Alt PDF online for study; buy the book for canonical text.)

### C. A. R. Hoare — simplicity first
> “There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies…”  
Turing lecture text: https://noncombatant.org/hoare-emperors-old-clothes-turing-award/hoare-emperors-old-clothes.pdf

### Unix tradition (McIlroy) — do one thing well
> “Write programs that do one thing and do it well… write programs to work together… handle text streams.”  
Overview: https://en.wikipedia.org/wiki/Unix_philosophy  
(Background: Peter Salus, *A Quarter Century of Unix*.)

---

## Repos that embody these ideas (signals to look for)

**Python / CPython**  
Repo: https://github.com/python/cpython  
Devguide: https://github.com/python/devguide  
Signals: PEP 8 adherence (formatters/linters), exhaustive tests in `Lib/test`, detailed PR reviews in `python/cpython`.

**Go language**  
Repo: https://github.com/golang/go  
Effective Go: https://go.dev/doc/effective_go  
Code Review comments: https://go.dev/wiki/CodeReview  
Signals: `gofmt`/`go vet` enforced; small, clear APIs; proverb-aligned design (“clear over clever”).

**Linux kernel**  
Repo: https://github.com/torvalds/linux  
Style/Process: see links above.  
Signals: strict patch submission rules; clear maintainership; consistent style; incremental changes; extensive review mailing lists.

**C++ Core Guidelines**  
Repo: https://github.com/isocpp/CppCoreGuidelines  
Signals: modern C++ safety and zero-overhead aims encoded as checkable rules (often enforced via linters/clang-tidy).

**Discourse (Jeff Atwood)**  
Repo: https://github.com/discourse/discourse  
Contributing: https://github.com/discourse/discourse/blob/main/CONTRIBUTING.md  
Signals: strong tests, CI, performance budgets, pragmatic engineering hygiene à la Joel Test.

**Clojure (Rich Hickey)**  
Repo: https://github.com/clojure/clojure  
Contributing overview: https://clojure.org/community/contributing  
Signals: bias toward composable, simple abstractions; minimal surface area; disciplined change process.

**Abseil (Hyrum Wright/Titus Winters et al.)**  
Repo: https://github.com/abseil/abseil-cpp  
Compatibility guidance: https://abseil.io/about/compatibility  
Signals: long-term API stability, strict deprecation policies, tests guarding observable behaviors.

**RAMCloud (John Ousterhout et al.)**  
Repo: https://github.com/PlatformLab/RAMCloud  
Coding conventions: https://ramcloud.atlassian.net/wiki/spaces/ramcloud/pages/6815759/Coding+Style+Guidelines  
Signals: emphasis on deep modules and clear interfaces; heavy design docs.

---

## What overlaps (common sentiments)
- Bias for **readability/clarity** (Peters/PEP 20, Pike, Metz, Ousterhout).  
- **Refactor continuously**; treat smells as refactoring triggers (Fowler/Beck/Cunningham).  
- Keep **interfaces small and stable**; hide complexity (Ousterhout, Stroustrup), beware consumers depending on behavior (Hyrum).  
- **Automate consistency** (formatters/linters/tests/CI) to keep humans focused on design (Python/Go/Linux kernel practices).  
- **Measure before optimizing**; avoid premature micro-optimizations (Knuth; Go’s “Don’t optimize without measuring”).

---

## How to observe these behaviors in a GitHub repo (fast heuristics)
1) **Style & structure**: presence of style guides (e.g., `CONTRIBUTING.md`, `STYLE.md`), formatters (e.g., `.editorconfig`, `gofmt`, `black`, `clang-format`), and high-level design docs.  
2) **Tests & CI**: high test coverage; failing tests block merges; visible CI (GitHub Actions); pre-commit hooks.  
3) **Small public APIs**: packages/modules with few exported symbols; internal details hidden; docstrings/examples first.  
4) **Review quality**: PR conversations discuss naming, coupling, and simplification, not just nitpicks.  
5) **Change discipline**: deprecation policies; `CHANGELOG.md`; semantic versioning or explicit stability docs.  
6) **Refactoring cadence**: churn aimed at consolidation/clarity; removal of dead code; “no duplication” PRs.

---

## AI coding tools: where they **boost** vs **mask** these behaviors

**Boost**  
- **Readability & naming**: LLMs suggest clearer names, docstrings, and comments that reflect intent.  
- **Consistency at scale**: auto-fix style/lint issues; generate tests and property-based checks.  
- **Refactor scaffolding**: quick sketches of alternatives (e.g., smaller interfaces, fewer elements).  
- **API guardianship**: generate contract tests and fuzzers that trap accidental behavior drift (Hyrum-proofing).  

**Mask**  
- **Wrong abstractions, faster**: confident boilerplate can entrench leaky/overfit abstractions (contra Metz/Ousterhout).  
- **Duplication creep**: effortless generation = more copy-paste patterns unless deduped.  
- **Cargo-cult smells**: code “looks” idiomatic but hides complexity; reviewers glaze over.  
- **Illusory optimization**: micro-tweaks suggested without profiling (contra Knuth/Go rules).  

**Guardrails for AI-assisted teams**  
- Treat AI as a **junior pair**: keep ownership with humans; require tests before merges.  
- Add **design prompts** in PR templates: “What did this simplify? Which interfaces got smaller?”  
- Enforce **formatters/linters/tests** in CI; run **profilers/benchmarks** before accepting perf claims.  
- Use **contract tests** and **fuzzing** to limit Hyrum’s Law blast radius.  
- Schedule regular **“metz checks”**: hunt for wrong abstractions; prefer rollback to duplication when uncertain.

---

## Open slots (add more later)
- Barbara Liskov (substitution principle) — canonical sources + repo exemplars.  
- John Carmack (simplicity bias) — original tweet/source link.  
- Eric S. Raymond (Cathedral & Bazaar; Linus’s Law).  
- Postel’s Law (robustness) — networking roots, code implications.

---

### Working notes / ideas for distillation
- Convert “Repo signals” into a checklist + lightweight scoring rubric.  
- Turn “AI guardrails” into branch protections and PR templates.  
- Extract common sentiments into a one-page “Good Code Compact.”



---

## Repo Quality Checklist & Scoring Rubric (v1)

**How to use:** For each category, check the signals in the repo and assign a score 0–5. Multiply by the weight. Sum to a 100-point score.

**Scale (per category):** 0=absent · 1=ad hoc · 2=inconsistent · 3=present but not enforced · 4=automated and usually enforced · 5=fully automated, enforced, and documented.

| Category | Weight | What to check (repo signals) |
|---|---:|---|
| **Style & Consistency** | 10 | Formatter + linter config present and used in CI (e.g., `black`, `clang-format`, `gofmt`); `.editorconfig`; style guides (`CONTRIBUTING.md`, `STYLE.md`).|
| **Tests & CI** | 20 | Meaningful unit/integration tests; fast CI; required status checks on default branch; flaky-test triage; property/contract tests for public APIs.|
| **Reviews & PR Hygiene** | 15 | PR template with rationale, testing steps, risk; small PRs; required reviews; `CODEOWNERS` routes reviewers; PR discussions focus on behavior/design, not bikeshedding.|
| **API & Modularity** | 15 | Small, stable public surface; internal details hidden; examples/docs for APIs; explicit deprecation policy; versioned endpoints/packages where relevant.|
| **Change Management** | 10 | Semantic Versioning; `CHANGELOG.md` with human-readable entries; release automation; migration notes for breaking changes.|
| **Security & Supply Chain** | 10 | `SECURITY.md` with contact/process; Dependabot alerts enabled; lockfiles/SBOM; dependency auditing in CI (e.g., `pip-audit`, `npm audit`).|
| **Refactoring & Code Health** | 10 | Regular cleanup commits; duplication reduced; dead code removal; ADRs or design notes updated; architectural drift addressed.|
| **Documentation & Examples** | 5 | Clear `README`; quick-start; runnable examples; docs living next to code; decision records for non-obvious tradeoffs.|
| **Observability & Performance** | 5 | Logging/metrics guidelines; benchmarks or perf tests for hot paths; before/after numbers in PRs affecting perf.|

**Interpretation:** 90–100 Outstanding; 75–89 Solid baseline; 60–74 Needs discipline; <60 Fragile.

**AI overlay (mask vs boost):**
- *Boost:* auto-fixes for style/lint; quick test stubs; generating API examples; PR description summarization.
- *Mask:* larger hidden diffs; cargo-cult patterns; perf claims without profiling; “smart” abstractions too early. 
**Mitigations:** require tests + profiling artifacts for risky PRs; enforce small PRs; run contract/property tests on public APIs; ask for “what did this simplify?” in PR template.

---

### Field Guide: What to look for (quick checks)
- **Community health files:** `.github/` with `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, issue/PR templates; `CODEOWNERS` exists and matches ownership you expect.
- **Branch protections:** default branch requires reviews + passing checks; force-push disabled; linear history optional.
- **CI as gate:** visible status checks (tests, linters, security scans) must pass to merge.
- **API stewardship:** `CHANGELOG.md`, deprecation notes, SemVer tags/releases; compatibility policy present.
- **Security:** `SECURITY.md`; dependency scanning alerts; lockfiles; supply-chain checks in workflows.

---

## The Good Code Compact (one page)

**1) Simple beats clever.** Favor small, composable designs; avoid magic.  
*Repo signal:* minimal public API; few exported symbols; straightforward code paths.

**2) Code is for humans.** Readability and naming carry intent.  
*Signal:* formatter + linter in CI; style guide in repo; consistent naming.

**3) Behavior is truth.** Tests define and defend expected behavior.  
*Signal:* unit/integration + property/contract tests; failing tests block merges.

**4) Ship small, ship often.** Short-lived branches, small PRs, fast reviews.  
*Signal:* PR template asks for risk/rollback; branch protections enforce size and checks.

**5) Measure, then optimize.** Performance work follows data.  
*Signal:* benchmarks/profiles committed; before/after metrics in PRs that claim perf gains.

**6) Own your interfaces.** Stable contracts, explicit deprecations, versioning.  
*Signal:* SemVer tags; `CHANGELOG.md`; API compatibility notes; deprecation policy.

**7) Delete fearlessly (with tests).** Remove dead code and wrong abstractions quickly.  
*Signal:* cleanup/refactor PRs; duplication reduced; ADRs updated alongside code.

**8) Automate consistency.** Let tools catch the boring stuff.  
*Signal:* pre-commit hooks; CI lint/format/test; auto-fixers wired.

**9) Guard the supply chain.** Know what you ship.  
*Signal:* `SECURITY.md`; Dependabot alerts; lockfiles/SBOM; CI vulnerability scans.

**10) Explain the why.** Decisions are documented, not just diffs.  
*Signal:* ADRs/design notes linked from PRs; docs generated from source/examples.

**Bonus: AI, used wisely.** Treat AI as a junior pair that writes scaffolding and tests, not architecture. Keep human judgment on design and behavior.

