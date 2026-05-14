// Tamil, Kannada, Telugu mappings for common keywords
export const MALAYALAM_KEYWORDS = {
  // Output
  കാണിക്കുക: 'print',
  kanikkuka: 'print',

  // Control flow
  എങ്കിൽ: 'if',
  enkil: 'if',
  അല്ലെങ്കിൽ: 'else',
  allenkil: 'else',
  എന്ത്: 'while',
  enth: 'while',
  എതിരായ: 'for',
  ethiraya: 'for',

  // Function
  ഫങ്ക്ഷൻ: 'function',
  function: 'function',

  // Return
  മടങ്ങി: 'return',
  matangi: 'return',

  // Boolean
  സത്യം: 'true',
  sathyam: 'true',
  തെറ്റ്: 'false',
  thett: 'false',

  // Null
  നൾ: 'null',
  null: 'null',
  വിവരണം: 'undefined',
  vivaranam: 'undefined',

  // Operators
  കൂടെ: 'and',
  kude: 'and',
  അല്ലെങ്കിൽ: 'or',
  allel: 'or',
  അല്ല: 'not',
  alla: 'not',
};

export const MALAYALAM_TO_JS: { [key: string]: string } = MALAYALAM_KEYWORDS;

export type TokenType =
  | 'PRINT'
  | 'IF'
  | 'ELSE'
  | 'WHILE'
  | 'FOR'
  | 'FUNCTION'
  | 'RETURN'
  | 'TRUE'
  | 'FALSE'
  | 'NULL'
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'LPAREN'
  | 'RPAREN'
  | 'LBRACE'
  | 'RBRACE'
  | 'SEMICOLON'
  | 'COMMA'
  | 'EQUALS'
  | 'PLUS'
  | 'MINUS'
  | 'MULTIPLY'
  | 'DIVIDE'
  | 'MODULO'
  | 'EQ'
  | 'NE'
  | 'LT'
  | 'GT'
  | 'LE'
  | 'GE'
  | 'INCREMENT'
  | 'DECREMENT'
  | 'PLUS_EQUALS'
  | 'MINUS_EQUALS'
  | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

// Keyword to token type mapping
const KEYWORD_TOKEN_MAP: { [key: string]: TokenType } = {
  print: 'PRINT',
  if: 'IF',
  else: 'ELSE',
  while: 'WHILE',
  for: 'FOR',
  function: 'FUNCTION',
  return: 'RETURN',
  true: 'TRUE',
  false: 'FALSE',
  null: 'NULL',
  and: 'AND',
  or: 'OR',
  not: 'NOT',
};

export class Lexer {
  private source: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  private currentChar(): string | null {
    if (this.position >= this.source.length) return null;
    return this.source[this.position];
  }

  private peekChar(offset: number = 1): string | null {
    const pos = this.position + offset;
    if (pos >= this.source.length) return null;
    return this.source[pos];
  }

