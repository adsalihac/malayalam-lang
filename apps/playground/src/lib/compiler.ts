import { LogType } from '@/store/usePlaygroundStore';

export interface CompileResult {
  success: boolean;
  code?: string;
  error?: string;
}

export interface RunResult {
  logs: Array<{ type: LogType; message: string }>;
  error?: string;
}

let compilerModule: { Compiler: new () => { compile: (src: string) => CompileResult } } | null = null;

async function getCompiler() {
  if (!compilerModule) {
    compilerModule = await import('@malayalamlang/core');
  }
  return new compilerModule.Compiler();
}

export async function compileCode(source: string): Promise<CompileResult> {
  try {
    const compiler = await getCompiler();
    return compiler.compile(source);
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function runCompiledCode(jsCode: string): RunResult {
  const logs: Array<{ type: LogType; message: string }> = [];

  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };

  const formatArgs = (...args: unknown[]): string =>
    args
      .map((a) =>
        typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
      )
      .join(' ');

  console.log = (...args: unknown[]) => {
    logs.push({ type: 'log', message: formatArgs(...args) });
    originalConsole.log(...args);
  };
  console.error = (...args: unknown[]) => {
    logs.push({ type: 'error', message: formatArgs(...args) });
    originalConsole.error(...args);
  };
  console.warn = (...args: unknown[]) => {
    logs.push({ type: 'warn', message: formatArgs(...args) });
    originalConsole.warn(...args);
  };
  console.info = (...args: unknown[]) => {
    logs.push({ type: 'info', message: formatArgs(...args) });
    originalConsole.info(...args);
  };

  let runtimeError: string | undefined;

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(jsCode);
    fn();
  } catch (err) {
    runtimeError = err instanceof Error ? err.message : String(err);
  } finally {
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
  }

  return { logs, error: runtimeError };
}
