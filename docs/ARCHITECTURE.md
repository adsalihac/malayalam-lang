# MalayalamLang Architecture

## Overview

MalayalamLang is a modern programming language that allows developers to write code using Malayalam keywords. It compiles down to JavaScript and runs on Node.js.

## Architecture Diagram

```
┌─────────────────────────────────────────────┐
│         Malayalam Source Code               │
│      (.ml files with Malayalam/Manglish)    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│            Lexer/Tokenizer                  │
│  (Converts source to tokens)                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│              Parser                         │
│  (Converts tokens to AST)                   │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│    Abstract Syntax Tree (AST)               │
│  (Language-independent representation)      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│            Transpiler                       │
│  (Converts AST to JavaScript)               │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│        JavaScript Code                      │
│      (Valid ES2020 code)                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│         Node.js Runtime                     │
│      (Execution environment)                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│              Output                         │
│      (Console logs, results)                │
└─────────────────────────────────────────────┘
```

## Core Components

### 1. Lexer (@malayalamland/core)

The lexer (lexical analyzer) converts source code into tokens.

**Responsibilities:**
- Read character by character from source
- Recognize Malayalam Unicode characters and Manglish keywords
- Identify operators, literals, identifiers
- Skip whitespace and comments
- Generate token stream

**Key Features:**
- Malayalam keyword recognition
- Manglish (transliterated) support
- String literal parsing with escape sequences
- Number parsing (integers and floats)
- Comment handling

```typescript
class Lexer {
  tokenize(source: string): Token[]
}
```

### 2. Parser (@malayalamland/core)

The parser converts tokens into an Abstract Syntax Tree (AST).

**Responsibilities:**
- Read tokens from lexer
- Validate syntax according to grammar rules
- Build hierarchical AST structure
- Provide helpful error messages

**Supported Constructs:**
- Variable declarations
- Function declarations
- Control flow (if/else, while, for)
- Expressions and operators
- Function calls

```typescript
class Parser {
  parse(tokens: Token[]): AST.Program
}
```

### 3. AST (Abstract Syntax Tree)

Language-independent representation of the program structure.

**Node Types:**
- `Program` - Root node containing statements
- `VariableDeclaration` - Variable assignment
- `FunctionDeclaration` - Function definition
- `IfStatement` - Conditional execution
- `WhileStatement` - Loop construct
- `ForStatement` - C-style loop
- `ReturnStatement` - Function return
- Expression nodes (Binary, Unary, Call, etc.)

### 4. Transpiler (@malayalamland/core)

Converts AST into JavaScript code.

**Responsibilities:**
- Traverse AST nodes
- Generate equivalent JavaScript
- Maintain proper indentation
- Handle scope and variable declarations

```typescript
class Transpiler {
  transpile(ast: AST.Program): string
}
```

### 5. Runtime (@malayalamland/runtime)

Provides built-in functions and utilities.

**Functions:**
- `print()` - Console output
- Math functions (abs, sqrt, pow, etc.)
- String functions (toUpperCase, substring, etc.)
- Type checking functions

### 6. CLI (@malayalamland/cli)

Command-line interface for development.

**Commands:**
- `run` - Execute Malayalam files
- `compile` - Generate JavaScript
- `repl` - Interactive environment

## Data Flow Example

### Input
```ml
ഫങ്ക്ഷൻ ചതുരം(x) {
  മടങ്ങി x * x
}
കാണിക്കുക(ചതുരം(5))
```

### After Lexer
```
FUNCTION IDENTIFIER(square) LPAREN IDENTIFIER(x) RPAREN LBRACE
RETURN IDENTIFIER(x) MULTIPLY IDENTIFIER(x)
RBRACE
PRINT LPAREN IDENTIFIER(square) LPAREN NUMBER(5) RPAREN RPAREN
```

### After Parser (AST Structure)
```json
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": "ചതുരം",
      "params": ["x"],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "BinaryExpression",
              "operator": "*",
              "left": {"type": "Identifier", "name": "x"},
              "right": {"type": "Identifier", "name": "x"}
            }
          }
        ]
      }
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {"type": "Identifier", "name": "console.log"},
        "arguments": [...]
      }
    }
  ]
}
```

### After Transpiler (JavaScript)
```javascript
function ചതുരം(x) {
  return x * x;
}

console.log(ചതുരം(5));
```

### Output
```
25
```

## Language Features

### Variable Declaration
Supports implicit variable declaration with automatic type inference.

### Functions
First-class functions with proper scoping.

### Control Flow
- Conditional: `എങ്കിൽ`/`else`
- Loops: `എന്ത്` (while), `എതിരായ` (for)

### Operators
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `കൂടെ` (and), `അല്ലെങ്കിൽ` (or), `അല്ല` (not)

### Comments
Single-line comments with `//`

## Keyword Mapping

Malayalam keywords are mapped to JavaScript equivalents:

| Malayalam | Manglish | JavaScript |
|-----------|----------|-----------|
| കാണിക്കുക | kanikkuka | console.log |
| എങ്കിൽ | enkil | if |
| അല്ലെങ്കിൽ | allenkil | else |
| ഫങ്ക്ഷൻ | function | function |
| മടങ്ങി | matangi | return |
| എന്ത് | enth | while |
| എതിരായ | ethiraya | for |

## Error Handling

Errors are reported with:
- Error type (Syntax, Runtime, etc.)
- Message description
- Line and column numbers
- Context information

## Performance Considerations

1. **Compilation Speed**: Single-pass transpilation for fast feedback
2. **Generated Code**: Efficient JavaScript that matches hand-written code
3. **Memory**: Minimal AST representation
4. **Startup Time**: Fast CLI startup for REPL mode

## Future Extensions

Planned features:
1. Type system (optional static typing)
2. Module system (import/export)
3. Class support
4. Async/await
5. Error recovery and better diagnostics
6. Optimization passes
7. Debugging support
8. WASM compilation target

## Development Workflow

1. Write Malayalam code
2. Lexer tokenizes
3. Parser validates and creates AST
4. Transpiler generates JavaScript
5. Runtime executes with Node.js

For development:
```bash
pnpm install          # Install dependencies
pnpm build           # Compile TypeScript
pnpm test            # Run tests
pnpm lint            # Check code quality
```

## Contributing

To extend the language:
1. Add keywords to Lexer
2. Update Parser with new grammar rules
3. Create AST node types
4. Implement Transpiler logic
5. Add runtime support if needed
6. Write tests and examples
