import * as AST from './ast.js';
import { MALAYALAM_TO_JS } from './lexer.js';

export class Transpiler {
  private indentLevel: number = 0;

  transpile(program: AST.Program): string {
    const statements = program.body
      .map((stmt) => this.transpileStatement(stmt))
      .filter((s) => s !== '');

    return statements.join('\n\n');
  }

  private indent(): string {
    return '  '.repeat(this.indentLevel);
  }

  private transpileStatement(stmt: AST.Statement): string {
    switch (stmt.type) {
      case 'ExpressionStatement':
        return this.transpileExpressionStatement(stmt);
      case 'VariableDeclaration':
        return this.transpileVariableDeclaration(stmt);
      case 'FunctionDeclaration':
        return this.transfileFunctionDeclaration(stmt);
      case 'IfStatement':
        return this.transpileIfStatement(stmt);
      case 'WhileStatement':
        return this.transpileWhileStatement(stmt);
      case 'ForStatement':
        return this.transpileForStatement(stmt);
      case 'ReturnStatement':
        return this.transpileReturnStatement(stmt);
      case 'BlockStatement':
        return this.transpileBlockStatement(stmt);
      default:
        return '';
    }
  }

  private transpileExpressionStatement(stmt: AST.ExpressionStatement): string {
    return this.indent() + this.transpileExpression(stmt.expression) + ';';
  }

  private transpileVariableDeclaration(stmt: AST.VariableDeclaration): string {
    let code = this.indent() + 'let ' + stmt.id;

    if (stmt.init) {
      code += ' = ' + this.transpileExpression(stmt.init);
    }

    code += ';';
    return code;
  }

  private transfileFunctionDeclaration(stmt: AST.FunctionDeclaration): string {
    const params = stmt.params.join(', ');
    const lines = [this.indent() + `function ${stmt.id}(${params}) {`];

    this.indentLevel++;
    const body = this.transpileBlockStatementBody(stmt.body);
    if (body) {
      lines.push(body);
    }
    this.indentLevel--;

    lines.push(this.indent() + '}');
    return lines.join('\n');
  }

  private transpileIfStatement(stmt: AST.IfStatement): string {
    const lines: string[] = [];
    lines.push(
      this.indent() + 'if (' + this.transpileExpression(stmt.test) + ') {'
    );

    this.indentLevel++;
    const consequent = this.transpileBlockStatementBody(stmt.consequent);
    if (consequent) {
      lines.push(consequent);
    }
    this.indentLevel--;

    if (stmt.alternate) {
      lines.push(this.indent() + '} else {');
      this.indentLevel++;
      const alternate = this.transpileBlockStatementBody(stmt.alternate);
      if (alternate) {
        lines.push(alternate);
      }
      this.indentLevel--;
    }

    lines.push(this.indent() + '}');
    return lines.join('\n');
  }

  private transpileWhileStatement(stmt: AST.WhileStatement): string {
    const lines: string[] = [];
    lines.push(
      this.indent() + 'while (' + this.transpileExpression(stmt.test) + ') {'
    );

    this.indentLevel++;
    const body = this.transpileBlockStatementBody(stmt.body);
    if (body) {
      lines.push(body);
    }
    this.indentLevel--;

    lines.push(this.indent() + '}');
    return lines.join('\n');
  }

  private transpileForStatement(stmt: AST.ForStatement): string {
    const lines: string[] = [];

    let initCode = '';
    if (stmt.init) {
      if (stmt.init.type === 'VariableDeclaration') {
        initCode = `let ${stmt.init.id}`;
        if (stmt.init.init) {
          initCode += ' = ' + this.transpileExpression(stmt.init.init);
        }
      } else {
        initCode = this.transpileExpression(stmt.init.expression);
      }
    }

    let testCode = stmt.test ? this.transpileExpression(stmt.test) : '';
    let updateCode = stmt.update ? this.transpileExpression(stmt.update) : '';

    lines.push(
      this.indent() + `for (${initCode}; ${testCode}; ${updateCode}) {`
    );

    this.indentLevel++;
    const body = this.transpileBlockStatementBody(stmt.body);
    if (body) {
      lines.push(body);
    }
    this.indentLevel--;

    lines.push(this.indent() + '}');
    return lines.join('\n');
  }