  private advance(): void {
    if (this.currentChar() === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.position++;
  }

  private skipWhitespace(): void {
    while (this.currentChar() && /\s/.test(this.currentChar()!)) {
      this.advance();
    }
  }

  private skipComment(): void {
    if (this.currentChar() === '/' && this.peekChar() === '/') {
      while (this.currentChar() && this.currentChar() !== '\n') {
        this.advance();
      }
    }
  }

  private readString(quote: string): string {
    let value = '';
    this.advance(); // Skip opening quote

    while (this.currentChar() && this.currentChar() !== quote) {
      if (this.currentChar() === '\\') {
        this.advance();
        const escaped = this.currentChar();
        if (escaped === 'n') value += '\n';
        else if (escaped === 't') value += '\t';
        else if (escaped === '"') value += '"';
        else if (escaped === "'") value += "'";
        else if (escaped === '\\') value += '\\';
        else value += escaped;
        this.advance();
      } else {
        value += this.currentChar();
        this.advance();
      }
    }

    if (this.currentChar() === quote) {
      this.advance(); // Skip closing quote
    }

    return value;
  }

  private readNumber(): string {
    let value = '';
    while (this.currentChar() && /[0-9.]/.test(this.currentChar()!)) {
      value += this.currentChar();
      this.advance();
    }
    return value;
  }

  private readIdentifierOrKeyword(): string {
    let value = '';
    while (
      this.currentChar() &&
      /[a-zA-Z0-9_\u0D00-\u0D7F]/.test(this.currentChar()!)
    ) {
      value += this.currentChar();
      this.advance();
    }
    return value;
  }

  private addToken(type: TokenType, value: string): void {
    this.tokens.push({
      type,
      value,
      line: this.line,
      column: this.column - value.length,
    });
  }

  tokenize(): Token[] {
    while (this.position < this.source.length) {
      this.skipWhitespace();

      if (this.position >= this.source.length) break;

      // Comments
      if (this.currentChar() === '/' && this.peekChar() === '/') {
        this.skipComment();
        continue;
      }

      const char = this.currentChar()!;

      // Strings
      if (char === '"' || char === "'") {
        const value = this.readString(char);
        this.addToken('STRING', value);
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char)) {
        const value = this.readNumber();
        this.addToken('NUMBER', value);
        continue;
      }

      // Identifiers and keywords (including Malayalam)
      if (/[a-zA-Z_\u0D00-\u0D7F]/.test(char)) {
        const value = this.readIdentifierOrKeyword();

        // Check if it's a Malayalam keyword
        const jsKeyword = MALAYALAM_TO_JS[value];
        if (jsKeyword) {
          const tokenType = KEYWORD_TOKEN_MAP[jsKeyword];
          this.addToken(tokenType, value);
        } else if (KEYWORD_TOKEN_MAP[value]) {
          this.addToken(KEYWORD_TOKEN_MAP[value], value);
        } else {
          this.addToken('IDENTIFIER', value);
        }
        continue;
      }

      // Two-character operators
      const twoChar = char + this.peekChar();
      if (twoChar === '==') {
        this.addToken('EQ', '==');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '!=') {
        this.addToken('NE', '!=');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '<=') {
        this.addToken('LE', '<=');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '>=') {
        this.addToken('GE', '>=');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '++') {
        this.addToken('INCREMENT', '++');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '--') {
        this.addToken('DECREMENT', '--');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '+=') {
        this.addToken('PLUS_EQUALS', '+=');
        this.advance();
        this.advance();
        continue;
      }
      if (twoChar === '-=') {
        this.addToken('MINUS_EQUALS', '-=');
        this.advance();
        this.advance();
        continue;
      }

      // Single-character operators
      switch (char) {
        case '(':
          this.addToken('LPAREN', '(');
          break;
        case ')':
          this.addToken('RPAREN', ')');
          break;
        case '{':
          this.addToken('LBRACE', '{');
          break;
        case '}':
          this.addToken('RBRACE', '}');
          break;
        case ';':
          this.addToken('SEMICOLON', ';');
          break;
        case ',':
          this.addToken('COMMA', ',');
          break;
        case '=':
          this.addToken('EQUALS', '=');
          break;
        case '+':
          this.addToken('PLUS', '+');
          break;
        case '-':
          this.addToken('MINUS', '-');
          break;
        case '*':
          this.addToken('MULTIPLY', '*');
          break;
        case '/':
          this.addToken('DIVIDE', '/');
          break;
        case '%':
          this.addToken('MODULO', '%');
          break;
        case '<':
          this.addToken('LT', '<');
          break;
        case '>':
          this.addToken('GT', '>');
          break;
        default:
          throw new Error(
            `Unexpected character '${char}' at line ${this.line}, column ${this.column}`
          );
      }

      this.advance();
    }

    this.addToken('EOF', '');
    return this.tokens;
  }
}
