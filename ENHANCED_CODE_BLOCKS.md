# Enhanced Code Blocks

This project now includes enhanced code blocks with file names, syntax highlighting, line numbers, and copy buttons.

## Features

- **File names**: Display the filename in the header
- **Syntax highlighting**: Proper syntax highlighting for various languages
- **Line numbers**: Optional line numbers for better code readability
- **Copy button**: One-click copy functionality with visual feedback
- **File type indicators**: Shows the file extension in the header
- **Dark mode support**: Automatically adapts to your theme
- **Responsive design**: Works well on all screen sizes

## Usage

### Basic Usage

To use enhanced code blocks in your MDX files, simply add a comment with the filename at the beginning of your code block:

````markdown
```javascript
// my-file.js
const example = "This will show 'my-file.js' in the header"
```
````

````

### Supported File Types

The enhanced code blocks support many file types and will automatically show the appropriate file extension:

- **JavaScript/TypeScript**: `.js`, `.ts`, `.jsx`, `.tsx`
- **Python**: `.py`
- **Java**: `.java`
- **C/C++**: `.c`, `.cpp`
- **C#**: `.cs`
- **PHP**: `.php`
- **Ruby**: `.rb`
- **Go**: `.go`
- **Rust**: `.rs`
- **Swift**: `.swift`
- **Kotlin**: `.kt`
- **Scala**: `.scala`
- **HTML**: `.html`
- **CSS/SCSS/SASS**: `.css`, `.scss`, `.sass`, `.less`
- **JSON**: `.json`
- **YAML**: `.yml`, `.yaml`
- **TOML**: `.toml`
- **Markdown**: `.md`, `.mdx`
- **SQL**: `.sql`
- **Shell scripts**: `.sh`, `.bash`, `.zsh`, `.ps1`
- **Docker**: `Dockerfile`
- **Git**: `.gitignore`
- **Environment**: `.env`

### Examples

#### React Component
```tsx
// components/Button.tsx
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  )
}
````

#### Python Script

```python
# data_processor.py
import pandas as pd

def process_data(data):
    df = pd.DataFrame(data)
    return df.dropna()
```

#### JSON Configuration

```json
// config.json
{
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```

#### Shell Script

```bash
#!/bin/bash
# deploy.sh
echo "Starting deployment..."
npm run build
```

## How It Works

The enhanced code blocks are implemented using:

1. **React Syntax Highlighter**: For syntax highlighting with the One Dark theme
2. **Custom MDX Components**: Override the default `pre` and `code` components
3. **Filename Detection**: Automatically detects filenames from comments
4. **Copy Functionality**: Uses the Clipboard API for copying code

## Customization

You can customize the appearance by modifying the `EnhancedCodeBlock` component in `components/ui/enhanced-code-block.tsx`.

### Styling

The component uses Tailwind CSS classes and can be customized by modifying:

- Header styling (background, borders, text colors)
- Code block styling (background, borders, font size)
- Line number styling (colors, spacing)
- Copy button styling (colors, hover effects)

### Theme Support

The component automatically adapts to dark/light mode using Tailwind's dark mode classes.

## Dependencies

- `react-syntax-highlighter`: For syntax highlighting
- `lucide-react`: For icons (Copy, Check)
- `@types/react-syntax-highlighter`: TypeScript types

## Installation

The enhanced code blocks are already integrated into the project. If you need to install dependencies manually:

```bash
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

## Troubleshooting

### Code Not Highlighting

Make sure the language is specified correctly in the code block:

````markdown
```javascript
// Correct
```
````

```js
// Also correct
```

```typescript
// Correct for TypeScript
```

````

### Filename Not Showing

Ensure the filename comment is on the first line and follows the correct format:

```markdown
```javascript
// filename.js  ✅ Correct
const code = "example";

```javascript
// filename.js
const code = "example";  ✅ Also correct
````

```javascript
const code = 'example'
// filename.js  ❌ Wrong - filename must be first
```

```

### Copy Button Not Working

The copy functionality requires the Clipboard API, which is supported in all modern browsers. If it's not working:

1. Check if you're using HTTPS (required for Clipboard API)
2. Ensure the browser supports the Clipboard API
3. Check the browser console for any errors
```
