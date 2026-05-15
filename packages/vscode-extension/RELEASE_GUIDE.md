# VSCode Extension Release Guide

This guide explains how to release the Malayalam Language extension to the VS Code Marketplace.

## Prerequisites

1. Node.js 18+ and pnpm installed
2. A Visual Studio Code Marketplace account (create at https://marketplace.visualstudio.com)
3. A Personal Access Token (PAT) from your Microsoft account
4. `vsce` CLI tool installed globally: `npm install -g vsce`

## Pre-Release Checklist

- [ ] All tests passing: `pnpm test:run`
- [ ] Code linting successful: `pnpm lint`
- [ ] Build successful: `pnpm build`
- [ ] README.md updated with latest features
- [ ] CHANGELOG.md updated with new version
- [ ] Icon (icon.svg/icon.png) is present and correct size (128x128 or SVG)
- [ ] package.json version updated
- [ ] No uncommitted changes: `git status`

## Step 1: Update Version

Update the version in `package.json`:

```bash
cd packages/vscode-extension
# Edit package.json and update version
# e.g., "version": "0.1.0" → "version": "0.2.0"
```

## Step 2: Update CHANGELOG

Add your release notes to `CHANGELOG.md`:

```markdown
## [0.2.0] - 2025-05-20

### Added
- New feature description
- Another feature

### Fixed
- Bug fix description

### Changed
- Breaking change description
```

## Step 3: Build & Test

```bash
# Clean build
pnpm clean
pnpm install
pnpm build

# Run tests
pnpm test:run

# Lint code
pnpm lint
```

## Step 4: Create GitHub Release (Optional but Recommended)

```bash
cd ../..  # Back to root

# Commit changes
git add packages/vscode-extension/
git commit -m "chore: release Malayalam VSCode extension v0.2.0"
git push origin main

# Create tag
git tag -a vscode-ext-v0.2.0 -m "Release Malayalam VSCode extension v0.2.0"
git push origin vscode-ext-v0.2.0
```

## Step 5: Package Extension

```bash
cd packages/vscode-extension

# Verify icon exists
ls -la icon.svg icon.png 2>/dev/null || echo "Create icon.png (128x128)"

# Package for marketplace
vsce package

# This creates: malayalam-language-0.2.0.vsix
```

## Step 6: Test Locally (Optional)

```bash
# Install the package locally to test
code --install-extension malayalam-language-0.2.0.vsix

# Test in VS Code:
# 1. Create a test.ml file
# 2. Verify syntax highlighting works
# 3. Test IntelliSense (Ctrl+Space)
# 4. Test hover tooltips
# 5. Uninstall after testing
code --uninstall-extension malayalamlang.malayalam-language
```

## Step 7: Publish to Marketplace

### Option A: Using vsce (Recommended)

```bash
# Get your PAT from: https://dev.azure.com/malayalamlang/_usersSettings/tokens
# Create with scopes: Marketplace (Manage)

vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN

# Or interactively (will prompt for PAT)
vsce publish
```

### Option B: Web Upload

1. Go to https://marketplace.visualstudio.com/manage/publishers/malayalamlang
2. Click "Create a publisher" if needed (use "malayalamlang")
3. Click the "..." menu → "Upload new extension"
4. Select the `malayalam-language-0.2.0.vsix` file
5. Fill in metadata and click "Upload"

## Step 8: Verify Publication

```bash
# Check it's live
vsce search malayalam

# Or visit: https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language

# Install from marketplace to verify
code --install-extension malayalamlang.malayalam-language
```

## Post-Release

1. Announce the release on GitHub and social media
2. Monitor for bug reports and user feedback
3. Update documentation if needed
4. Plan next release features

## Troubleshooting

### "Unable to authenticate with publisher"
- Verify PAT is valid and not expired
- Check publisher name matches account
- Try creating a new PAT with wider permissions

### "Metadata validation failed"
- Verify icon exists (icon.png or icon.svg, 128x128+ pixels)
- Check package.json has all required fields
- Verify publisher name matches

### "File too large"
- Check `.vscodeignore` excludes unnecessary files
- Ensure `src/` and tests are in .vscodeignore
- Verify dist/ only contains built output

### Extension not appearing in search
- Give marketplace 5-10 minutes to index
- Clear VS Code cache: Delete `.vscode/extensions` folder
- Check extension name matches publisher.name in package.json

## Rollback/Unpublish

```bash
# If you need to unpublish a version
vsce unpublish malayalamlang.malayalam-language@0.2.0 -p YOUR_PAT

# Or update to mark as deprecated
# (via marketplace web interface)
```

## Continuous Release (CI/CD)

For automated releases via GitHub Actions, see `.github/workflows/` for release automation setup.

## Support

For issues with the extension, visit: https://github.com/adsalihac/malayalam-lang/issues

For VS Code Marketplace issues, visit: https://github.com/microsoft/vscode-marketplace-feed/issues
