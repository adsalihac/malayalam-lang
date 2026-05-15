'use client';

import { motion } from 'framer-motion';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { Code, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function JSPreview() {
  const { compiledJS, compileErrors, isCompiling } = usePlaygroundStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!compiledJS) return;
    await navigator.clipboard.writeText(compiledJS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasContent = compiledJS.trim().length > 0;
  const hasErrors = compileErrors.length > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50 shrink-0">
        <Code className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs font-medium text-muted-foreground">
          Generated JavaScript
        </span>
        {isCompiling && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="ml-1 w-3 h-3 border border-amber-500 border-t-transparent rounded-full"
          />
        )}
        <div className="ml-auto flex items-center gap-2">
          {hasContent && (
            <span className="text-[10px] text-muted-foreground font-mono">
              {compiledJS.split('\n').length} lines
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            disabled={!hasContent}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors',
              'hover:bg-accent text-muted-foreground hover:text-foreground',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* JS Code */}
      <div className="flex-1 overflow-auto min-h-0">
        {hasErrors ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground"
          >
            <span className="text-2xl">⚠️</span>
            <p className="text-xs text-red-400">Fix compile errors to see JavaScript</p>
          </motion.div>
        ) : !hasContent ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
              <Code className="w-5 h-5 opacity-40" />
            </div>
            <p className="text-xs text-center">
              Start typing to see generated JavaScript
            </p>
          </motion.div>
        ) : (
          <motion.pre
            key={compiledJS}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-4 text-sm font-mono leading-relaxed text-amber-300/90 overflow-auto h-full whitespace-pre-wrap"
          >
            <code>{compiledJS}</code>
          </motion.pre>
        )}
      </div>
    </div>
  );
}
