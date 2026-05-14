# 🚀 START HERE - MalayalamLang

Welcome! This is **MalayalamLang** - a complete Malayalam programming language.

## 📖 What is MalayalamLang?

A modern programming language where you write code using **Malayalam keywords**:

```ml
കാണിക്കുക("ഹലോ, ലോകം!")  // Prints: ഹലോ, ലോകം!
```

Compiles to JavaScript and runs on Node.js.

## ⚡ Quick Start (2 minutes)

### 1. Install Dependencies
```bash
cd /Users/adsalihac/Desktop/malayalam-lang
pnpm install
```

### 2. Build Everything
```bash
pnpm build
```

### 3. Run an Example
```bash
node packages/cli/dist/cli.js run examples/hello.ml
```

### 4. Try the REPL
```bash
node packages/cli/dist/cli.js repl
>>> കാണിക്കുക("test")
test
>>> 2 + 2
4
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| **README.md** | Main overview & features |
| **SETUP.md** | Installation & development guide |
| **docs/SYNTAX.md** | Language syntax & examples |
| **docs/CLI.md** | CLI commands & usage |
| **docs/ARCHITECTURE.md** | How the compiler works |
| **DEVELOPER.md** | How to contribute |
| **examples/** | 5 complete sample programs |

## 🎯 Your Next Steps

### I want to...

**🎓 Learn the Language**
1. Read `docs/SYNTAX.md` - Complete language guide
2. Check `examples/` - 5 working programs
3. Try `malayalam repl` - Experiment interactively

**🛠️ Develop & Contribute**
1. Read `DEVELOPER.md` - How to contribute
2. Review `docs/ARCHITECTURE.md` - Compiler internals
3. Check existing code in `packages/core/src/`

**🚀 Publish to npm**
1. Read `PUBLISHING.md`
2. Update version numbers
3. Run `pnpm build && pnpm test`
4. Execute `pnpm -r publish --access public`

**🧪 Run Tests**
```bash
pnpm test
```

**✨ Use the CLI**
```bash
# Run a file
malayalam run examples/hello.ml

# Compile to JavaScript
malayalam compile examples/hello.ml

# Interactive REPL
malayalam repl
```

## 📂 Project Structure

```
malayalam-lang/
├── packages/core/       ← Compiler (what you need to understand)
│   └── src/
│       ├── lexer.ts     ← Tokenizer
│       ├── parser.ts    ← AST builder
│       ├── transpiler.ts ← Code generator
│       └── ast.ts       ← Node definitions
├── packages/runtime/    ← Built-in functions
├── packages/cli/        ← Command-line tools
├── examples/            ← Sample .ml programs
├── docs/                ← Technical documentation
└── [Various configs]    ← TypeScript, ESLint, Prettier, etc.
```

## 💡 Example Programs

### Hello World
```ml
കാണിക്കുക("ഹലോ, ലോകം!")
```

### Variables & Math
```ml
x = 5
y = 10
കാണിക്കുക(x + y)  // 15
```

### Functions
```ml
ഫങ്ക്ഷൻ ചതുരം(n) {
  മടങ്ങി n * n
}
കാണിക്കുക(ചതുരം(5))  // 25
```

### Loops
```ml
എതിരായ (i = 1; i <= 5; i = i + 1) {
  കാണിക്കുക(i)
}
// Output: 1 2 3 4 5
```

## 🔧 Common Commands

```bash
# Setup
pnpm install           # Install all dependencies
pnpm build            # Build all packages
pnpm clean            # Remove build artifacts

# Development
pnpm test             # Run tests
pnpm lint             # Check code quality
pnpm format           # Auto-format code

# CLI
malayalam run file.ml          # Execute file
malayalam compile file.ml      # Generate JavaScript
malayalam repl                 # Interactive environment
```

## 📋 Files at a Glance

### Essential Reading
- **README.md** - Start here for overview
- **SETUP.md** - Setup instructions
- **docs/SYNTAX.md** - Language reference

### For Development
- **DEVELOPER.md** - Contributing guide
- **docs/ARCHITECTURE.md** - How it works

### For Publishing
- **PUBLISHING.md** - npm release guide

### For Examples
- **examples/hello.ml** - Hello World
- **examples/calculator.ml** - Functions
- **examples/factorial.ml** - Recursion
- **examples/fibonacci.ml** - Loops
- **examples/variables.ml** - Variables

## ✅ What's Included

✅ Complete compiler (Lexer → Parser → Transpiler)  
✅ CLI with run, compile, and REPL  
✅ 40+ built-in functions  
✅ 5 example programs  
✅ Full documentation  
✅ Unit & integration tests  
✅ GitHub Actions CI/CD  
✅ MIT License  

## 🎓 Learning Resources

### For Language Users
1. Start: `docs/SYNTAX.md`
2. Explore: `examples/`
3. Practice: `malayalam repl`

### For Compiler Developers
1. Learn: `docs/ARCHITECTURE.md`
2. Study: `packages/core/src/lexer.ts`
3. Explore: `packages/core/src/parser.ts`
4. Review: `packages/core/src/transpiler.ts`

### For Contributors
1. Read: `DEVELOPER.md`
2. Check: `CONTRIBUTING.md`
3. Understand: `docs/ARCHITECTURE.md`
4. Code: Create feature branch

## 🐛 Troubleshooting

**Can't run commands?**
- Make sure you've run `pnpm install` and `pnpm build`
- Check that Node.js 18+ is installed

**Tests failing?**
- Run `pnpm clean && pnpm install && pnpm build`
- Check file permissions

**CLI not working?**
- Ensure `packages/cli/dist/cli.js` exists
- Run `pnpm build` again

## 🤝 Contributing

1. Fork the repository
2. Read `CONTRIBUTING.md`
3. Create a feature branch
4. Make changes and add tests
5. Submit a pull request

## 📞 Support

- **Documentation**: Read the docs/ folder
- **Examples**: Check examples/ folder
- **Issues**: GitHub issues (when published)
- **Discussions**: GitHub discussions

## 🎉 You're All Set!

You now have:
- ✅ Complete compiler system
- ✅ Working CLI tools
- ✅ Example programs
- ✅ Full documentation
- ✅ Ready for development or publishing

## What to Do Next

1. **Explore**: `ls -la` to see all files
2. **Learn**: Read `docs/SYNTAX.md`
3. **Build**: Run `pnpm build`
4. **Test**: Run `pnpm test`
5. **Try**: `malayalam repl`
6. **Create**: Write your own .ml files!

---

**Ready?** Start with `README.md` → `SETUP.md` → `docs/SYNTAX.md` → `examples/`

**Questions?** Check the docs/ folder or review DEVELOPER.md

**Happy coding!** 🇮🇳✨
