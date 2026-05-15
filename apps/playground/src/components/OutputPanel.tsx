'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaygroundStore, LogEntry, LogType } from '@/store/usePlaygroundStore';
import { Trash2, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOG_STYLES: Record<LogType, { color: string; prefix: string; icon?: React.ReactNode }> = {
  log: {
    color: 'text-emerald-400',
    prefix: '>',
  },
  error: {
    color: 'text-red-400',
    prefix: '✖',
  },
  warn: {
    color: 'text-amber-400',
    prefix: '⚠',
  },
  info: {
    color: 'text-blue-400',
    prefix: 'ℹ',
  },
  success: {
    color: 'text-green-400',
    prefix: '✔',
  },
  system: {
    color: 'text-muted-foreground',
    prefix: '·',
  },
};

function LogLine({ entry }: { entry: LogEntry }) {
  const style = LOG_STYLES[entry.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'flex items-start gap-2 py-0.5 px-2 rounded font-mono text-sm leading-relaxed',
        entry.type === 'error' && 'bg-red-500/5',
        entry.type === 'warn' && 'bg-amber-500/5',
        entry.type === 'success' && 'bg-green-500/5'
      )}
    >
      <span className={cn('shrink-0 w-4 mt-0.5 text-center text-xs', style.color)}>
        {style.prefix}
      </span>
      <span className={cn('break-all whitespace-pre-wrap', style.color)}>
        {entry.message}
      </span>
    </motion.div>
  );
}

export function OutputPanel() {
  const { logs, clearLogs, isRunning, compileErrors } = usePlaygroundStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const isEmpty = logs.length === 0 && compileErrors.length === 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50 shrink-0">
        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-xs font-medium text-muted-foreground">Output</span>
        {isRunning && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="ml-1 w-3 h-3 border border-indigo-500 border-t-transparent rounded-full"
          />
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">
            {logs.length} line{logs.length !== 1 ? 's' : ''}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearLogs}
            disabled={isEmpty}
            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Clear console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Compile errors */}
      <AnimatePresence>
        {compileErrors.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-red-500/20 bg-red-500/5 overflow-hidden"
          >
            {compileErrors.map((err, i) => (
              <div key={i} className="flex items-start gap-2 px-4 py-2">
                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs font-mono text-red-400 break-all">
                  {err.message}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logs */}
      <div className="flex-1 overflow-y-auto p-2 font-mono text-sm min-h-0">
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
              <Terminal className="w-5 h-5 opacity-40" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">No output yet</p>
              <p className="text-xs opacity-60 mt-1">
                Press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">
                  Run
                </kbd>{' '}
                to execute your code
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-0.5">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <LogLine key={log.id} entry={log} />
              ))}
            </AnimatePresence>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Status bar */}
      {logs.some((l) => l.type === 'success') && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 border-t border-border bg-green-500/5"
        >
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">
            Program executed successfully
          </span>
        </motion.div>
      )}
    </div>
  );
}
