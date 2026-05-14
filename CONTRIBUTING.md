# Contributing to MalayalamLang

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/malayalam-lang.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Development Workflow

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Run linter
pnpm lint

# Format code
pnpm format

# Watch mode for development
pnpm dev
```

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Format with Prettier
- Write tests for new features
- Keep files under 300 lines

## Commit Message Format

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
test: Add tests
refactor: Refactor code
```

Include a Co-authored-by trailer if working together.

## Pull Request Process

1. Update tests for your changes
2. Run `pnpm test` to ensure tests pass
3. Run `pnpm lint` and `pnpm format` for code quality
4. Write a clear PR description
5. Link related issues

## Areas for Contribution

- **Language Features**: Add new keywords and syntax
- **Standard Library**: Implement built-in functions
- **Tooling**: Improve CLI, REPL, debugging
- **Documentation**: Translate docs, add examples
- **VSCode Extension**: Add language features
- **Testing**: Improve test coverage

## Questions?

- Open an issue with `[question]` label
- Join discussions on GitHub

Happy coding! 🚀
