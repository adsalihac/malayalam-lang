# Developer Guide for MalayalamLang

## Welcome!

Thank you for your interest in contributing to MalayalamLang. This guide will help you understand the codebase and start making contributions.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (or npm)
- Git
- Basic knowledge of TypeScript

### Initial Setup

```bash
# Clone repository
git clone https://github.com/adsalihac/malayalam-lang.git
cd malayalam-lang

# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## Project Structure

### Packages

#### `packages/core/`
The heart of MalayalamLang - the compiler.

```
core/src/
├── lexer.ts        # Tokenizer (Malayalam → tokens)
├── parser.ts       # Parser (tokens → AST)
├── ast.ts          # AST node definitions
├── transpiler.ts   # Transpiler (AST → JavaScript)
└── index.ts        # Main Compiler class
```

**Key Classes:**
- `Lexer`: Tokenizes Malayalam source code
- `Parser`: Parses tokens into AST
- `Transpiler`: Converts AST to JavaScript
- `Compiler`: Orchestrates the pipeline

#### `packages/runtime/`
Built-in Malayalam functions and utilities.

```
runtime/src/
└── index.ts        # Runtime functions
```

**Key Function:**
- `MalayalamRuntime`: Static class with built-in functions

#### `packages/cli/`
Command-line interface and REPL.

```
cli/src/
├── index.ts        # Main CLI class
└── cli.ts          # Command-line entry point
```

## Understanding the Compiler

### Compilation Pipeline

```
Malayalam Code
    ↓
  Lexer
    ↓
Parser
    ↓
   AST
    ↓
Transpiler
    ↓
JavaScript Code
    ↓
Node.js Execution
```

### Example: Tracing "കാണിക്കുക("Hello")"

#### 1. Lexer Output
```
[
  { type: 'PRINT', value: 'കാണിക്കുക' },
  { type: 'LPAREN', value: '(' },
  { type: 'STRING', value: 'Hello' },
  { type: 'RPAREN', value: ')' },
  { type: 'EOF', value: '' }
]
```

#### 2. Parser Output (AST)
```json
{
  "type": "Program",
  "body": [{
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "console.log"
      },
      "arguments": [{
        "type": "Literal",
        "value": "Hello",
        "raw": "\"Hello\""
      }]
    }
  }]
}
```

#### 3. Transpiler Output
```javascript
console.log("Hello");
```

#### 4. Execution
```
Hello
```

## Making Changes

### Adding a New Keyword

Let's add a new Malayalam keyword `കറയ്ക്കുക` (error message printing).

#### Step 1: Update Lexer

File: `packages/core/src/lexer.ts`

```typescript
export const MALAYALAM_KEYWORDS = {
  // ... existing keywords ...
  കറയ്ക്കുക: 'error',
  karkka: 'error',
};

export type TokenType = 
  | 'PRINT'
  | 'ERROR'  // Add this
  | // ... rest ...

const KEYWORD_TOKEN_MAP: { [key: string]: TokenType } = {
  // ... existing ...
  error: 'ERROR',
};
```

#### Step 2: Update Transpiler

File: `packages/core/src/transpiler.ts`

Add special handling in `transpileCallExpression`:

```typescript
if (expr.callee.name === 'error') {
  return `console.error(${args})`;
}
```

#### Step 3: Write Tests

File: `packages/core/src/compiler.test.ts`

```typescript
it('should compile error statement', () => {
  const source = 'കറയ്ക്കുക("Error!")';
  const compiler = new Compiler();
  const result = compiler.compile(source);
  
  expect(result.success).toBe(true);
  expect(result.code).toContain('console.error');
});
```

#### Step 4: Update Documentation

File: `docs/SYNTAX.md`

```markdown
### Error Output

