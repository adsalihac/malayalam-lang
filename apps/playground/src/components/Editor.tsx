'use client';

import { useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { compileCode } from '@/lib/compiler';
import { debounce } from '@/lib/utils';
import { FileCode2 } from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#0F111A]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full"
      />
    </div>
  ),
});

export function Editor() {
  const { theme, resolvedTheme } = useTheme();
  const { code, setCode, setCompiledJS, setCompileErrors, setIsCompiling } =
    usePlaygroundStore();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorInstanceRef = useRef<any>(null);

  const appTheme = resolvedTheme ?? theme ?? 'dark';

  const getMonacoTheme = useCallback(
    (t: string) => {
      switch (t) {
        case 'light':
          return 'malayalam-light';
        case 'amoled':
          return 'malayalam-amoled';
        default:
          return 'malayalam-dark';
      }
    },
    []
  );

  // Debounced compile
  const debouncedCompile = useCallback(
    debounce(async (src: string) => {
      if (!src.trim()) {
        setCompiledJS('');
        setCompileErrors([]);
        return;
      }
      setIsCompiling(true);
      const result = await compileCode(src);
      setIsCompiling(false);
      if (result.success && result.code) {
        setCompiledJS(result.code);
        setCompileErrors([]);
        // Clear editor markers
        if (monacoInstanceRef.current && editorInstanceRef.current) {
          monacoInstanceRef.current.editor.setModelMarkers(
            editorInstanceRef.current.getModel(),
            'malayalamlang',
            []
          );
        }
      } else {
        setCompiledJS('');
        const errMsg = result.error ?? 'Unknown error';
        setCompileErrors([{ message: errMsg }]);
        // Try to extract line info and set editor marker
        if (monacoInstanceRef.current && editorInstanceRef.current) {
          const lineMatch = errMsg.match(/line (\d+)/i);
          const colMatch = errMsg.match(/column (\d+)/i);
          const line = lineMatch ? parseInt(lineMatch[1], 10) : 1;
          const col = colMatch ? parseInt(colMatch[1], 10) : 1;
          monacoInstanceRef.current.editor.setModelMarkers(
            editorInstanceRef.current.getModel(),
            'malayalamlang',
            [
              {
                severity:
                  monacoInstanceRef.current.MarkerSeverity.Error,
                message: errMsg,
                startLineNumber: line,
                startColumn: col,
                endLineNumber: line,
                endColumn: col + 1,
              },
            ]
          );
        }
      }
    }, 600),
    [setCompiledJS, setCompileErrors, setIsCompiling]
  );

  useEffect(() => {
    debouncedCompile(code);
  }, [code, debouncedCompile]);

  // Update theme when it changes
  useEffect(() => {
    if (monacoInstanceRef.current) {
      monacoInstanceRef.current.editor.setTheme(getMonacoTheme(appTheme));
    }
  }, [appTheme, getMonacoTheme]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMount = (editor: any, monacoInstance: any) => {
    editorInstanceRef.current = editor;
    monacoInstanceRef.current = monacoInstance;

    // Register language and themes lazily
    import('@/lib/monacoLanguage').then(
      ({ registerMalayalamLanguage, defineMalayalamThemes }) => {
        registerMalayalamLanguage(monacoInstance);
        defineMalayalamThemes(monacoInstance);
        monacoInstance.editor.setTheme(getMonacoTheme(appTheme));
      }
    );

    // Focus editor
    editor.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/50 shrink-0">
        <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-xs font-medium text-muted-foreground">
          main.ml
        </span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">
          malayalamlang
        </span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language="malayalamlang"
          value={code}
          theme={getMonacoTheme(appTheme)}
          onChange={(val) => setCode(val ?? '')}
          onMount={handleMount}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineHeight: 1.7,
            minimap: { enabled: true, scale: 0.8 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            autoIndent: 'full',
            bracketPairColorization: { enabled: true },
            renderLineHighlight: 'gutter',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
          }}
        />
      </div>
    </motion.div>
  );
}
