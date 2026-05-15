'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Editor } from '@/components/Editor';
import { RightPanel } from '@/components/RightPanel';
import { Footer } from '@/components/Footer';
import { Toolbar } from '@/components/Toolbar';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { EXAMPLES, DEFAULT_EXAMPLE_ID } from '@/lib/examples';
import { useTheme } from 'next-themes';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function PlaygroundPage() {
  const { setCode, setSelectedExample } = usePlaygroundStore();
  const { resolvedTheme } = useTheme();
  useKeyboardShortcuts();

  // Load default example on mount
  useEffect(() => {
    const defaultEx = EXAMPLES.find((e) => e.id === DEFAULT_EXAMPLE_ID);
    if (defaultEx) {
      setCode(defaultEx.code);
      setSelectedExample(DEFAULT_EXAMPLE_ID);
    }
  }, [setCode, setSelectedExample]);

  // Sync theme class on body for amoled
  useEffect(() => {
    if (resolvedTheme === 'amoled') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('amoled');
    } else {
      document.documentElement.classList.remove('amoled');
    }
  }, [resolvedTheme]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <Header />

      {/* Toolbar */}
      <Toolbar />

      {/* Main workspace */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 min-h-0 flex flex-col lg:flex-row gap-0 overflow-hidden"
      >
        {/* Editor panel */}
        <div className="flex-1 min-h-0 lg:min-h-full border-r border-border overflow-hidden">
          <Editor />
        </div>

        {/* Divider for mobile */}
        <div className="h-px lg:hidden bg-border" />

        {/* Output panel */}
        <div className="flex-1 min-h-0 lg:min-h-full overflow-hidden lg:max-w-[45%]">
          <RightPanel />
        </div>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
