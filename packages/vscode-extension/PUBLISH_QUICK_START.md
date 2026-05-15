# Quick Release Guide

## One-Command Release

```bash
pnpm publish
```

This will:
1. ✅ Verify prerequisites (vsce CLI, git status)
2. ✅ Build the extension
3. ✅ Run tests
4. ✅ Check icon exists
5. ✅ Package the VSIX file
6. ✅ Prompt for marketplace upload
7. ✅ Publish to VS Code Marketplace

## Automated Release (with PAT)

```bash
VSCE_PAT=your_personal_access_token pnpm publish:auto
```

Skip the prompt and publish automatically.

## Manual Steps (if preferred)

```bash
# 1. Build
pnpm build

# 2. Run tests
pnpm test:run

# 3. Package
pnpm package
# Creates: malayalam-language-X.X.X.vsix

# 4. Publish
vsce publish
```

## Prerequisites

- ✅ vsce CLI: `npm install -g vsce`
- ✅ Personal Access Token from: https://dev.azure.com/malayalamlang/_usersSettings/tokens
- ✅ All tests passing
- ✅ Version updated in package.json
- ✅ Icon.png or icon.svg present (128x128+)

## Verify Release

```bash
# Check marketplace
vsce search malayalam

# Install from marketplace
code --install-extension malayalamlang.malayalam-language

# Visit
# https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language
```

## Troubleshooting

- **"Unable to authenticate"** → Check PAT validity and expiration
- **"File too large"** → Verify .vscodeignore excludes src/ and tests
- **"Icon missing"** → Add icon.png (128x128) or icon.svg

For detailed guide: see `RELEASE_GUIDE.md`
