# Malayalam Language Extension for Visual Studio Code

[![Version](https://img.shields.io/visual-studio-marketplace/v/malayalamlang.malayalam-language?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/malayalamlang.malayalam-language?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/malayalamlang.malayalam-language?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malayalamlang.malayalam-language)

Write code in Malayalam! This extension provides comprehensive language support for the Malayalam programming language in Visual Studio Code.

## Features

✨ **Syntax Highlighting**
- Full color-coded support for Malayalam keywords and syntax
- Support for both Malayalam Unicode and Manglish (Latin transliteration)
- Automatic detection of `.ml` files

💡 **IntelliSense & Code Completion**
- Intelligent code completion for Malayalam keywords
- Built-in function suggestions
- Smart completion context awareness

📖 **Hover Documentation**
- Hover over keywords to see quick documentation
- Built-in reference for language features
- Helpful tooltips for Malayalam syntax

🎯 **Language Support**
- Automatic language detection for `.ml` files
- Proper bracket matching and auto-closing
- Smart indentation for code blocks
- Comment support (line and block comments)

## Quick Start

### 1. Create a Malayalam File

Create a new file with `.ml` extension:

```ml
കാണിക്കുക("ഹലോ, ലോകം!")
```

### 2. Enjoy Syntax Highlighting

The extension automatically highlights your Malayalam code with color-coded keywords.

### 3. Use IntelliSense

Press `Ctrl+Space` (or `Cmd+Space` on Mac) to see code completion suggestions.

### 4. Hover for Help

Hover over any Malayalam keyword to see quick documentation.

## Language Features

### Output Functions
- `കാണിക്കുക` - Print output to console

### Variables & Data Types
- `എണ്ണം` - Numeric variable
- `പേര്` - String variable

### Control Flow
- `എങ്കിൽ` - If condition
- `എന്ത്` - For loop
- `എല്ലാം` - While loop

### Functions & Returns
- `ഫങ്ക്ഷൻ` - Define a function
- `മടങ്ങി` - Return statement

### Boolean Values
- `സത്യം` - True
- `കള്ളം` - False

## Code Example

```ml
// Factorial function
ഫങ്ക്ഷൻ factorial(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി 1
  }
  മടങ്ങി n * factorial(n - 1)
}

കാണിക്കുക(factorial(5))  // Output: 120
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Open IntelliSense |
| `Ctrl+Shift+/` | Toggle block comment |
| `Ctrl+/` | Toggle line comment |
| `Tab` | Auto-indent line |

## Configuration

Configure Malayalam language settings in VS Code `settings.json`:

```json
"[malayalam]": {
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on"
}
```

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Malayalam Language"
4. Click **Install**

### From VSIX File

```bash
code --install-extension malayalam-language-0.1.0.vsix
```

## Learn the Language

For complete language documentation, visit:
- [Language Syntax Guide](https://github.com/adsalihac/malayalam-lang/blob/main/docs/SYNTAX.md)
- [CLI Reference](https://github.com/adsalihac/malayalam-lang/blob/main/docs/CLI.md)
- [Example Programs](https://github.com/adsalihac/malayalam-lang/tree/main/examples)

## Try Online

Visit the [Malayalam Language Playground](https://playground.malayalamlang.dev) to try the language in your browser without installation.

## Troubleshooting

### Extension not activating
- Make sure your file has `.ml` extension
- Reload VS Code window: `Cmd/Ctrl+R`
- Check extension is enabled in Extensions view

### Syntax highlighting not working
- Verify Malayalam syntax definitions are loaded
- Check VS Code version is 1.60 or later
- Try reloading the window

### IntelliSense not appearing
- Press `Ctrl+Space` (or `Cmd+Space` on Mac)
- Verify the file is recognized as Malayalam (check bottom right)
- Check that you're using `.ml` file extension

## Roadmap

🚀 **Upcoming Features**
- [ ] Language Server Protocol (LSP) support
- [ ] Debugging support
- [ ] Code formatter
- [ ] Linter integration
- [ ] Code snippets
- [ ] Theme support
- [ ] Performance optimizations

## Contributing

Found a bug? Have a feature idea? Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - See [LICENSE](LICENSE) for details

Copyright (c) 2025 MalayalamLang Contributors

## Support & Community

- **Report Issues**: [GitHub Issues](https://github.com/adsalihac/malayalam-lang/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adsalihac/malayalam-lang/discussions)
- **Main Repository**: [malayalam-lang](https://github.com/adsalihac/malayalam-lang)

---

**Made with ❤️ by the MalayalamLang Community**
