# MalayalamLang - Setup & Installation Guide

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### Installation from Source

```bash
# Clone or navigate to the repository
cd malayalam-lang

# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies for the monorepo
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Try the CLI
pnpm -C packages/cli exec malayalam run ../../../examples/hello.ml
```

## Project Structure

```
malayalam-lang/
├── packages/
│   ├── core/              # Compiler (Lexer, Parser, Transpiler, AST)
│   ├── runtime/           # Built-in functions and runtime
│   ├── cli/               # Command-line interface and REPL
│   ├── vscode-extension/  # VSCode extension (future)
│   └── playground/        # Browser playground (future)
├── examples/              # Example Malayalam programs
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD configuration
├── pnpm-workspace.yaml    # pnpm monorepo configuration
└── README.md             # Main README
```

## Development Setup

### Install Dependencies

```bash
pnpm install
```

This installs:
- TypeScript compiler
- ESLint for code quality
- Prettier for code formatting
- Vitest for testing
- Commander.js for CLI
- Chevrotain for parser

### Build Commands

```bash
# Build all packages in watch mode
pnpm build
pnpm -r --parallel watch

# Build specific package
pnpm -C packages/core build
pnpm -C packages/cli build

# Clean build artifacts
pnpm clean
```

### Code Quality

```bash
# Lint all files
pnpm lint

# Fix linting issues
pnpm lint --fix

# Format code
pnpm format

# Check formatting without modifying
pnpm format:check
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in specific package
pnpm -C packages/core test

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

## Using the CLI

### Run a Malayalam Script

```bash
# Using the compiled CLI
node packages/cli/dist/cli.js run examples/hello.ml

# Or if installed globally
malayalam run examples/hello.ml
```

### Compile Malayalam to JavaScript

```bash
# View compiled output
node packages/cli/dist/cli.js compile examples/hello.ml

# Save to file
node packages/cli/dist/cli.js compile examples/hello.ml hello.js

# Then run with Node.js
node hello.js
```

### Interactive REPL

```bash
node packages/cli/dist/cli.js repl

# In REPL:
>>> കാണിക്കുക("ഹലോ")
ഹലോ
>>> exit
```

## Building for Production

### Build All Packages

```bash
pnpm install
pnpm build
pnpm test
```

### Create Distribution

```bash
# Clean previous builds
pnpm clean

# Build with optimizations
pnpm build

# Archive for distribution
tar -czf malayalamland.tar.gz packages/*/dist/ docs/ examples/
```

## Publishing to npm

### Setup

1. Create account on npmjs.com
2. Get authentication token
3. Configure local npm: `npm login`

### Publish

```bash
# Update version numbers
# Edit each package's package.json

# Build
pnpm build

# Publish (must have npm token set)
pnpm -r publish --access public
```

### GitHub Actions Publishing

Add npm token to GitHub Secrets as `NPM_TOKEN`, then push to main branch.

## Docker Setup (Optional)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm && \
    pnpm install && \
    pnpm build

ENTRYPOINT ["pnpm", "-C", "packages/cli", "exec", "malayalam"]
```

Build and run:

```bash
docker build -t malayalamland .
docker run malayalamland run examples/hello.ml
```

## Troubleshooting

### Build Failures

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit

# Fix types
pnpm -r exec npx tsc --noEmit
```

### Missing Dependencies

```bash
# Reinstall all dependencies
rm -rf node_modules
pnpm install
```

### CLI Not Working

```bash
# Build CLI package specifically
pnpm -C packages/cli build

# Make sure it's executable
chmod +x packages/cli/dist/cli.js

# Run directly
node packages/cli/dist/cli.js --help
```

## IDE Setup

### VSCode

Install recommended extensions:
- TypeScript Vue Plugin
- Prettier - Code formatter
- ESLint

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm / IntelliJ

1. Enable TypeScript support
2. Configure run configurations for pnpm
3. Set up npm scripts

## Next Steps

1. **Read the Language Guide**: See `docs/SYNTAX.md`
2. **Check CLI Reference**: See `docs/CLI.md`
3. **Learn Architecture**: See `docs/ARCHITECTURE.md`
4. **Run Examples**: Check `examples/` directory
5. **Contributing**: See `CONTRIBUTING.md`

## Common Tasks

### Add a New Malayalam Keyword

1. Add to `packages/core/src/lexer.ts` in `MALAYALAM_KEYWORDS`
2. Define token type if new
3. Add parser support if needed
4. Update transpiler if needed
5. Write tests
6. Document in `docs/SYNTAX.md`

### Run Example Programs

```bash
# Hello World
node packages/cli/dist/cli.js run examples/hello.ml

# Calculator
node packages/cli/dist/cli.js run examples/calculator.ml

# Factorial
node packages/cli/dist/cli.js run examples/factorial.ml

# Fibonacci
node packages/cli/dist/cli.js run examples/fibonacci.ml
```

### Debug Compilation

```bash
# Compile with output
node packages/cli/dist/cli.js compile examples/hello.ml

# Check AST (modify lexer.ts to export intermediate results)
# See compiler output for debugging
```

## Performance Tips

1. Use pnpm for faster installs
2. Enable TypeScript project references for faster builds
3. Use watch mode during development
4. Cache npm modules in CI/CD

## Getting Help

- **Syntax Issues**: Check `docs/SYNTAX.md`
- **CLI Usage**: Check `docs/CLI.md`
- **Architecture**: Check `docs/ARCHITECTURE.md`
- **Code Examples**: Check `examples/`
- **Contributing**: Check `CONTRIBUTING.md`

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js API Reference](https://nodejs.org/api/)
- [pnpm Documentation](https://pnpm.io/)
- [ESLint Guide](https://eslint.org/docs/rules/)
