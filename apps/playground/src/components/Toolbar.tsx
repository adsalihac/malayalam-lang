'use client';

import { motion } from 'framer-motion';
import { RunButton } from './RunButton';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { CheckCircle2, AlertCircle, Loader } from 'lucide-react';

export function Toolbar() {
  const { isCompiling, compileErrors, compiledJS } = usePlaygroundStore();

  const hasErrors = compileErrors.length > 0;
  const isReady = !isCompiling && !hasErrors && compiledJS.length > 0;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/80 shrink-0">
      {/* Compiler status */}
      <div className="flex items-center gap-2">
        {isCompiling ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Loader className="w-3 h-3 animate-spin text-indigo-400" />
            <span>Compiling…</span>
          </motion.div>
        ) : hasErrors ? (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <AlertCircle className="w-3 h-3" />
            <span>{compileErrors.length} error{compileErrors.length !== 1 ? 's' : ''}</span>
          </motion.div>
        ) : isReady ? (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-xs text-green-400"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Ready</span>
          </motion.div>
        ) : (
          <span className="text-xs text-muted-foreground">
            Write some Malayalam code
          </span>
        )}
      </div>

      {/* Keyboard hint + Run button */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground/60">
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">↵</kbd>
          to run
        </span>
        <RunButton />
      </div>
    </div>
  );
}
