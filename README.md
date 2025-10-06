# 🎃 Hacktober Dev - Hackiness Level Analyzer

__I am in two minds about hacktoberfest, hits on a desire to contribute to open source, and also my disdain for wasting others' time with hacky code or half baked solutions. Now in 2025 with AI, I feel that more than ever, it's important to be able to gauge how much of a hack you are as a developer, and not mistake advancement in LLM models with advancements in developer skills__

``Discover your true hackiness level!`` This CLI tool analyzes your Git repository to measure how "hacky" your development practices are, providing a comprehensive hackiness score based on your coding patterns, commit habits, and development workflow.

##  What is Hackiness? its about knowing thyself. 

Your **Hackiness Level** is a comprehensive score (0-100) that measures:

- **Planning vs. Spontaneity** - How much you plan versus code on the fly
- **Code Stability** - How often you make breaking changes or quick fixes  
- **Commit Discipline** - Quality and frequency of your version control habits
- **Documentation Balance** - Finding the sweet spot between over and under-documenting
- **Work Rhythm** - Whether you're a steady coder or burst worker
- **Risk Taking** - How experimental and bold your coding choices are

## ✨ Features

* **🎯 Hackiness Score** - Get your overall hackiness level (0-100)
* **📊 Detailed Metrics** - 8 core measurements of your development style
* **🏆 Hackiness Badges** - Earn achievements based on your coding patterns
* **🚀 Zero Installation** - Run instantly with `npx hacktober-dev`
* **📈 Progress Tracking** - Monitor how your hackiness evolves over time
* **🎨 Beautiful Output** - Colorful CLI with charts and insights

## 🚀 Quick Start

### Measure your hackiness instantly:

```bash
npx hacktober-dev
```

### Analyze a specific repository:

```bash
npx hacktober-dev --dir /path/to/your/repo
```

### Get detailed hackiness breakdown:

```bash
npx hacktober-dev --verbose
```

## 📊 Hackiness Measurements

### Core Metrics (Each contributes to your overall hackiness score):

* **🎲 Commit Frequency** - Steady vs. burst coding patterns
* **📝 Message Quality** - Descriptive vs. quick commit messages  
* **⚡ Work Consistency** - Planned vs. spontaneous development
* **📚 Documentation Habits** - Balanced vs. minimal documentation
* **🔄 Code Churn** - Stable vs. frequently changing code
* **⏰ Time Patterns** - When and how you code
* **💥 Burst Work** - Intense sessions vs. steady pace
* **📏 Commit Size** - Small focused vs. large sweeping changes

## 🎯 Hackiness Levels

- **0-20: The Architect** - Highly planned, methodical approach
- **21-40: The Engineer** - Balanced planning with some spontaneity  
- **41-60: The Hacker** - Good balance of speed and quality
- **61-80: The Cowboy** - Fast-moving with calculated risks
- **81-100: The Maverick** - Pure instinct-driven development

## 🏆 Hackiness Achievements

Earn badges that reflect your unique development style:

* 🧘‍♂️ **Commit Zen Master** - Perfect balance in commit practices
* ⚔️ **Weekend Warrior** - High hackiness during off-hours
* 👼 **Documentation Angel** - Surprisingly good docs for a hacker
* 💥 **Burst Coder** - Intense, focused coding sessions
* 🌙 **Night Owl** - Peak hackiness in the dark hours
* 🐦 **Early Bird** - Morning hackiness champion
* 📊 **Steady Committer** - Consistent development rhythm
* ⚖️ **Code Stability Master** - Hacky but stable

## 📋 Example Output

