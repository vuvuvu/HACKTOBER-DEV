---
title: Contributing to Hackiness Measurement
tags: contributing, hackiness, development, open source, hacktoberfest
quick summary: Guide for contributing to the Hacktober Dev hackiness level analyzer
date created: 2025-10-05
date updated: 2025-10-06
---

# 🤝 Contributing to Hackiness Measurement

Welcome to the Hacktober Dev project! We're building the ultimate tool for measuring developer hackiness levels, and we need your help to make it awesome.

## 🎯 What We're Building

This CLI tool measures how "hacky" a developer's coding style is by analyzing their Git repository. We're not judging - we're celebrating the full spectrum of development styles, from methodical architects to spontaneous mavericks.

## 🚀 Quick Start for Contributors

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/hacktober-dev.git
cd hacktober-dev

# Install dependencies
npm install

# Test your own hackiness level!
npm run dev

# Run on a specific repo
npm run dev -- --dir /path/to/repo --verbose
```

## 🎨 Types of Contributions

### 🟢 Beginner-Friendly (5-15 minutes)

Perfect for your first contribution or quick Hacktoberfest PRs!

#### 1. **Add Hackiness Badges** 
Create new achievements in `data/achievements/`:

```json
{
  "id": "midnight-maverick",
  "name": "Midnight Maverick",
  "emoji": "🌙",
  "description": "Peak hackiness between midnight and 3am",
  "criteria": {
    "metric": "time-of-day-analysis", 
    "condition": "night_commits_percentage > 60"
  },
  "hackiness_impact": "high",
  "rarity": "rare"
}
```

#### 2. **Suggest Hackiness Patterns**
What makes code "hacky"? Share ideas in issues:
- Quick fixes vs. proper solutions
- Experimental coding patterns
- Risk-taking in development
- Speed vs. quality trade-offs

#### 3. **Improve Hackiness Insights**
Edit insight messages in metric files to be more fun and encouraging:

```json
{
  "insights": {
    "high_hackiness": "You're a coding maverick! Your spontaneous style gets things done fast.",
    "low_hackiness": "You're a methodical architect! Your planned approach builds solid foundations."
  }
}
```

### 🟡 Intermediate (30-60 minutes)

#### 1. **Create New Hackiness Metrics**

Add a new calculator in `src/calculators/`. Here's the structure:

```typescript
export interface HackinessMetric {
  calculate(commits: GitCommit[]): Promise<MetricResult>;
  getHackinessScore(): number; // 0-100
  getInsights(): string[];
}
```

**Ideas for new metrics:**
- **Refactoring Frequency** - How often you clean up vs. add features
- **Experimental Commits** - Commits with "try", "test", "experiment" 
- **Fix-to-Feature Ratio** - Bug fixes vs. new features
- **Branch Chaos** - How many branches you work on simultaneously
- **Dependency Boldness** - How quickly you adopt new packages

#### 2. **Enhance Hackiness Algorithms**

Improve existing calculators to better detect hackiness patterns:

- Make commit message analysis smarter
- Better detection of "quick fix" patterns  
- Improve work pattern recognition
- Add more sophisticated scoring

#### 3. **Add Hackiness Visualizations**

Create better ways to display hackiness data:
- ASCII charts for hackiness over time
- Hackiness heatmaps by day/hour
- Comparative hackiness breakdowns

### 🔴 Advanced (1+ hours)

#### 1. **Multi-Repository Analysis**
Compare hackiness across multiple repos to find patterns.

#### 2. **Hackiness Trends**
Track how hackiness changes over time and project phases.

#### 3. **Team Hackiness Dynamics**
Analyze how team composition affects overall hackiness.

#### 4. **Language-Specific Hackiness**
Different languages encourage different hackiness patterns.

## 📁 Project Structure

```
src/
├── calculators/           # Hackiness measurement logic
│   ├── commit-frequency.ts    # How often you commit
│   ├── message-quality.ts     # Commit message hackiness
│   ├── work-consistency.ts    # Planned vs spontaneous
│   └── ...
├── analyzer.ts           # Main analysis engine
├── cli.ts               # Command-line interface
└── types.ts             # TypeScript definitions

