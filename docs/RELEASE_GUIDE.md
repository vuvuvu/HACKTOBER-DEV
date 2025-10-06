---
title: Release Guide for HACKTOBER-DEV
tags: [documentation, release, versioning, npm, github-actions]
quick summary: Comprehensive guide for releasing new versions of the HACKTOBER-DEV CLI tool
date created: 2025-10-06
date updated: 2025-10-06
---

# 🚀 Release Guide for HACKTOBER-DEV

This document provides detailed instructions for releasing new versions of the HACKTOBER-DEV CLI tool.

## 📋 Prerequisites

Before creating a release, ensure you have:

- [ ] Maintainer access to the repository
- [ ] Local development environment set up
- [ ] All changes merged to `main` branch
- [ ] CI pipeline passing on `main`
- [ ] `NPM_TOKEN` secret configured in GitHub repository settings

## 🔄 Release Process Overview

The project uses automated semantic versioning with the following workflow:

1. **Version Bump** → 2. **GitHub Release** → 3. **Automated npm Publishing**

## 📝 Step-by-Step Release Instructions

### Step 1: Prepare for Release

1. **Ensure clean working directory:**
   ```bash
   git status
   git pull origin main
   ```

2. **Run final checks:**
   ```bash
   npm install
   npm run build
   npm run validate
   npm test
   ```

3. **Update CHANGELOG.md:**
   - Move items from "Unreleased" to new version section
   - Add release date
   - Create new "Unreleased" section for future changes

### Step 2: Version Bump

Choose the appropriate version type based on changes:

- **Patch** (`0.1.0` → `0.1.1`) - Bug fixes, small improvements
- **Minor** (`0.1.0` → `0.2.0`) - New features, backward compatible
- **Major** (`0.1.0` → `1.0.0`) - Breaking changes

```bash
# For patch releases (bug fixes)
npm version patch

# For minor releases (new features)
npm version minor

# For major releases (breaking changes)
npm version major
```

**What happens automatically:**
- Version number updated in `package.json`
- Project built (`npm run build`)
- Built files added to git (`git add dist/`)
- Version commit created
- Git tag created (e.g., `v0.2.0`)
- Changes pushed to remote with tags

### Step 3: Create GitHub Release

1. **Navigate to GitHub:**
   - Go to `https://github.com/vuvuvu/HACKTOBER-DEV/releases`
   - Click "Create a new release"

2. **Configure Release:**
   - **Tag version:** Use the tag created by `npm version` (e.g., `v0.2.0`)
   - **Release title:** Same as tag version (e.g., `v0.2.0`)
   - **Description:** Copy relevant section from CHANGELOG.md

3. **Publish Release:**
   - Click "Publish release"
   - This triggers the automated publishing workflow

### Step 4: Verify Automated Publishing

1. **Check GitHub Actions:**
   - Go to Actions tab in GitHub
   - Verify "Publish to NPM" workflow completed successfully

2. **Verify npm Publication:**
   ```bash
   # Check if new version is available
   npm view hacktober-dev version
   
   # Test installation
   npx hacktober-dev@latest --version
   ```

## 🛠️ Package Scripts Reference

### Development Scripts
- `npm run dev` - Development mode with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm run validate` - Validate JSON definitions
- `npm test` - Run CLI tests

### Release Scripts
- `npm run prepublishOnly` - Pre-publish safety check (build + validate)
- `npm version [type]` - Version bump with automated build and commit
- `npm run postversion` - Post-version cleanup (push tags)

## 🔍 Troubleshooting

### Common Issues

**1. Version command fails:**
```bash
# Ensure working directory is clean
git status
git stash  # if needed
```

**2. GitHub Actions publishing fails:**
- Check `NPM_TOKEN` secret is configured
- Verify token has publish permissions
- Check workflow logs for specific errors

**3. npm package not updating:**
- Wait a few minutes for npm registry propagation
- Clear npm cache: `npm cache clean --force`
- Try specific version: `npx hacktober-dev@0.2.0`

### Rollback Process

If a release needs to be rolled back:

1. **Unpublish from npm** (within 24 hours):
   ```bash
   npm unpublish hacktober-dev@0.2.0
   ```

2. **Delete GitHub release and tag:**
   - Delete release from GitHub UI
   - Delete local and remote tags:
     ```bash
     git tag -d v0.2.0
     git push origin :refs/tags/v0.2.0
     ```

3. **Revert version commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```

## 📊 Release Checklist

Use this checklist for each release:

### Pre-Release
- [ ] All CI checks passing on `main`
- [ ] CHANGELOG.md updated with new version
- [ ] Local build and tests successful
- [ ] Working directory clean

### Release
- [ ] Version bumped with `npm version [type]`
- [ ] GitHub release created with proper tag
- [ ] Release notes added from CHANGELOG.md
- [ ] GitHub Actions workflow completed successfully

### Post-Release
- [ ] New version available on npm registry
- [ ] `npx hacktober-dev@latest` works correctly
- [ ] Documentation updated if needed
- [ ] Team notified of new release

## 🎯 Best Practices

1. **Regular Releases:** Aim for frequent, smaller releases rather than large ones
2. **Clear Commit Messages:** Use conventional commit format for better changelogs
3. **Test Before Release:** Always test the built package locally
4. **Document Changes:** Keep CHANGELOG.md up to date with user-facing changes
5. **Monitor After Release:** Check for issues in the first few hours after release

## 📞 Support

For questions about the release process:
- Check existing GitHub Issues
- Create new issue with `release` label
- Contact repository maintainers

---

*This guide is part of the HACKTOBER-DEV project documentation.*