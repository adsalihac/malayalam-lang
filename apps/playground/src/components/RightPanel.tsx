'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { OutputPanel } from './OutputPanel';
import { JSPreview } from './JSPreview';
import { Terminal, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'output' as const, label: 'Output', icon: Terminal },
  { id: 'js' as const, label: 'JavaScript', icon: Code },
];

export function RightPanel() {
  const { activeTab, setActiveTab } = usePlaygroundStore();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border bg-card/50 shrink-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors',
              activeTab === id
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
            {activeTab === id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'output' ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <OutputPanel />
            </motion.div>
          ) : (
            <motion.div
              key="js"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <JSPreview />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
