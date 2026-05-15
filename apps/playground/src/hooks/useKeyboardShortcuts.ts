'use client';

import { useEffect } from 'react';
import { compileCode, runCompiledCode } from '@/lib/compiler';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export function useKeyboardShortcuts() {
  const {
    code,
    isRunning,
    setIsRunning,
    addLog,
    clearLogs,
    setCompiledJS,
    setCompileErrors,
    setActiveTab,
  } = usePlaygroundStore();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Cmd+Enter or Ctrl+Enter to run
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (isRunning || !code.trim()) return;

        setIsRunning(true);
        clearLogs();
        setActiveTab('output');
        addLog('system', '⟫ Compiling Malayalam code…');

        try {
          const result = await compileCode(code);
          if (!result.success || !result.code) {
            const errMsg = result.error ?? 'Compilation failed';
            setCompileErrors([{ message: errMsg }]);
            addLog('error', `Compile error: ${errMsg}`);
            return;
          }
          setCompiledJS(result.code);
          setCompileErrors([]);
          addLog('system', '⟫ Running program…');
          const { logs, error } = runCompiledCode(result.code);
          for (const entry of logs) addLog(entry.type, entry.message);
          if (error) {
            addLog('error', `Runtime error: ${error}`);
          } else {
            addLog('success', 'Program executed successfully ✓');
          }
        } catch (err) {
          addLog('error', `Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setIsRunning(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, isRunning, setIsRunning, addLog, clearLogs, setCompiledJS, setCompileErrors, setActiveTab]);
}
