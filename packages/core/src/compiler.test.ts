import { describe, it, expect } from 'vitest';
import { Compiler } from './index.js';

describe('Compiler', () => {
  it('should compile a simple print statement', () => {
    const source = 'കാണിക്കുക("ഹലോ")';
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('console.log');
    expect(result.code).toContain('ഹലോ');
  });

  it('should compile variable assignment', () => {
    const source = 'x = 42';
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('let x = 42');
  });

  it('should compile if statement', () => {
    const source = `എങ്കിൽ (x > 5) {
      കാണിക്കുക("വലിയത്")
    }`;
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('if');
    expect(result.code).toContain('console.log');
  });

  it('should compile for loop', () => {
    const source = `എതിരായ (i = 0; i < 5; i = i + 1) {
      കാണിക്കുക(i)
    }`;
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('for');
  });

  it('should compile function declaration', () => {
    const source = `ഫങ്ക്ഷൻ ചതുരം(x) {
      മടങ്ങി x * x
    }
    കാണിക്കുക(ചതുരം(5))`;
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('function');
    expect(result.code).toContain('return');
  });

  it('should compile Manglish code', () => {
    const source = 'kanikkuka("namaskaram")';
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('console.log');
  });

  it('should handle syntax errors', () => {
    const source = 'എങ്കിൽ ('; // Incomplete if statement
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should compile complex program', () => {
    const source = `
      ഫങ്ക്ഷൻ factorial(n) {
        എങ്കിൽ (n <= 1) {
          മടങ്ങി 1
        }
        മടങ്ങി n * factorial(n - 1)
      }
      കാണിക്കുക(factorial(5))
    `;
    const compiler = new Compiler();
    const result = compiler.compile(source);

    expect(result.success).toBe(true);
    expect(result.code).toContain('function factorial');
    expect(result.code).toContain('if');
    expect(result.code).toContain('return');
  });
});