```
🎯 Your Hackiness Level Assessment
────────────────────────────────────

HACKINESS SCORE: 67/100 (The Cowboy)

Repository: my-awesome-project
Commits analyzed: 156
Analysis period: 3 months
Development style: Fast-moving with calculated risks

📊 Hackiness Breakdown:
  • Commit frequency: 15/20 (Burst patterns detected)
  • Message quality: 8/15 (Quick but functional)
  • Work consistency: 12/15 (Spontaneous bursts)
  • Documentation: 6/10 (Minimal but effective)
  • Code stability: 14/20 (Some churn, mostly stable)
  • Time patterns: 12/20 (Night owl tendencies)

🏆 Hackiness Badges Earned:
  • 💥 Burst Coder - You work in intense, focused sessions
  • 🌙 Night Owl - Peak productivity after midnight
  • ⚔️ Weekend Warrior - Saturday coding sessions

💡 Hackiness Insights:
  • Your burst coding style shows high focus but consider more frequent commits
  • Night coding sessions are productive - embrace your natural rhythm
  • Quick commit messages work for you, but occasional detail helps teammates

Run with --verbose for detailed hackiness analysis
```

## 🤝 Contributing to Hackiness Measurement

Help us improve how we measure hackiness! Perfect for Hacktoberfest contributions.

### Easy Hackiness Contributions (5-10 minutes):

1. **Add hackiness badges** - Create achievements in `data/achievements/`
2. **Suggest hackiness patterns** - What makes code "hacky" vs "engineered"?
3. **Improve hackiness insights** - Better feedback for different hackiness levels

### Advanced Hackiness Contributions:

1. **New hackiness metrics** - Create calculators in `src/calculators/`
2. **Hackiness algorithms** - Improve how we score different patterns
3. **Hackiness visualizations** - Better ways to display hackiness data

### Getting Started:

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/hacktober-dev.git
cd hacktober-dev

# Install dependencies
npm install

# Test your hackiness locally
npm run dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode (test your own hackiness!)
npm run dev

# Build for production
npm run build

# Validate hackiness definitions
npm run validate
```

### 📦 Package Scripts

The project includes several npm scripts for different development and release workflows:

- **`npm run build`** - Compiles TypeScript to JavaScript in the `dist/` directory
- **`npm run dev`** - Runs the CLI in development mode with hot reloading
- **`npm start`** - Runs the built CLI from `dist/cli.js`
- **`npm test`** - Executes the CLI with test flag for validation
- **`npm run validate`** - Validates all JSON definitions and schemas
- **`npm run prepublishOnly`** - Automatically runs build and validation before publishing
- **`npm version [patch|minor|major]`** - Bumps version, builds, and commits changes
- **`npm run postversion`** - Automatically pushes version tags to git remote

### 🚀 Release Process

This project uses automated semantic versioning and publishing:

#### For Maintainers:

1. **Create a new version:**
   ```bash
   # For bug fixes
   npm version patch
   
   # For new features
   npm version minor
   
   # For breaking changes
   npm version major
   ```

2. **Create a GitHub Release:**
   - Go to GitHub → Releases → "Create a new release"
   - Use the version tag created by `npm version` (e.g., `v0.2.0`)
   - Add release notes describing changes
   - Publish the release

3. **Automated Publishing:**
   - GitHub Actions will automatically build and publish to npm
   - The package will be available via `npx hacktober-dev`

#### For Contributors:

- All contributions go through pull requests to `main` branch
- CI automatically builds and tests all changes
- Maintainers handle versioning and releases
- See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines

### 🔄 CI/CD Pipeline

The project includes automated workflows:

- **CI Workflow** (`.github/workflows/ci.yml`):
  - Runs on every push and pull request to `main`
  - Tests Node.js build process
  - Validates all JSON definitions
  - Ensures code quality before merging

- **Publish Workflow** (`.github/workflows/publish.yml`):
  - Triggers automatically on GitHub releases
  - Builds the project from source
  - Runs validation checks
  - Publishes to npm registry
  - Requires `NPM_TOKEN` secret in repository settings

## 🎭 Philosophy

This tool celebrates the spectrum of development styles. Whether you're a methodical architect or a spontaneous maverick, there's value in understanding your natural hackiness level. Use this insight to:

- **Embrace your style** - Work with your natural patterns, not against them
- **Improve consciously** - Identify areas where more or less hackiness serves you
- **Communicate better** - Help teammates understand your development approach
- **Have fun** - Celebrate the art and craft of software development

## 📄 License

This repository is licensed under the Apache 2.0 license. See [LICENSE](LICENSE) for more information.

---

###### **Made with 💻 for hack-developers - Hacktoberfest 2025**