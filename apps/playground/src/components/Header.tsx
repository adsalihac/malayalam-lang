'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Github,
  BookOpen,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Code2,
} from 'lucide-react';
import { EXAMPLES } from '@/lib/examples';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const THEME_OPTIONS = [
  { value: 'dark', label: 'VSCode Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'amoled', label: 'AMOLED Dark', icon: Zap },
] as const;

export function Header() {
  const { theme, setTheme } = useTheme();
  const { setCode, setSelectedExample, selectedExample } = usePlaygroundStore();
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const loadExample = (id: string) => {
    const example = EXAMPLES.find((e) => e.id === id);
    if (example) {
      setCode(example.code);
      setSelectedExample(id);
    }
    setExamplesOpen(false);
  };

  const currentExample = EXAMPLES.find((e) => e.id === selectedExample);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-gradient">
              MalayalamLang
            </span>
            <span className="text-[10px] text-muted-foreground hidden sm:block">
              Playground
            </span>
          </div>
        </motion.div>

        {/* Malayalam badge */}
        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          മലയാളം
        </span>
      </div>

      {/* Center – Examples dropdown */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setExamplesOpen((o) => !o);
            setThemeOpen(false);
          }}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
            'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
          )}
        >
          <span>{currentExample?.icon}</span>
          <span className="hidden sm:inline">{currentExample?.label ?? 'Examples'}</span>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 transition-transform text-muted-foreground',
              examplesOpen && 'rotate-180'
            )}
          />
        </motion.button>

        {examplesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full mt-2 left-0 w-64 bg-card border border-border rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <div className="p-2 space-y-0.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => loadExample(ex.id)}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors hover:bg-accent',
                    selectedExample === ex.id && 'bg-primary/10 text-primary'
                  )}
                >
                  <span className="text-base mt-0.5">{ex.icon}</span>
                  <div>
                    <div className="text-sm font-medium">{ex.label}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {ex.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setThemeOpen((o) => !o);
              setExamplesOpen(false);
            }}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title="Change theme"
          >
            {theme === 'light' ? (
              <Sun className="w-4 h-4" />
            ) : theme === 'amoled' ? (
              <Zap className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.button>

          {themeOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-full mt-2 right-0 w-44 bg-card border border-border rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
            >
              <div className="p-2 space-y-0.5">
                {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTheme(value);
                      setThemeOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-accent',
                      theme === value && 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Docs */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/adsalihac/malayalam-lang"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Documentation"
        >
          <BookOpen className="w-4 h-4" />
        </motion.a>

        {/* GitHub */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/adsalihac/malayalam-lang"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GitHub</span>
        </motion.a>
      </div>

      {/* Close dropdowns on outside click */}
      {(examplesOpen || themeOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setExamplesOpen(false);
            setThemeOpen(false);
          }}
        />
      )}
    </motion.header>
  );
}
