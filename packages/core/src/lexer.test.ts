import { describe, it, expect } from 'vitest';
import { Lexer } from '../lexer.js';

describe('Lexer', () => {
  it('should tokenize basic print statement in Malayalam', () => {
    const source = 'കാണിക്കുക("Hello")';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('PRINT');
    expect(tokens[1].type).toBe('LPAREN');
    expect(tokens[2].type).toBe('STRING');
    expect(tokens[2].value).toBe('Hello');
    expect(tokens[3].type).toBe('RPAREN');
    expect(tokens[4].type).toBe('EOF');
  });

  it('should tokenize print statement in Manglish', () => {
    const source = 'kanikkuka("Hello")';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('PRINT');
    expect(tokens[1].type).toBe('LPAREN');
    expect(tokens[2].type).toBe('STRING');
  });

  it('should tokenize numbers', () => {
    const source = '42';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('NUMBER');
    expect(tokens[0].value).toBe('42');
  });

  it('should tokenize identifiers', () => {
    const source = 'എണ്ണം = 10';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('IDENTIFIER');
    expect(tokens[0].value).toBe('എണ്ണം');
    expect(tokens[1].type).toBe('EQUALS');
    expect(tokens[2].type).toBe('NUMBER');
  });

  it('should skip comments', () => {
    const source = '// This is a comment\nകാണിക്കുക("test")';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('PRINT');
    expect(tokens.length).toBe(5); // PRINT, LPAREN, STRING, RPAREN, EOF
  });

  it('should tokenize if statement', () => {
    const source = 'എങ്കിൽ (x > 5) { }';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('IF');
    expect(tokens[1].type).toBe('LPAREN');
    expect(tokens[2].type).toBe('IDENTIFIER');
    expect(tokens[3].type).toBe('GT');
    expect(tokens[4].type).toBe('NUMBER');
  });

  it('should tokenize function declaration', () => {
    const source = 'ഫങ്ക്ഷൻ add(a, b) { }';
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();

    expect(tokens[0].type).toBe('FUNCTION');
    expect(tokens[1].type).toBe('IDENTIFIER');
    expect(tokens[1].value).toBe('add');
  });
});
