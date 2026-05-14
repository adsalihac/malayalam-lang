export interface ASTNode {
  type: string;
}

export interface Program extends ASTNode {
  type: 'Program';
  body: Statement[];
}

export type Statement =
  | ExpressionStatement
  | VariableDeclaration
  | FunctionDeclaration
  | IfStatement
  | WhileStatement
  | ForStatement
  | ReturnStatement
  | BlockStatement;

export interface ExpressionStatement extends ASTNode {
  type: 'ExpressionStatement';
  expression: Expression;
}

export interface VariableDeclaration extends ASTNode {
  type: 'VariableDeclaration';
  id: string;
  init: Expression | null;
}

export interface FunctionDeclaration extends ASTNode {
  type: 'FunctionDeclaration';
  id: string;
  params: string[];
  body: BlockStatement;
}

export interface IfStatement extends ASTNode {
  type: 'IfStatement';
  test: Expression;
  consequent: BlockStatement;
  alternate: BlockStatement | null;
}

export interface WhileStatement extends ASTNode {
  type: 'WhileStatement';
  test: Expression;
  body: BlockStatement;
}

export interface ForStatement extends ASTNode {
  type: 'ForStatement';
  init: VariableDeclaration | ExpressionStatement | null;
  test: Expression | null;
  update: Expression | null;
  body: BlockStatement;
}

export interface ReturnStatement extends ASTNode {
  type: 'ReturnStatement';
  argument: Expression | null;
}

export interface BlockStatement extends ASTNode {
  type: 'BlockStatement';
  body: Statement[];
}

export type Expression =
  | Identifier
  | Literal
  | BinaryExpression
  | UnaryExpression
  | CallExpression
  | AssignmentExpression
  | UpdateExpression;

export interface Identifier extends ASTNode {
  type: 'Identifier';
  name: string;
}

export interface Literal extends ASTNode {
  type: 'Literal';
  value: string | number | boolean | null;
  raw: string;
}

export interface BinaryExpression extends ASTNode {
  type: 'BinaryExpression';
  operator: string;
  left: Expression;
  right: Expression;
}

export interface UnaryExpression extends ASTNode {
  type: 'UnaryExpression';
  operator: string;
  argument: Expression;
  prefix: boolean;
}

export interface CallExpression extends ASTNode {
  type: 'CallExpression';
  callee: Expression;
  arguments: Expression[];
}

export interface AssignmentExpression extends ASTNode {
  type: 'AssignmentExpression';
  operator: string;
  left: Identifier;
  right: Expression;
}

export interface UpdateExpression extends ASTNode {
  type: 'UpdateExpression';
  operator: string;
  argument: Identifier;
  prefix: boolean;
}
