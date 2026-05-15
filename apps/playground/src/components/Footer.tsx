'use client';

import { Github, Star, GitFork, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-3 border-t border-border bg-card/50 text-xs text-muted-foreground"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          Open Source
          <span className="text-muted-foreground/40 mx-1">•</span>
          Built with TypeScript
          <span className="text-muted-foreground/40 mx-1">•</span>
          Community Driven
        </span>
      </div>

      <div className="flex items-center gap-3">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/adsalihac/malayalam-lang"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Star className="w-3 h-3" />
          Star on GitHub
        </motion.a>
        <span className="text-muted-foreground/40">•</span>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/adsalihac/malayalam-lang/fork"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <GitFork className="w-3 h-3" />
          Fork
        </motion.a>
        <span className="text-muted-foreground/40">•</span>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://github.com/adsalihac/malayalam-lang/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Heart className="w-3 h-3" />
          Contribute
        </motion.a>
        <span className="text-muted-foreground/40">•</span>
        <a
          href="https://github.com/adsalihac/malayalam-lang"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Github className="w-3 h-3" />
          adsalihac/malayalam-lang
        </a>
      </div>
    </motion.footer>
  );
}
