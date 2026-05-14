#!/usr/bin/env node

import { Command } from 'commander';
import readline from 'readline-sync';
import chalk from 'chalk';
import MalayalamCLI from './index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cli = new MalayalamCLI();
const program = new Command();

// Read package.json for version
function getVersion(): string {
  try {
    const packagePath = path.join(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    return pkg.version;
  } catch {
    return '0.1.0';
  }
}

program
  .name('malayalam')
  .description('🇮🇳 Malayalam Programming Language')
  .version(getVersion());

program
  .command('run <file>')
  .description('Run a Malayalam script')
  .action((file) => {
    console.log(chalk.cyan(`\n📝 Running: ${file}\n`));
    const success = cli.run(file);
    if (!success) {
      process.exit(1);
    }
  });

program
  .command('compile <file> [output]')
  .description('Compile Malayalam to JavaScript')
  .action((file, output) => {
    console.log(chalk.cyan(`\n📦 Compiling: ${file}\n`));
    const success = cli.compile(file, output);
    if (!success) {
      process.exit(1);
    }
  });

program
  .command('repl')
  .description('Start interactive REPL')
  .action(() => {
    startREPL();
  });

program
  .command('version')
  .description('Show version')
  .action(() => {
    console.log(chalk.green(`MalayalamLang v${getVersion()}`));
  });

function startREPL(): void {
  console.log(chalk.cyan('\n🇮🇳 MalayalamLang REPL'));
  console.log(chalk.gray(`Version: ${getVersion()}`));
  console.log(chalk.gray('Type "exit" to quit\n'));

  const compiler = new MalayalamCLI();

  while (true) {
    const input = readline.question(chalk.green('>>> '));

    if (input.toLowerCase() === 'exit') {
      console.log(chalk.cyan('\nGoodbye! 👋'));
      break;
    }

    if (!input.trim()) {
      continue;
    }

    try {
      const result = compiler['compiler'].compile(input);

      if (!result.success) {
        console.log(chalk.red(`❌ ${result.error}`));
        continue;
      }

      // Execute the code
      try {
        // eslint-disable-next-line no-eval
        eval(result.code || '');
        console.log();
      } catch (error) {
        console.log(chalk.red(`❌ Runtime Error: ${error instanceof Error ? error.message : String(error)}`));
        console.log();
      }
    } catch (error) {
      console.log(chalk.red(`❌ Error: ${error instanceof Error ? error.message : String(error)}`));
      console.log();
    }
  }
}

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