```ml
കറയ്ക്കുക("This is an error")
```
```

#### Step 5: Test

```bash
pnpm -C packages/core test
```

### Adding a Built-in Function

Let's add `നീളം` (length) function.

#### Step 1: Update Runtime

File: `packages/runtime/src/index.ts`

```typescript
static length(value: unknown): number {
  if (
    typeof value === 'string' ||
    Array.isArray(value) ||
    (typeof value === 'object' && value !== null && 'length' in value)
  ) {
    return (value as { length: number }).length;
  }
  return 0;
}
```

#### Step 2: Test

```typescript
it('should get length of string', () => {
  const result = MalayalamRuntime.length("hello");
  expect(result).toBe(5);
});
```

#### Step 3: Document

Add to `docs/SYNTAX.md` built-in functions section.

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm -C packages/core test

# Watch mode
pnpm test -- --watch

# With coverage
pnpm test -- --coverage
```

### Writing Tests

Use Vitest:

```typescript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something', () => {
    const result = someFunction();
    expect(result).toBe(expectedValue);
  });

  it('should handle error cases', () => {
    expect(() => invalidFunction()).toThrow();
  });
});
```

## Code Style

### TypeScript Guidelines

- Use strict mode (enabled in tsconfig.json)
- Explicit return types for functions
- No `any` types (use `unknown` if needed)
- Meaningful variable names
- Comments for complex logic

### Formatting

```bash
# Auto-format code
pnpm format

# Check formatting
pnpm format:check
```

### Linting

```bash
# Run linter
pnpm lint

# Fix fixable issues
pnpm lint -- --fix
```

## Common Development Tasks

### Debug Compilation

```bash
// Add to lexer, parser, or transpiler:
console.log('Tokens:', tokens);
console.log('AST:', JSON.stringify(ast, null, 2));
console.log('JavaScript:', code);
```

### Test an Example

```bash
node packages/cli/dist/cli.js run examples/hello.ml
node packages/cli/dist/cli.js compile examples/hello.ml
```

### Rebuild After Changes

```bash
# TypeScript auto-compiles in watch mode
pnpm build

# Or for specific package
pnpm -C packages/core build
```

### Run REPL for Manual Testing

```bash
node packages/cli/dist/cli.js repl
>>> കാണിക്കുക("test")
test
```

## Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/add-new-keyword
```

### Commit Messages

Follow conventional commits:

```
feat: Add new keyword കാണിക്കുക
fix: Fix parser error handling
docs: Update syntax guide
test: Add tests for lexer
refactor: Simplify transpiler logic
```

### Push and Create PR

```bash
git push origin feature/add-new-keyword
# Create pull request on GitHub
```

## Debugging

### Enable Debug Logging

Add to source code:

```typescript
const DEBUG = true;

if (DEBUG) {
  console.log('Debug info:', value);
}
```

### Use Node Debugger

```bash
node --inspect-brk packages/cli/dist/cli.js run test.ml
# Then open chrome://inspect
```

### TypeScript Type Checking

```bash
# Check types without building
npx tsc --noEmit
```

## Performance Optimization

### Profile Compilation

```typescript
const startTime = performance.now();
const result = compiler.compile(source);
const endTime = performance.now();
console.log(`Compilation took ${endTime - startTime}ms`);
```

### Memory Usage

```bash
node --max-old-space-size=4096 packages/cli/dist/cli.js run large-file.ml
```

## Architecture Improvements

### Add New Language Feature

1. Update `lexer.ts` - recognize the syntax
2. Update `parser.ts` - parse into statements/expressions
3. Define AST nodes in `ast.ts`
4. Implement in `transpiler.ts`
5. Add tests
6. Document in `docs/SYNTAX.md`

### Add New Built-in Function

1. Implement in `runtime/src/index.ts`
2. Add tests to `runtime/src/index.test.ts`
3. Document in `docs/SYNTAX.md`
4. Add examples in `examples/`

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Compiler Design Principles](https://en.wikipedia.org/wiki/Compiler)
- [AST Documentation](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- [Node.js API](https://nodejs.org/api/)

## Getting Help

- **Questions**: Open an issue with `[question]` label
- **Bug Reports**: Open issue with `[bug]` label
- **Feature Requests**: Open issue with `[enhancement]` label
- **Discussions**: Use GitHub discussions tab

## Next Steps

1. Pick an issue labeled `good first issue`
2. Fork and clone the repository
3. Create a feature branch
4. Make your changes
5. Add tests and documentation
6. Submit a pull request

Happy coding! 🎉
