import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type LogType = 'log' | 'error' | 'warn' | 'info' | 'success' | 'system';

export interface LogEntry {
  id: string;
  type: LogType;
  message: string;
  timestamp: number;
}

export interface CompileError {
  message: string;
  line?: number;
  column?: number;
}

export type Theme = 'dark' | 'light' | 'amoled';

export interface PlaygroundStore {
  // Editor
  code: string;
  setCode: (code: string) => void;

  // Compilation
  compiledJS: string;
  setCompiledJS: (js: string) => void;
  compileErrors: CompileError[];
  setCompileErrors: (errors: CompileError[]) => void;

  // Runtime
  logs: LogEntry[];
  addLog: (type: LogType, message: string) => void;
  clearLogs: () => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;

  // UI
  theme: Theme;
  setTheme: (theme: Theme) => void;
  selectedExample: string;
  setSelectedExample: (example: string) => void;
  activeTab: 'output' | 'js';
  setActiveTab: (tab: 'output' | 'js') => void;
  isCompiling: boolean;
  setIsCompiling: (compiling: boolean) => void;
}

let logCounter = 0;

export const usePlaygroundStore = create<PlaygroundStore>()(
  devtools(
    (set) => ({
      // Editor
      code: '',
      setCode: (code) => set({ code }),

      // Compilation
      compiledJS: '',
      setCompiledJS: (compiledJS) => set({ compiledJS }),
      compileErrors: [],
      setCompileErrors: (compileErrors) => set({ compileErrors }),

      // Runtime
      logs: [],
      addLog: (type, message) =>
        set((state) => ({
          logs: [
            ...state.logs,
            {
              id: `log-${++logCounter}-${Date.now()}`,
              type,
              message,
              timestamp: Date.now(),
            },
          ],
        })),
      clearLogs: () => set({ logs: [] }),
      isRunning: false,
      setIsRunning: (isRunning) => set({ isRunning }),

      // UI
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      selectedExample: 'hello-world',
      setSelectedExample: (selectedExample) => set({ selectedExample }),
      activeTab: 'output',
      setActiveTab: (activeTab) => set({ activeTab }),
      isCompiling: false,
      setIsCompiling: (isCompiling) => set({ isCompiling }),
    }),
    { name: 'playground' }
  )
);
