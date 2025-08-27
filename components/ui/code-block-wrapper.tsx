'use client'

import { EnhancedCodeBlock } from './enhanced-code-block'
import { ComponentPropsWithoutRef } from 'react'

interface CodeBlockWrapperProps extends ComponentPropsWithoutRef<'pre'> {
    children: React.ReactNode
}

export function CodeBlockWrapper({ children, ...props }: CodeBlockWrapperProps) {
    // Check if this is a code block
    if (children && typeof children === 'object' && 'type' in children && children.type === 'code') {
        const codeElement = children as any
        const className = codeElement.props?.className || ''

        // Parse language and filename from className
        // Format: language:file/path/filename.js
        const langMatch = className.match(/language-([^:]+)(?::(.+))?/)
        const language = langMatch ? langMatch[1] : 'text'
        const filename = langMatch ? langMatch[2] : undefined

        let codeContent = codeElement.props?.children || ''

        // If no filename in className, check for filename in comment format like // filename.js or # filename.py
        if (!filename) {
            const filenameMatch = codeContent.match(/^(?:\/\/|#)\s*([^\s]+\.\w+)/)
            if (filenameMatch) {
                const commentFilename = filenameMatch[1]
                // Remove the filename comment from the code content
                codeContent = codeContent.replace(/^(?:\/\/|#)\s*[^\s]+\.\w+\s*\n?/, '')
                return (
                    <EnhancedCodeBlock
                        language={language}
                        filename={commentFilename}
                        showLineNumbers={true}
                    >
                        {codeContent}
                    </EnhancedCodeBlock>
                )
            }
        }

        return (
            <EnhancedCodeBlock
                language={language}
                filename={filename}
                showLineNumbers={true}
            >
                {codeContent}
            </EnhancedCodeBlock>
        )
    }

    // Fallback to regular pre element
    return <pre {...props}>{children}</pre>
}
