# Malayalam Language Extension for Visual Studio Code

This extension provides comprehensive language support for the Malayalam programming language in Visual Studio Code.

## Features

### Syntax Highlighting
- Full support for Malayalam keywords and syntax
- Color-coded syntax elements for better readability
- Support for both Malayalam Unicode and Manglish code

### IntelliSense & Code Completion
- Intelligent code completion for Malayalam keywords
- Built-in function suggestions
- Smart completion based on context

### Hover Information
- Hover over keywords to see documentation
- Quick reference for built-in functions
- Helpful tooltips for Malayalam syntax

### Language Support
- Automatic language detection for `.ml` files
- Proper bracket matching and auto-closing
- Smart indentation for code blocks
- Comment support (line and block comments)

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Malayalam Language"
4. Click Install

### From Source
```bash
cd packages/vscode-extension
pnpm install
pnpm build
```

## Getting Started

### Create a Malayalam File
1. Create a new file with `.ml` extension
2. Write your Malayalam code:

```ml
കാണിക്കുക("ഹലോ, ലോകം!")
```

### Keyboard Shortcuts
- `Ctrl+Space` - Open IntelliSense
- `Ctrl+Shift+/` - Toggle block comment
- `Ctrl+/` - Toggle line comment

## Built-in Keywords

### Output
- `കാണിക്കുക` (print)

### Data Types
- `എണ്ണം` (number)
- `പേര്` (string)

### Control Flow
- `എങ്കിൽ` (if)
- `എന്ത്` (for loop)
- `എല്ലാം` (while)

### Functions
- `ഫങ്ക്ഷൻ` (function)
- `മടങ്ങി` (return)

### Boolean Values
- `സത്യം` (true)
- `കള്ളം` (false)

## Configuration

The extension provides configuration through language-specific settings:

```json
"[malayalam]": {
  "editor.defaultFormatter": "@malayalamlang/vscode-extension",
  "editor.formatOnSave": true
}
```

## Troubleshooting

### Extension not activating
- Make sure your file has `.ml` extension
- Reload the VS Code window (Cmd/Ctrl+R)
- Check the extension is enabled in Extensions view

### Syntax highlighting not working
- Verify the Malayalam syntax definitions are loaded
- Check VS Code version is 1.60 or later
- Try reloading the window

## Contributing

To contribute to the extension:

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build: `pnpm build`
4. Test in VS Code (Debug mode)
5. Submit a pull request

## Roadmap

- [ ] Language Server Protocol (LSP) support
- [ ] Debugging support
- [ ] Code formatter
- [ ] Linter integration
- [ ] Code snippets
- [ ] Theme support

## License

MIT License - See [LICENSE](../../LICENSE) for details

## Support

For issues and feature requests, visit: https://github.com/adsalihac/malayalam-lang/issues
