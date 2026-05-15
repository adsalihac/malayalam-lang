import type * as Monaco from 'monaco-editor';

export const MALAYALAM_KEYWORDS = [
  'കാണിക്കുക',
  'kanikkuka',
  'എങ്കിൽ',
  'enkil',
  'അല്ലെങ്കിൽ',
  'allenkil',
  'എന്ത്',
  'enth',
  'എതിരായ',
  'ethiraya',
  'ഫങ്ക്ഷൻ',
  'function',
  'മടങ്ങി',
  'matangi',
  'സത്യം',
  'sathyam',
  'തെറ്റ്',
  'thett',
  'നൾ',
  'null',
  'വിവരണം',
  'vivaranam',
  'കൂടെ',
  'kude',
  'അല്ല',
  'alla',
];

export function registerMalayalamLanguage(monaco: typeof Monaco) {
  monaco.languages.register({ id: 'malayalamlang' });

  monaco.languages.setMonarchTokensProvider('malayalamlang', {
    keywords: MALAYALAM_KEYWORDS,
    tokenizer: {
      root: [
        // Comments
        [/\/\/.*$/, 'comment'],

        // Strings
        [/"([^"\\]|\\.)*"/, 'string'],
        [/'([^'\\]|\\.)*'/, 'string'],

        // Numbers
        [/\d+(\.\d+)?/, 'number'],

        // Malayalam keywords
        [
          /[\u0D00-\u0D7F]+/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],

        // Latin identifiers / manglish keywords
        [
          /[a-zA-Z_][a-zA-Z0-9_]*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],

        // Operators
        [/[+\-*/%]/, 'operator'],
        [/[=<>!]=?/, 'operator'],
        [/&&|[|][|]/, 'operator'],
        [/\+\+|--/, 'operator'],

        // Delimiters
        [/[{}()[\]]/, 'delimiter'],
        [/[;,]/, 'delimiter'],

        // Whitespace
        [/\s+/, 'white'],
      ],
    },
  } as Monaco.languages.IMonarchLanguage);

  monaco.languages.setLanguageConfiguration('malayalamlang', {
    comments: {
      lineComment: '//',
    },
    brackets: [
      ['{', '}'],
      ['(', ')'],
      ['[', ']'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}]*$/,
      decreaseIndentPattern: /^.*\}/,
    },
  });
}

export function defineMalayalamThemes(monaco: typeof Monaco) {
  monaco.editor.defineTheme('malayalam-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'C792EA', fontStyle: 'bold' },
      { token: 'string', foreground: 'C3E88D' },
      { token: 'number', foreground: 'F78C6C' },
      { token: 'comment', foreground: '546E7A', fontStyle: 'italic' },
      { token: 'identifier', foreground: 'EEFFFF' },
      { token: 'operator', foreground: '89DDFF' },
      { token: 'delimiter', foreground: 'BFC7D5' },
    ],
    colors: {
      'editor.background': '#0F111A',
      'editor.foreground': '#EEFFFF',
      'editor.lineHighlightBackground': '#1A1C2E',
      'editor.selectionBackground': '#3D4166',
      'editorCursor.foreground': '#FFCC00',
      'editorLineNumber.foreground': '#3B4261',
      'editorLineNumber.activeForeground': '#737AA2',
      'editor.selectionHighlightBackground': '#2D3352',
      'editorBracketMatch.background': '#3D4166',
      'editorBracketMatch.border': '#C792EA',
      'scrollbarSlider.background': '#2D3352',
      'scrollbarSlider.hoverBackground': '#3D4166',
      'minimap.background': '#0D0F18',
    },
  });

  monaco.editor.defineTheme('malayalam-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '7C3AED', fontStyle: 'bold' },
      { token: 'string', foreground: '059669' },
      { token: 'number', foreground: 'DC2626' },
      { token: 'comment', foreground: '94A3B8', fontStyle: 'italic' },
      { token: 'identifier', foreground: '1E293B' },
      { token: 'operator', foreground: '0EA5E9' },
      { token: 'delimiter', foreground: '64748B' },
    ],
    colors: {
      'editor.background': '#F8FAFC',
      'editor.foreground': '#1E293B',
      'editor.lineHighlightBackground': '#EFF6FF',
      'editorCursor.foreground': '#7C3AED',
      'editorLineNumber.foreground': '#CBD5E1',
      'editorLineNumber.activeForeground': '#64748B',
    },
  });

  monaco.editor.defineTheme('malayalam-amoled', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'BD93F9', fontStyle: 'bold' },
      { token: 'string', foreground: '50FA7B' },
      { token: 'number', foreground: 'FFB86C' },
      { token: 'comment', foreground: '6272A4', fontStyle: 'italic' },
      { token: 'identifier', foreground: 'F8F8F2' },
      { token: 'operator', foreground: 'FF79C6' },
      { token: 'delimiter', foreground: 'F8F8F2' },
    ],
    colors: {
      'editor.background': '#000000',
      'editor.foreground': '#F8F8F2',
      'editor.lineHighlightBackground': '#0A0A0A',
      'editorCursor.foreground': '#FF79C6',
      'editorLineNumber.foreground': '#2A2A2A',
      'editorLineNumber.activeForeground': '#6272A4',
      'minimap.background': '#000000',
    },
  });
}

export function getEditorTheme(appTheme: string): string {
  switch (appTheme) {
    case 'light':
      return 'malayalam-light';
    case 'amoled':
      return 'malayalam-amoled';
    default:
      return 'malayalam-dark';
  }
}
