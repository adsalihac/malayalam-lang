# Publishing Guide for MalayalamLang

## Overview

MalayalamLang is published as three main npm packages:

1. **@malayalamlang/core** - Compiler and transpiler
2. **@malayalamlang/runtime** - Built-in functions
3. **@malayalamlang/cli** - Command-line interface

## Pre-Publication Checklist

- [ ] All tests passing: `pnpm test`
- [ ] Linting successful: `pnpm lint`
- [ ] Code formatted: `pnpm format`
- [ ] Build successful: `pnpm build`
- [ ] Documentation updated
- [ ] Version numbers updated in package.json files
- [ ] CHANGELOG.md updated
- [ ] All examples working

## Manual Publishing

### Step 1: Prepare

```bash
# Ensure clean working directory
git status

# Update version in root and package files
# e.g., 0.1.0 -> 0.2.0

vim package.json
vim packages/core/package.json
vim packages/runtime/package.json
vim packages/cli/package.json
```

### Step 2: Build

```bash
# Clean and build
pnpm clean
pnpm install
pnpm build
pnpm test
```

### Step 3: Login

```bash
npm login
# Enter username, password, and 2FA code
```

### Step 4: Publish

```bash
# Publish each package
cd packages/core
npm publish --access public
cd ../runtime
npm publish --access public
cd ../cli
npm publish --access public
cd ../..
```

### Step 5: Verify

```bash
# Check published packages
npm info @malayalamlang/core
npm info @malayalamlang/runtime
npm info @malayalamlang/cli

# Test installation
npm install -g @malayalamlang/cli
malayalam --version
```

## Automated Publishing via GitHub Actions

### Setup GitHub Secrets

1. Go to repository Settings → Secrets and variables → Actions
2. Add `NPM_TOKEN`:
   - Get token from npm.js settings
   - Click "Create New Token" → "Automation"
   - Copy the token
   - Paste in GitHub secret as `NPM_TOKEN`

### Publish Automatically

Simply push to main branch:

```bash
git add .
git commit -m "chore: bump version to 0.2.0"
git push origin main
```

CI/CD pipeline will automatically:
1. Run tests and linting
2. Build packages
3. Publish to npm registry

## Version Management

### Semantic Versioning

- **MAJOR** (0.x.0): Breaking changes
- **MINOR** (0.1.x): New features, backward compatible
- **PATCH** (0.1.1): Bug fixes

### Update Versions

```bash
# Update all packages at once
for pkg in packages/*; do
  sed -i '' 's/"version": "0.1.0"/"version": "0.2.0"/g' "$pkg/package.json"
done

# Or manually edit each package.json
```

## Creating Releases

### GitHub Release

```bash
# Tag the release
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin v0.2.0

# Create release on GitHub UI
# Add release notes and point to npm packages
```

### CHANGELOG Format

```markdown
# Changelog

## [0.2.0] - 2025-05-15

### Added
- New feature description
- Another feature

### Fixed
- Bug fix description

### Changed
- Breaking change description

## [0.1.0] - 2025-05-14

### Initial Release
- Core compiler with Malayalam and Manglish support
- CLI with run, compile, and REPL commands
- 40+ built-in functions
```

## Package Contents

### @malayalamlang/core

**What's included:**
- Lexer (tokenizer)
- Parser
- AST definitions
- Transpiler
- Compiler class
- TypeScript definitions

**Size:** ~50KB
**Dependencies:** None (pure TypeScript)

### @malayalamlang/runtime

**What's included:**
- Built-in functions
- Runtime utilities
- Type helpers

**Size:** ~20KB
**Dependencies:** None

### @malayalamlang/cli

**What's included:**
- CLI executable
- REPL implementation
- File operations
- Integration with core and runtime

**Size:** ~100KB
**Dependencies:** 
- @malayalamlang/core
- @malayalamlang/runtime
- commander
- chalk
- readline-sync

## Distribution Formats

### npm Registry

```bash
npm install @malayalamlang/cli
npm install -g @malayalamlang/cli
```

### GitHub Releases

Attach compiled bundles to GitHub releases:

```bash
# Create distributions
mkdir -p dist
cp -r packages/*/dist dist/

# Create tarball
tar -czf malayalamlang-v0.2.0.tar.gz dist/

# Create zip
zip -r malayalamlang-v0.2.0.zip dist/
```

## Documentation Publication

### Website (Coming Soon)

- Host documentation at malayalamlang.dev
- Use Docusaurus or similar
- Deploy from `docs/` folder

### README Updates

After publishing, update README with:
- Latest version number
- New features
- Known issues

## Troubleshooting

### Package Not Publishing

```bash
# Check authentication
npm whoami

# Verify credentials
cat ~/.npmrc

# Check package.json validity
npm pack
```

### Version Already Exists

```bash
# Increment version
# e.g., 0.1.0 -> 0.1.1

# Try publishing again
npm publish --access public
```

### npm Registry Errors

```bash
# Clear cache
npm cache clean --force

# Retry
npm publish --access public --verbose
```

## Post-Publication

1. **Announce**: Update GitHub releases with npm links
2. **Verify**: Test npm installation works
3. **Monitor**: Watch for bug reports
4. **Update**: Maintain package documentation

## Long-term Maintenance

- Monitor security vulnerabilities
- Keep dependencies updated
- Maintain semver versioning
- Regular releases with improvements
- Community feedback integration

## Links

- NPM: https://www.npmjs.com/org/malayalamlang
- Repository: https://github.com/adsalihac/malayalam-lang
- Issues: https://github.com/adsalihac/malayalam-lang/issues
- Discussions: https://github.com/adsalihac/malayalam-lang/discussions
