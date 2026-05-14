# MalayalamLang - Complete Files Index

## Project Structure (37 Files Total)

### Configuration Files (6 files)

| File | Purpose | Lines |
|------|---------|-------|
| `.eslintrc.json` | ESLint linting configuration | 16 |
| `.prettierrc.json` | Prettier formatting config | 9 |
| `.editorconfig` | Editor configuration | 12 |
| `.gitignore` | Git ignore rules | 11 |
| `tsconfig.json` | Root TypeScript config | 18 |
| `vitest.config.ts` | Test framework config | 15 |

### Workspace & Package Configuration (4 files)

| File | Purpose |
|------|---------|
| `package.json` | Root npm configuration |
| `pnpm-workspace.yaml` | pnpm workspace definition |
| `packages/core/package.json` | Core package config |
| `packages/cli/package.json` | CLI package config |

### Core Compiler (8 files)

**Location**: `packages/core/`

| File | Purpose | Lines | Comments |
|------|---------|-------|----------|
| `src/lexer.ts` | Tokenizer/Lexer | 369 | Malayalam Unicode & Manglish |
| `src/parser.ts` | Syntax Parser | 583 | Recursive descent, AST builder |
| `src/ast.ts` | AST Node Definitions | ~100 | Complete type definitions |
| `src/transpiler.ts` | Code Generator | 279 | AST to JavaScript |
| `src/index.ts` | Main Compiler Export | 45 | Orchestrates pipeline |
| `src/lexer.test.ts` | Lexer Tests | 78 | Unit tests |
| `src/compiler.test.ts` | Compiler Tests | 83 | Integration tests |
| `tsconfig.json` | TypeScript config | 11 | |

### Runtime (2 files)

**Location**: `packages/runtime/`

| File | Purpose | Lines |
|------|---------|-------|
| `src/index.ts` | Built-in Functions | 203 |
| `tsconfig.json` | TypeScript config | 11 |

### CLI (3 files)

**Location**: `packages/cli/`

| File | Purpose | Lines |
|------|---------|-------|
| `src/index.ts` | CLI Main Class | 65 |
| `src/cli.ts` | Command Interface | 98 |
| `tsconfig.json` | TypeScript config | 11 |

### Documentation (9 files)

| File | Purpose | Lines | Audience |
|------|---------|-------|----------|
| `README.md` | Main overview & quick start | 219 | Everyone |
| `SETUP.md` | Installation & development | 354 | Developers |
| `DEVELOPER.md` | Contributing guide | 466 | Contributors |
| `docs/SYNTAX.md` | Language syntax guide | 313 | Language users |
| `docs/CLI.md` | CLI reference | 253 | CLI users |
| `docs/ARCHITECTURE.md` | Technical details | 312 | Advanced developers |
| `PROJECT.md` | Project overview | 376 | Project overview |
| `PUBLISHING.md` | Publication guide | 301 | Maintainers |
| `CONTRIBUTING.md` | Contribution guidelines | 73 | Contributors |

### Examples (5 files)

**Location**: `examples/`

| File | Purpose | Lines | Demonstrates |
|------|---------|-------|--------------|
| `hello.ml` | Hello World | 5 | Basic output |
| `variables.ml` | Variables & Arithmetic | 24 | Variables, operators |
| `calculator.ml` | Math Functions | 30 | Functions |
| `factorial.ml` | Recursion | 16 | Recursion |
| `fibonacci.ml` | Sequence Generation | 14 | Loops |

### CI/CD (1 file)

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | GitHub Actions pipeline |

### Miscellaneous (3 files)

| File | Purpose |
|------|---------|
| `LICENSE` | MIT License |
| `COMPLETION_SUMMARY.md` | Project completion report |
| `FILES_INDEX.md` | This file |

## Quick Reference

### By Type

#### TypeScript Files (12 files)

- `packages/core/src/lexer.ts`
- `packages/core/src/parser.ts`
- `packages/core/src/ast.ts`
- `packages/core/src/transpiler.ts`
- `packages/core/src/index.ts`
- `packages/core/src/lexer.test.ts`
- `packages/core/src/compiler.test.ts`
- `packages/runtime/src/index.ts`
- `packages/cli/src/index.ts`
- `packages/cli/src/cli.ts`
- `vitest.config.ts`
- `packages/cli/tsconfig.json`

#### Configuration Files (8 files)

- `.eslintrc.json`
- `.prettierrc.json`
- `.editorconfig`
- `.gitignore`
- `tsconfig.json` (root)
- `tsconfig.json` (each package)
- `pnpm-workspace.yaml`
- `.github/workflows/ci.yml`

#### Documentation Files (9 files)

- `README.md`
- `SETUP.md`
- `DEVELOPER.md`
- `PUBLISHING.md`
- `CONTRIBUTING.md`
- `PROJECT.md`
- `COMPLETION_SUMMARY.md`
- `docs/SYNTAX.md`
- `docs/CLI.md`
- `docs/ARCHITECTURE.md`

#### Example Programs (5 files)

