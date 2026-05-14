import { Token, TokenType, MALAYALAM_TO_JS } from './lexer.js';
import * as AST from './ast.js';

export class Parser {
  private tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private currentToken(): Token {
    if (this.current >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.tokens[this.current];
  }

  private peekToken(offset: number = 1): Token {
    const index = this.current + offset;
    if (index >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.tokens[index];
  }

  private advance(): Token {
    const token = this.currentToken();
    if (token.type !== 'EOF') {
      this.current++;
    }
    return token;
  }

  private expect(type: TokenType): Token {
    const token = this.currentToken();
    if (token.type !== type) {
      throw new Error(
        `Expected ${type} but got ${token.type} at line ${token.line}, column ${token.column}`
      );
    }
    return this.advance();
  }

  private match(...types: TokenType[]): boolean {
    return types.includes(this.currentToken().type);
  }

  private consume(type: TokenType): boolean {
    if (this.match(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  parse(): AST.Program {
    const body: AST.Statement[] = [];

    while (!this.match('EOF')) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }

    return {
      type: 'Program',
      body,
    };
  }

  private parseStatement(): AST.Statement | null {
    // Skip semicolons
    while (this.consume('SEMICOLON')) {
      // Continue
    }

    if (this.match('FUNCTION')) {
      return this.parseFunctionDeclaration();
    }

    if (this.match('IF')) {
      return this.parseIfStatement();
    }

    if (this.match('WHILE')) {
      return this.parseWhileStatement();
    }

    if (this.match('FOR')) {
      return this.parseForStatement();
    }

    if (this.match('RETURN')) {
      return this.parseReturnStatement();
    }

    if (this.match('LBRACE')) {
      return this.parseBlockStatement();
    }

    // Variable declaration (assignment)
    if (this.match('IDENTIFIER')) {
      // Look ahead for variable declaration (no assignment)
      if (
        this.peekToken().type === 'EQUALS' ||
        this.peekToken().type === 'SEMICOLON' ||
        this.peekToken().type === 'RBRACE' ||
        this.peekToken().type === 'EOF'
      ) {
        const id = this.advance().value;
        let init: AST.Expression | null = null;

        if (this.consume('EQUALS')) {
          init = this.parseExpression();
        }

        this.consume('SEMICOLON');

        return {
          type: 'VariableDeclaration',
          id,
          init,
        } as AST.VariableDeclaration;
      }
    }

    // Expression statement
    const expr = this.parseExpression();
    this.consume('SEMICOLON');

    return {
      type: 'ExpressionStatement',
      expression: expr,
    } as AST.ExpressionStatement;
  }

  private parseFunctionDeclaration(): AST.FunctionDeclaration {
    this.expect('FUNCTION');
    const id = this.expect('IDENTIFIER').value;

    this.expect('LPAREN');
    const params: string[] = [];

    while (!this.match('RPAREN')) {
      params.push(this.expect('IDENTIFIER').value);
      if (!this.match('RPAREN')) {
        this.expect('COMMA');
      }
    }

    this.expect('RPAREN');

    const body = this.parseBlockStatement();

    return {
      type: 'FunctionDeclaration',
      id,
      params,
      body,
    };
  }

  private parseIfStatement(): AST.IfStatement {
    this.expect('IF');
    this.expect('LPAREN');
    const test = this.parseExpression();
    this.expect('RPAREN');

    const consequent = this.parseBlockStatement();

    let alternate: AST.BlockStatement | null = null;
    if (this.consume('ELSE')) {
      if (this.match('IF')) {
        // else if - wrap in block
        const ifStmt = this.parseIfStatement();
        alternate = {
          type: 'BlockStatement',
          body: [ifStmt],
        };
      } else {
        alternate = this.parseBlockStatement();
      }
    }

    return {
      type: 'IfStatement',
      test,
      consequent,
      alternate,
    };
  }

  private parseWhileStatement(): AST.WhileStatement {
    this.expect('WHILE');
    this.expect('LPAREN');
    const test = this.parseExpression();
    this.expect('RPAREN');

    const body = this.parseBlockStatement();

    return {
      type: 'WhileStatement',
      test,
      body,
    };
  }

  private parseForStatement(): AST.ForStatement {
    this.expect('FOR');
    this.expect('LPAREN');

    // Parse init
    let init: AST.VariableDeclaration | AST.ExpressionStatement | null = null;

    if (!this.match('SEMICOLON')) {
      if (this.match('IDENTIFIER') && this.peekToken().type === 'EQUALS') {
        const id = this.advance().value;
        this.expect('EQUALS');
        const initExpr = this.parseExpression();
        init = {
          type: 'VariableDeclaration',
          id,
          init: initExpr,
        } as AST.VariableDeclaration;
      } else {
        init = {
          type: 'ExpressionStatement',
          expression: this.parseExpression(),
        } as AST.ExpressionStatement;
      }
    }

    this.expect('SEMICOLON');

    // Parse test
    let test: AST.Expression | null = null;
    if (!this.match('SEMICOLON')) {
      test = this.parseExpression();
    }

    this.expect('SEMICOLON');

    // Parse update
    let update: AST.Expression | null = null;
    if (!this.match('RPAREN')) {
      update = this.parseExpression();
    }

    this.expect('RPAREN');

    const body = this.parseBlockStatement();

    return {
      type: 'ForStatement',
      init,
      test,
      update,
      body,
    };
  }

  private parseReturnStatement(): AST.ReturnStatement {
    this.expect('RETURN');

    let argument: AST.Expression | null = null;

    if (!this.match('SEMICOLON') && !this.match('RBRACE')) {
      argument = this.parseExpression();
    }

    this.consume('SEMICOLON');

    return {
      type: 'ReturnStatement',
      argument,
    };
  }

  private parseBlockStatement(): AST.BlockStatement {
    this.expect('LBRACE');

    const body: AST.Statement[] = [];

    while (!this.match('RBRACE') && !this.match('EOF')) {
      const stmt = this.parseStatement();
      if (stmt) {
        body.push(stmt);
      }
    }

    this.expect('RBRACE');

    return {
      type: 'BlockStatement',
      body,
    };
  }

  private parseExpression(): AST.Expression {
    return this.parseAssignment();
  }

  private parseAssignment(): AST.Expression {
    const expr = this.parseLogicalOr();

    if (this.match('EQUALS', 'PLUS_EQUALS', 'MINUS_EQUALS')) {
      const operator = this.advance().value;
      const right = this.parseAssignment();

      if (expr.type !== 'Identifier') {
        throw new Error('Invalid assignment target');
      }

      return {
        type: 'AssignmentExpression',
        operator,
        left: expr as AST.Identifier,
        right,
      };
    }

    return expr;
  }

  private parseLogicalOr(): AST.Expression {
    let expr = this.parseLogicalAnd();

    while (this.match('OR')) {
      const operator = this.advance().value;
      const right = this.parseLogicalAnd();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseLogicalAnd(): AST.Expression {
    let expr = this.parseEquality();

    while (this.match('AND')) {
      const operator = this.advance().value;
      const right = this.parseEquality();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseEquality(): AST.Expression {
    let expr = this.parseComparison();

    while (this.match('EQ', 'NE')) {
      const operator = this.advance().value;
      const right = this.parseComparison();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseComparison(): AST.Expression {
    let expr = this.parseAddition();

    while (this.match('LT', 'GT', 'LE', 'GE')) {
      const operator = this.advance().value;
      const right = this.parseAddition();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseAddition(): AST.Expression {
    let expr = this.parseMultiplication();

    while (this.match('PLUS', 'MINUS')) {
      const operator = this.advance().value;
      const right = this.parseMultiplication();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseMultiplication(): AST.Expression {
    let expr = this.parseUnary();

    while (this.match('MULTIPLY', 'DIVIDE', 'MODULO')) {
      const operator = this.advance().value;
      const right = this.parseUnary();

      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  private parseUnary(): AST.Expression {
    if (this.match('NOT', 'MINUS')) {
      const operator = this.advance().value;
      const argument = this.parseUnary();

      return {
        type: 'UnaryExpression',
        operator,
        argument,
        prefix: true,
      };
    }

    if (this.match('INCREMENT', 'DECREMENT')) {
      const operator = this.advance().value;
      const argument = this.expect('IDENTIFIER');

      return {
        type: 'UpdateExpression',
        operator,
        argument: {
          type: 'Identifier',
          name: argument.value,
        },
        prefix: true,
      };
    }

    return this.parsePostfix();
  }

  private parsePostfix(): AST.Expression {
    let expr = this.parsePrimary();

    while (true) {
      if (this.match('LPAREN')) {
        this.advance();
        const args: AST.Expression[] = [];

        while (!this.match('RPAREN')) {
          args.push(this.parseExpression());
          if (!this.match('RPAREN')) {
            this.expect('COMMA');
          }
        }

        this.expect('RPAREN');

        expr = {
          type: 'CallExpression',
          callee: expr,
          arguments: args,
        };
      } else if (this.match('INCREMENT', 'DECREMENT')) {
        const operator = this.advance().value;

        if (expr.type !== 'Identifier') {
          throw new Error('Invalid update expression target');
        }

        expr = {
          type: 'UpdateExpression',
          operator,
          argument: expr as AST.Identifier,
          prefix: false,
        };
      } else {
        break;
      }
    }

    return expr;
  }

  private parsePrimary(): AST.Expression {
    if (this.match('TRUE')) {
      this.advance();
      return {
        type: 'Literal',
        value: true,
        raw: 'true',
      };
    }

    if (this.match('FALSE')) {
      this.advance();
      return {
        type: 'Literal',
        value: false,
        raw: 'false',
      };
    }

    if (this.match('NULL')) {
      this.advance();
      return {
        type: 'Literal',
        value: null,
        raw: 'null',
      };
    }

    if (this.match('NUMBER')) {
      const token = this.advance();
      const value = parseFloat(token.value);
      return {
        type: 'Literal',
        value,
        raw: token.value,
      };
    }

    if (this.match('STRING')) {
      const token = this.advance();
      return {
        type: 'Literal',
        value: token.value,
        raw: `"${token.value}"`,
      };
    }

    if (this.match('IDENTIFIER')) {
      const token = this.advance();
      return {
        type: 'Identifier',
        name: token.value,
      };
    }

    if (this.match('PRINT')) {
      const token = this.advance();
      return {
        type: 'Identifier',
        name: 'console.log',
      };
    }

    if (this.match('LPAREN')) {
      this.advance();
      const expr = this.parseExpression();
      this.expect('RPAREN');
      return expr;
    }

    throw new Error(
      `Unexpected token ${this.currentToken().type} at line ${this.currentToken().line}`
    );
  }
}
