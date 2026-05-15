# MalayalamLang Playground

A modern, browser-based playground for the [MalayalamLang](https://github.com/adsalihac/malayalam-lang) programming language — write Malayalam code and run it directly in the browser.

## Features

- **Monaco Editor** with custom `malayalamlang` syntax highlighting
- **Live compilation** with debounced auto-compile as you type
- **Sandbox execution** via `new Function()` with console interception
- **JavaScript preview** panel showing generated JS
- **Terminal-style output** console with colored log levels
- **8 example programs**: Hello World, Variables, Conditionals, Loops, Functions, Factorial, Fibonacci, Calculator
- **3 themes**: VSCode Dark, Light, AMOLED Dark
- **Keyboard shortcut**: `⌘+Enter` / `Ctrl+Enter` to run
- **Responsive layout**: side-by-side on desktop, stacked on mobile
- **Framer Motion** animations throughout

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework |
| React 18 | UI |
| TypeScript | Type safety |
| TailwindCSS | Styling |
| `@monaco-editor/react` | Code editor |
| Zustand | State management |
| Framer Motion | Animations |
| next-themes | Dark/light theming |
| `@malayalamlang/core` | Compiler/transpiler |

## Getting Started

```bash
# From repo root
pnpm install

# Run playground dev server
cd apps/playground
pnpm dev
# → http://localhost:3001

# Production build
pnpm build
```

## Project Structure

```
apps/playground/src/
├── app/
│   ├── layout.tsx          # Root layout with ThemeProvider
│   ├── page.tsx            # Main playground page
│   └── globals.css         # CSS variables + Tailwind + glassmorphism
├── components/
│   ├── Header.tsx          # Navbar: logo, examples dropdown, theme, GitHub
│   ├── Toolbar.tsx         # Run button + compile status bar
│   ├── Editor.tsx          # Monaco editor with malayalamlang language
│   ├── RightPanel.tsx      # Tab container (Output | JavaScript)
│   ├── OutputPanel.tsx     # Terminal-style console with log levels
│   ├── JSPreview.tsx       # Generated JavaScript viewer
│   ├── RunButton.tsx       # Animated run button with loading state
│   ├── Footer.tsx          # Open source footer
│   └── Providers.tsx       # next-themes ThemeProvider
├── store/
│   └── usePlaygroundStore.ts  # Zustand store for all state
├── lib/
│   ├── compiler.ts         # @malayalamlang/core wrapper + sandbox runner
│   ├── examples.ts         # 8 example programs
│   ├── monacoLanguage.ts   # Language tokenizer + 3 themes
│   └── utils.ts            # cn(), debounce()
└── hooks/
    └── useKeyboardShortcuts.ts  # ⌘+Enter to run
```