  private transpileReturnStatement(stmt: AST.ReturnStatement): string {
    let code = this.indent() + 'return';

    if (stmt.argument) {
      code += ' ' + this.transpileExpression(stmt.argument);
    }

    code += ';';
    return code;
  }

  private transpileBlockStatement(stmt: AST.BlockStatement): string {
    return this.transpileBlockStatementBody(stmt);
  }

  private transpileBlockStatementBody(stmt: AST.BlockStatement): string {
    const lines: string[] = [];

    for (const s of stmt.body) {
      const code = this.transpileStatement(s);
      if (code) {
        lines.push(code);
      }
    }

    return lines.join('\n');
  }

  private transpileExpression(expr: AST.Expression): string {
    switch (expr.type) {
      case 'Identifier':
        return this.transpileIdentifier(expr as AST.Identifier);
      case 'Literal':
        return this.transpileLiteral(expr as AST.Literal);
      case 'BinaryExpression':
        return this.transpileBinaryExpression(expr as AST.BinaryExpression);
      case 'UnaryExpression':
        return this.transpileUnaryExpression(expr as AST.UnaryExpression);
      case 'CallExpression':
        return this.transpileCallExpression(expr as AST.CallExpression);
      case 'AssignmentExpression':
        return this.transpileAssignmentExpression(
          expr as AST.AssignmentExpression
        );
      case 'UpdateExpression':
        return this.transpileUpdateExpression(expr as AST.UpdateExpression);
      default:
        return '';
    }
  }

  private transpileIdentifier(expr: AST.Identifier): string {
    // Handle special case for 'കാണിക്കുക' mapped to console.log
    if (expr.name === 'console.log') {
      return 'console.log';
    }

    // Try to convert Malayalam variable names if they are keywords
    const jsKeyword = MALAYALAM_TO_JS[expr.name];
    return jsKeyword || expr.name;
  }

  private transpileLiteral(expr: AST.Literal): string {
    if (typeof expr.value === 'string') {
      return `"${expr.value}"`;
    }
    return String(expr.value);
  }

  private transpileBinaryExpression(expr: AST.BinaryExpression): string {
    const left = this.transpileExpression(expr.left);
    const right = this.transpileExpression(expr.right);

    // Convert Malayalam operators to JavaScript
    let op = expr.operator;
    if (op === 'and') op = '&&';
    if (op === 'or') op = '||';

    return `${left} ${op} ${right}`;
  }

  private transpileUnaryExpression(expr: AST.UnaryExpression): string {
    const arg = this.transpileExpression(expr.argument);

    // Convert Malayalam operators to JavaScript
    let op = expr.operator;
    if (op === 'not') op = '!';

    if (expr.prefix) {
      return `${op}${arg}`;
    } else {
      return `${arg}${op}`;
    }
  }

  private transpileCallExpression(expr: AST.CallExpression): string {
    const callee = this.transpileExpression(expr.callee);
    const args = expr.arguments
      .map((arg) => this.transpileExpression(arg))
      .join(', ');

    return `${callee}(${args})`;
  }

  private transpileAssignmentExpression(
    expr: AST.AssignmentExpression
  ): string {
    const left = expr.left.name;
    const right = this.transpileExpression(expr.right);

    // Convert compound assignments
    if (expr.operator === '+=') {
      return `${left} += ${right}`;
    }
    if (expr.operator === '-=') {
      return `${left} -= ${right}`;
    }

    return `${left} = ${right}`;
  }

  private transpileUpdateExpression(expr: AST.UpdateExpression): string {
    const arg = expr.argument.name;

    if (expr.prefix) {
      return `${expr.operator}${arg}`;
    } else {
      return `${arg}${expr.operator}`;
    }
  }
}
