'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

// Light theme with proper contrast and readability
const customTheme = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: '#ffffff',
    color: '#383a42',
    margin: 0,
    borderRadius: '0 0 8px 8px',
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    overflow: 'auto',
    padding: '12px',
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: 'transparent',
    color: '#383a42',
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.5',
  },
}

// Dark mode theme with consistent font rendering
const customDarkTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#111827', // bg-gray-900
    margin: 0,
    borderRadius: '0 0 8px 8px',
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    overflow: 'auto',
    padding: '12px',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.5',
  },
}

interface EnhancedCodeBlockProps {
  children: string
  className?: string
  filename?: string
  language?: string
  showLineNumbers?: boolean
}

export function EnhancedCodeBlock({
  children,
  className = '',
  filename,
  language = 'text',
  showLineNumbers = true,
}: EnhancedCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Extract language from className if not provided
  const lang = language || className.replace('language-', '') || 'text'

  // Get language name for display
  const getLanguageName = (lang: string) => {
    const languageNames: Record<string, string> = {
      javascript: 'JavaScript',
      js: 'JavaScript',
      typescript: 'TypeScript',
      ts: 'TypeScript',
      jsx: 'JSX',
      tsx: 'TSX',
      python: 'Python',
      py: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      csharp: 'C#',
      cs: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      rb: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      rs: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
      kt: 'Kotlin',
      scala: 'Scala',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      sass: 'Sass',
      less: 'Less',
      json: 'JSON',
      yaml: 'YAML',
      yml: 'YAML',
      toml: 'TOML',
      markdown: 'Markdown',
      md: 'Markdown',
      mdx: 'MDX',
      sql: 'SQL',
      bash: 'Bash',
      shell: 'Shell',
      sh: 'Shell',
      zsh: 'Zsh',
      powershell: 'PowerShell',
      ps1: 'PowerShell',
      dockerfile: 'Dockerfile',
      docker: 'Dockerfile',
      gitignore: 'Gitignore',
      env: 'Environment',
      ini: 'INI',
      conf: 'Configuration',
      xml: 'XML',
      svg: 'SVG',
      vue: 'Vue',
      svelte: 'Svelte',
      graphql: 'GraphQL',
      gql: 'GraphQL',
      diff: 'Diff',
      git: 'Git',
    }
    return languageNames[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:my-6 dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      {(filename || lang !== 'text') && (
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2 sm:px-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex min-w-0 flex-1 items-center space-x-2">
            {filename && (
              <span className="truncate text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                {filename}
              </span>
            )}
            {lang !== 'text' && (
              <span className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-gray-600 sm:px-2 sm:py-1 dark:bg-gray-700 dark:text-gray-400">
                {getLanguageName(lang)}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="ml-2 flex flex-shrink-0 touch-manipulation items-center space-x-1 rounded px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={lang}
          style={isDarkMode ? customDarkTheme : customTheme}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 8px 8px',
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '13px',
            lineHeight: '1.5',
            fontFeatureSettings: '"liga" 1, "calt" 1',
            fontVariantLigatures: 'contextual',
            textRendering: 'optimizeLegibility',
            padding: '12px',
          }}
          lineNumberStyle={{
            color: isDarkMode ? '#9ca3af' : '#6b7280',
            fontSize: '11px',
            paddingRight: '12px',
            minWidth: '2.5em',
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
