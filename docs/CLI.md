# MalayalamLang CLI Reference

## Installation

```bash
npm install -g @malayalamlang/cli
```

## Commands

### Run a Script

Execute a Malayalam script file:

```bash
malayalam run script.ml
```

Example:

```bash
malayalam run hello.ml
malayalam run calculator.ml
```

### Compile to JavaScript

Compile a Malayalam file to JavaScript:

```bash
# Print to console
malayalam compile script.ml

# Save to file
malayalam compile script.ml output.js
```

Example:

```bash
malayalam compile hello.ml
malayalam compile hello.ml hello.js
```

The compiled JavaScript will be compatible with Node.js.

### Interactive REPL

Start an interactive Read-Eval-Print Loop for testing:

```bash
malayalam repl
```

In REPL mode:
- Enter Malayalam code and press Enter to execute
- Type `exit` to quit

Examples:

```
>>> കാണിക്കുക("ഹലോ")
ഹലോ

>>> നമ്പർ = 42
>>> കാണിക്കുക(നമ്പർ)
42

>>> exit
Goodbye! 👋
```

### Version

Display the current version:

```bash
malayalam version
```

## Usage Examples

### Simple Program

Create `program.ml`:

```ml
കാണിക്കുക("ഹലോ, ലോകം!")
```

Run it:

```bash
$ malayalam run program.ml
ഹലോ, ലോകം!
```

### Function Example

Create `functions.ml`:

```ml
ഫങ്ക്ഷൻ സ്വാഗതം(നാമം) {
  കാണിക്കുക("സ്വാഗതം, ")
  കാണിക്കുക(നാമം)
}

സ്വാഗതം("നാരായണൻ")
സ്വാഗതം("മാധവ")
```

Run it:

```bash
$ malayalam run functions.ml
സ്വാഗതം, നാരായണൻ
സ്വാഗതം, മാധവ
```

### Loop Example

Create `loop.ml`:

```ml
എതിരായ (i = 1; i <= 5; i = i + 1) {
  കാണിക്കുക(i)
}
```

Run it:

```bash
$ malayalam run loop.ml
1
2
3
4
5
```

### Compile and Keep Output

```bash
malayalam compile hello.ml hello.js
# Now you can run the JavaScript directly
node hello.js
```

## Common Patterns

### Reading Input (via variables)

```ml
നാമം = "നാരായണൻ"
കാണിക്കുക("നാമം: ")
കാണിക്കുക(നാമം)
```

### Multiple Statements

```ml
x = 5
y = 10
കാണിക്കുക(x + y)
```

### Nested Functions

```ml
ഫങ്ക്ഷൻ outer(a) {
  ഫങ്ക്ഷൻ inner(b) {
    മടങ്ങി a + b
  }
  മടങ്ങി inner(10)
}

കാണിക്കുക(outer(5))  // 15
```

## Error Messages

The CLI provides helpful error messages:

```
❌ Syntax Error: Expected RPAREN but got EOF at line 1, column 15
```

Check your code syntax and line numbers indicated in the error.

## Tips

1. **Use REPL for testing** - Great for learning and experimenting
2. **Save to files** - Use `.ml` extension for Malayalam files
3. **Check compiled output** - Use `compile` to see generated JavaScript
4. **Comment your code** - Use `//` for comments

## Advanced Usage

### Watch Mode (Coming Soon)

```bash
malayalam watch script.ml
```

Automatically recompiles when file changes.

### Debugging (Coming Soon)

```bash
malayalam debug script.ml
```

Interactive debugging with breakpoints.

## Getting Help

```bash
malayalam --help
malayalam run --help
malayalam compile --help
```

## Troubleshooting

### "File not found"

Make sure the file path is correct:

```bash
# Wrong
malayalam run hello

# Correct
malayalam run hello.ml
```

### "Syntax error"

Check the Malayalam syntax in your file against the language guide.

### "Command not found"

Make sure the package is installed globally:

```bash
npm install -g @malayalamlang/cli
```

Or use the local package:

```bash
npx @malayalamlang/cli run script.ml
```
