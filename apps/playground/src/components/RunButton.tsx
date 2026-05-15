'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2 } from 'lucide-react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { compileCode, runCompiledCode } from '@/lib/compiler';
import { cn } from '@/lib/utils';

export function RunButton() {
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

  const handleRun = async () => {
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
        setIsRunning(false);
        return;
      }

      setCompiledJS(result.code);
      setCompileErrors([]);
      addLog('system', '⟫ Running program…');

      const { logs, error } = runCompiledCode(result.code);

      for (const entry of logs) {
        addLog(entry.type, entry.message);
      }

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
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning || !code.trim()}
      whileHover={!isRunning ? { scale: 1.03, y: -1 } : {}}
      whileTap={!isRunning ? { scale: 0.97 } : {}}
      className={cn(
        'relative flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm',
        'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg',
        'hover:shadow-indigo-500/30 hover:shadow-xl',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        'transition-shadow duration-200',
        !isRunning && 'animate-pulse-glow'
      )}
    >
      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0"
        whileHover={{ opacity: 0.15 }}
        transition={{ duration: 0.2 }}
      />

      <AnimatePresence mode="wait">
        {isRunning ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Running…</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
