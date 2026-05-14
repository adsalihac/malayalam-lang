import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Compiler } from '@malayalamland/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class MalayalamCLI {
  private compiler: Compiler;

  constructor() {
    this.compiler = new Compiler();
  }

  compile(filePath: string, outputPath?: string): boolean {
    try {
      const source = fs.readFileSync(filePath, 'utf-8');
      const result = this.compiler.compile(source);

      if (!result.success) {
        console.error(`❌ Compilation Error: ${result.error}`);
        return false;
      }

      if (outputPath) {
        fs.writeFileSync(outputPath, result.code || '', 'utf-8');
        console.log(`✅ Compiled to: ${outputPath}`);
      } else {
        console.log(result.code);
      }

      return true;
    } catch (error) {
      console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  run(filePath: string): boolean {
    try {
      const source = fs.readFileSync(filePath, 'utf-8');
      const result = this.compiler.compile(source);

      if (!result.success) {
        console.error(`❌ Runtime Error: ${result.error}`);
        return false;
      }

      // Create a function from the compiled code and execute it
      const asyncCode = `
        (async () => {
          try {
            ${result.code}
          } catch (error) {
            console.error('Runtime error:', error.message);
            process.exit(1);
          }
        })();
      `;

      // Use eval to execute the code
      // eslint-disable-next-line no-eval
      eval(asyncCode);
      return true;
    } catch (error) {
      console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }

  getVersion(): string {
    try {
      const packageJsonPath = path.join(__dirname, '../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      return packageJson.version || '0.1.0';
    } catch {
      return '0.1.0';
    }
  }
}

export default MalayalamCLI;
