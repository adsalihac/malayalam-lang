import { Lexer } from './lexer.js';
import { Parser } from './parser.js';
import { Transpiler } from './transpiler.js';
import * as AST from './ast.js';

export { Lexer } from './lexer.js';
export { Parser } from './parser.js';
export { Transpiler } from './transpiler.js';
export * as AST from './ast.js';

export interface CompileResult {
  success: boolean;
  code?: string;
  ast?: AST.Program;
  error?: string;
}

export class Compiler {
  compile(source: string): CompileResult {
    try {
      // Lexical analysis
      const lexer = new Lexer(source);
      const tokens = lexer.tokenize();

      // Parsing
      const parser = new Parser(tokens);
      const ast = parser.parse();

      // Transpilation
      const transpiler = new Transpiler();
      const code = transpiler.transpile(ast);

      return {
        success: true,
        code,
        ast,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export default Compiler;