- `examples/hello.ml`
- `examples/variables.ml`
- `examples/calculator.ml`
- `examples/factorial.ml`
- `examples/fibonacci.ml`

#### Package Configs (6 files)

- `package.json` (root)
- `packages/core/package.json`
- `packages/runtime/package.json`
- `packages/cli/package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`

### By Purpose

#### Language Implementation

- `packages/core/src/lexer.ts` - Tokenization
- `packages/core/src/parser.ts` - Parsing
- `packages/core/src/transpiler.ts` - Code generation
- `packages/core/src/ast.ts` - AST definitions

#### Testing

- `packages/core/src/lexer.test.ts`
- `packages/core/src/compiler.test.ts`
- `vitest.config.ts`

#### CLI & Runtime

- `packages/cli/src/cli.ts`
- `packages/cli/src/index.ts`
- `packages/runtime/src/index.ts`

#### Documentation

- `docs/SYNTAX.md` - Learn the language
- `docs/CLI.md` - Use the tools
- `docs/ARCHITECTURE.md` - Understand internals
- `DEVELOPER.md` - Contribute code
- `PUBLISHING.md` - Release packages

#### Setup & Config

- `SETUP.md` - Installation guide
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript setup
- `.eslintrc.json` - Code quality
- `.prettierrc.json` - Code formatting

## File Dependencies

```
README.md
├── SETUP.md (installation reference)
├── docs/SYNTAX.md (language guide)
├── docs/CLI.md (usage reference)
└── CONTRIBUTING.md (contribution info)

packages/cli/src/cli.ts
├── packages/cli/src/index.ts
├── packages/core/src/index.ts
└── packages/runtime/src/index.ts

packages/core/src/index.ts
├── src/lexer.ts
├── src/parser.ts
├── src/transpiler.ts
└── src/ast.ts

.github/workflows/ci.yml
└── package.json
    ├── packages/core/package.json
    ├── packages/runtime/package.json
    └── packages/cli/package.json
```

## Development Workflows

### First Time Setup

1. Read `README.md`
2. Follow `SETUP.md`
3. Review `docs/SYNTAX.md`
4. Try `examples/hello.ml`

### Making Changes

1. Review `DEVELOPER.md`
2. Understand `docs/ARCHITECTURE.md`
3. Read relevant source files
4. Check tests in `packages/core/src/*.test.ts`
5. Make changes and test

### Publishing

1. Read `PUBLISHING.md`
2. Update `package.json` versions
3. Update `COMPLETION_SUMMARY.md`
4. Commit and push
5. CI/CD handles npm publishing

### Contributing

1. Fork repository
2. Read `CONTRIBUTING.md`
3. Create feature branch
4. Make changes with tests
5. Submit pull request

## Statistics

### Code Files (12 TypeScript)

- Total: ~2,200 lines
- Compiler: ~1,500 lines
- Runtime: ~203 lines
- CLI: ~150 lines
- Tests: ~78 lines

### Documentation (9 Markdown)

- Total: ~2,300 lines
- Main docs: ~900 lines
- Language guide: ~300 lines
- Developer guide: ~500 lines

### Examples (5 Malayalam)

- Total: ~89 lines
- Various patterns and techniques

### Configuration (12 files)

- TypeScript, ESLint, Prettier, Git, pnpm

### Total Project

- **37 files**
- **~4,729 lines of code + documentation**
- **3 npm packages**
- **5 complete examples**

## How to Navigate

### I want to

**Learn the language**
→ Start with `README.md` → `docs/SYNTAX.md` → `examples/`

**Use the CLI**
→ `README.md` → `docs/CLI.md` → Try `examples/`

**Contribute code**
→ `DEVELOPER.md` → `CONTRIBUTING.md` → Review architecture with `docs/ARCHITECTURE.md`

**Understand the compiler**
→ `docs/ARCHITECTURE.md` → Review `packages/core/src/`

**Publish a release**
→ `PUBLISHING.md` → Follow the steps

**Set up development**
→ `SETUP.md` → `pnpm install` → `pnpm build`

**Run tests**
→ `packages/core/src/*.test.ts` → `pnpm test`

**See examples**
→ `examples/` directory (5 files)

## File Sizes

Largest files (by lines):

1. `packages/core/src/parser.ts` - 583 lines
2. `DEVELOPER.md` - 466 lines
3. `packages/core/src/lexer.ts` - 369 lines
4. `SETUP.md` - 354 lines
5. `PROJECT.md` - 376 lines

Smallest files:

1. `examples/hello.ml` - 5 lines
2. `.prettierrc.json` - 9 lines
3. `.editorconfig` - 12 lines
4. `.gitignore` - 11 lines

## Next Steps

1. **Explore**: Review the file structure
2. **Understand**: Read key documentation
3. **Run**: Follow SETUP.md to build
4. **Try**: Execute examples
5. **Develop**: Contribute improvements

---

**Total Files**: 37  
**Total Lines**: 4,729+  
**Status**: Complete & Ready  
**Last Updated**: May 15, 2025