data/
├── achievements/        # Hackiness badges
├── metrics/            # Metric definitions
└── thresholds/         # Scoring thresholds
```

## 🎯 Hackiness Philosophy

When contributing, keep these principles in mind:

### ✅ Do:
- **Celebrate all styles** - Every hackiness level has value
- **Be encouraging** - Help developers understand their natural patterns
- **Focus on insight** - Provide actionable feedback
- **Make it fun** - Use humor and personality in messages
- **Embrace nuance** - Hackiness isn't binary

### ❌ Don't:
- **Judge or shame** - No hackiness level is "wrong"
- **Oversimplify** - Development patterns are complex
- **Be prescriptive** - Suggest, don't demand changes
- **Ignore context** - Different projects need different approaches

## 🧪 Testing Your Contributions

```bash
# Test on your own repo
npm run dev

# Test on sample data
npm run dev -- --test

# Validate metric definitions
npm run validate

# Run the full test suite
npm test
```

## 📝 Pull Request Guidelines

### Good PR Titles:
- `feat: add midnight-maverick achievement for night coders`
- `improve: enhance commit message hackiness detection`
- `fix: correct hackiness score calculation for edge case`

### PR Description Template:
```markdown
## What hackiness pattern does this address?
Brief description of the development pattern you're measuring or improving.

## How does this change hackiness measurement?
Explain how your contribution affects hackiness scoring or insights.

## Testing
- [ ] Tested on my own repository
- [ ] Validated with sample data
- [ ] Added/updated tests if needed

## Screenshots (if applicable)
Show before/after of CLI output changes.
```

## 🏆 Good First Issues

Look for issues labeled:
- `good-first-issue` - Perfect for beginners
- `hackiness-badge` - Add new achievements
- `metric-improvement` - Enhance existing measurements
- `documentation` - Improve guides and examples

## 💡 Ideas for Contributions

### New Hackiness Metrics:
- **Code Golf Tendency** - How concise vs. verbose your code is
- **Error Handling Style** - Try-catch vs. let-it-crash approaches
- **Testing Discipline** - TDD vs. "test in production" patterns
- **Configuration Chaos** - How much you tweak settings and configs
- **Dependency Daredevil** - Willingness to use cutting-edge packages

### New Achievements:
- **🎯 Precision Coder** - Consistently small, focused commits
- **🌪️ Tornado Developer** - Massive commits that change everything
- **🔧 Fix-It Felix** - High ratio of bug fixes to features
- **🚀 Feature Factory** - Constantly shipping new functionality
- **📚 Documentation Devotee** - Surprisingly thorough docs for hackiness level

## 🆘 Getting Help

- **Discord**: Join our contributor chat
- **Issues**: Ask questions in GitHub issues
- **Discussions**: Share ideas in GitHub discussions
- **Email**: reach out to maintainers

## 🎉 Recognition

Contributors get:
- Listed in our README
- Special hackiness badges in the tool
- Shoutouts in release notes
- Eternal gratitude from the community

## 📋 Development Tips

### Understanding Hackiness Scoring:
- Each metric contributes 0-20 points to total hackiness (0-100)
- Higher scores = more "hacky" patterns
- Lower scores = more "engineered" patterns
- Both extremes have value!

### Metric Development:
1. Start with a clear hypothesis about what makes code "hacky"
2. Implement detection logic
3. Test on diverse repositories
4. Calibrate scoring thresholds
5. Write engaging insights

### Achievement Design:
- Make them fun and memorable
- Use creative names and emojis
- Celebrate unique patterns
- Avoid negative language

---

**Ready to contribute to hackiness measurement? Pick an issue and let's make this tool awesome together! 🚀**