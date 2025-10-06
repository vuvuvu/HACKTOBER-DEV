---
title: Development Setup Guide for HACKTOBER-DEV
tags: [documentation, development, setup, contributing, npm]
quick summary: Complete guide for setting up local development environment for the HACKTOBER-DEV CLI tool
date created: 2025-10-06
date updated: 2025-10-06
---

# 🛠️ Development Setup Guide

This guide will help you set up a local development environment for contributing to the HACKTOBER-DEV CLI tool.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** (VS Code recommended)

### Verify Installation

```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
git --version     # Should show 2.x.x or higher
```

## 🚀 Quick Start

### 1. Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/HACKTOBER-DEV.git
   cd HACKTOBER-DEV
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/vuvuvu/HACKTOBER-DEV.git
   ```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- TypeScript compiler
- Development tools (ts-node-dev)
- CLI dependencies (commander, chalk)
- Type definitions

### 3. Build the Project

```bash
npm run build
```

This compiles TypeScript files from `src/` to JavaScript in `dist/`.

### 4. Test Your Setup

```bash
# Run the CLI in development mode
npm run dev

# Or test the built version
npm test
```

You should see the hackiness analysis output for the current repository.

## 🔧 Development Workflow

### Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `npm run dev` | Development mode with hot reloading | Daily development |
| `npm run build` | Compile TypeScript to JavaScript | Before testing/committing |
| `npm start` | Run built CLI | Testing production build |
| `npm test` | Run CLI with test flag | Validation |
| `npm run validate` | Validate JSON definitions | Before committing |

### Development Mode

For active development, use the dev script:

```bash
npm run dev
```

This uses `ts-node-dev` to:
- Run TypeScript directly without compilation
- Watch for file changes
- Automatically restart on changes
- Provide faster feedback loop

### Testing Changes

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm test
   # or
   node dist/cli.js --test
   ```

3. **Test with different repositories:**
   ```bash
   node dist/cli.js --dir /path/to/other/repo
   ```

### Global Testing

To test the CLI as a global package:

```bash
# Link globally
npm link

# Test globally
hacktober-dev --help
hacktober-dev --test

# Unlink when done
npm unlink -g hacktober-dev
```

## 📁 Project Structure

```
HACKTOBER-DEV/
├── .github/                 # GitHub workflows and templates
│   ├── workflows/
│   │   ├── ci.yml          # Continuous integration
│   │   └── publish.yml     # Automated publishing
├── data/                   # JSON definitions
│   ├── achievements/       # Badge definitions
│   ├── metrics/           # Metric calculators config
│   └── thresholds/        # Scoring thresholds
├── docs/                  # Documentation
├── src/                   # TypeScript source code
│   ├── calculators/       # Metric calculation modules
│   ├── analyzer.ts        # Main analysis engine
│   ├── cli.ts            # CLI entry point
│   ├── data-loader.ts    # JSON data loading
│   ├── reporter.ts       # Output formatting
│   └── types.ts          # Type definitions
├── dist/                 # Compiled JavaScript (generated)
├── schema/               # JSON schemas for validation
└── scripts/              # Build and validation scripts
```

### Key Files

- **`src/cli.ts`** - Main CLI entry point with argument parsing
- **`src/analyzer.ts`** - Core analysis logic and scoring
- **`src/calculators/`** - Individual metric calculation modules
- **`package.json`** - Project configuration and dependencies
- **`tsconfig.json`** - TypeScript compilation settings

## 🧪 Adding New Features

### Adding a New Metric

1. **Create calculator module:**
   ```bash
   touch src/calculators/my-new-metric.ts
   ```

2. **Implement the calculator:**
   ```typescript
   import { MetricCalculator, GitCommit } from '../types';

   export const myNewMetricCalculator: MetricCalculator = {
     name: 'my-new-metric',
     calculate: (commits: GitCommit[]) => {
       // Your calculation logic here
       return {
         score: 0, // 0-100
         insights: ['Your insight here'],
         data: {} // Additional data
       };
     }
   };
   ```

3. **Register in index:**
   ```typescript
   // src/calculators/index.ts
   export { myNewMetricCalculator } from './my-new-metric';
   ```

4. **Add configuration:**
   ```json
   // data/metrics/my-new-metric.json
   {
     "name": "My New Metric",
     "description": "Description of what this measures",
     "weight": 10,
     "category": "development-style"
   }
   ```

### Adding a New Achievement

1. **Create achievement definition:**
   ```json
   // data/achievements/my-achievement.json
   {
     "id": "my-achievement",
     "name": "My Achievement",
     "description": "Earned when...",
     "icon": "🏆",
     "criteria": {
       "metric": "my-new-metric",
       "threshold": 80,
       "operator": "gte"
     }
   }
   ```

2. **Test the achievement:**
   ```bash
   npm run validate
   npm test
   ```

## 🔍 Debugging

### Common Issues

**TypeScript compilation errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# View detailed errors
npm run build
```

**Runtime errors:**
```bash
# Run with more verbose output
DEBUG=* npm run dev

# Check specific file
node -r ts-node/register src/cli.ts --verbose
```

**JSON validation errors:**
```bash
# Validate all definitions
npm run validate

# Check specific file
node scripts/validate-definitions.js
```

### Development Tools

**Recommended VS Code Extensions:**
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- GitLens
- JSON Schema Validator

**Useful Commands:**
```bash
# Check types without building
npx tsc --noEmit

# Format code (if Prettier is configured)
npx prettier --write src/

# Lint code (if ESLint is configured)
npx eslint src/
```

## 🧪 Testing

### Manual Testing

1. **Test with different repositories:**
   ```bash
   # Test with a small repo
   npm run dev -- --dir /path/to/small/repo

   # Test with a large repo
   npm run dev -- --dir /path/to/large/repo
   ```

2. **Test edge cases:**
   ```bash
   # Empty repository
   # Repository with no commits
   # Repository with very few commits
   # Repository with unusual commit patterns
   ```

### Validation Testing

```bash
# Validate all JSON files
npm run validate

# Test CLI functionality
npm test
```

## 📝 Code Style

### TypeScript Guidelines

- Use strict TypeScript settings
- Define proper types for all functions
- Avoid `any` type when possible
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### File Organization

- Keep files focused on single responsibility
- Use barrel exports (`index.ts`) for modules
- Place types in `types.ts` or co-located with usage
- Keep JSON data separate from code logic

## 🤝 Contributing Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make changes and test:**
   ```bash
   npm run build
   npm test
   npm run validate
   ```

3. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: add my new feature"
   ```

4. **Push and create PR:**
   ```bash
   git push origin feature/my-new-feature
   ```

5. **Create Pull Request** on GitHub

### Commit Message Format

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📞 Getting Help

- **Documentation:** Check `docs/` directory
- **Issues:** Search existing GitHub issues
- **Discussions:** Use GitHub Discussions for questions
- **Code Review:** Ask for feedback in pull requests

---

*Happy hacking! 🎃*