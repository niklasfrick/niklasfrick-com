'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

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

    // Extract language from className if not provided
    const lang = language || className.replace('language-', '') || 'text'

    // Get file extension for display
    const getFileExtension = (lang: string) => {
        const extensions: Record<string, string> = {
            javascript: '.js',
            typescript: '.ts',
            jsx: '.jsx',
            tsx: '.tsx',
            python: '.py',
            java: '.java',
            cpp: '.cpp',
            c: '.c',
            csharp: '.cs',
            php: '.php',
            ruby: '.rb',
            go: '.go',
            rust: '.rs',
            swift: '.swift',
            kotlin: '.kt',
            scala: '.scala',
            html: '.html',
            css: '.css',
            scss: '.scss',
            sass: '.sass',
            less: '.less',
            json: '.json',
            yaml: '.yml',
            yml: '.yml',
            toml: '.toml',
            markdown: '.md',
            mdx: '.mdx',
            sql: '.sql',
            bash: '.sh',
            shell: '.sh',
            zsh: '.zsh',
            powershell: '.ps1',
            dockerfile: 'Dockerfile',
            gitignore: '.gitignore',
            env: '.env',
        }
        return extensions[lang] || `.${lang}`
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
        <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            {/* Header */}
            {(filename || lang !== 'text') && (
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center space-x-2">
                        {filename && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {filename}
                            </span>
                        )}
                        {lang !== 'text' && (
                            <span className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                {getFileExtension(lang)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center space-x-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                        title="Copy code"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3 w-3" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Code */}
            <div className="relative">
                <SyntaxHighlighter
                    language={lang}
                    style={oneDark}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 8px 8px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                    }}
                    lineNumberStyle={{
                        color: '#6b7280',
                        fontSize: '12px',
                        paddingRight: '16px',
                        minWidth: '2.5em',
                    }}
                >
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
