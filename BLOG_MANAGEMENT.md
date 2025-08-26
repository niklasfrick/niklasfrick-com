# Blog Management Guide

This guide explains how to manage blog posts with automatic date tracking.

## Overview

Blog posts now automatically track:
- **Date**: When the post was created
- **Last Updated**: When the post was last modified

## File Structure

Each blog post consists of:
1. **MDX file**: `app/blog/[slug]/page.mdx` - Contains the post content and metadata
2. **Data entry**: `app/data.ts` - Contains the post listing with dates

## Creating a New Blog Post

### Method 1: Using the script (Recommended)

```bash
npm run blog:create "my-new-post" "My New Post Title" "A brief description of the post"
```

This will:
- Create the directory `app/blog/my-new-post/`
- Create `page.mdx` with proper metadata
- Set both `date` and `lastUpdated` to today's date
- Automatically add the post to `app/data.ts`
- Generate a unique UID for the post

### Method 2: Manual creation

1. Create directory: `app/blog/[slug]/`
2. Create `page.mdx` with metadata:

```mdx
export const metadata = {
  title: 'Your Post Title',
  description: 'Your post description',
  date: '2024-01-21',
  lastUpdated: '2024-01-21',
  alternates: {
    canonical: '/blog/your-slug',
  },
};

# Your Post Title

Your content here...
```

3. Add entry to `app/data.ts`:

```typescript
{
  title: 'Your Post Title',
  description: 'Your post description',
  link: '/blog/your-slug',
  uid: 'blog-5',
  date: '2024-01-21',
  lastUpdated: '2024-01-21',
}
```

## Updating Blog Posts

### Automatic Updates

Run this command to update the `lastUpdated` field for all posts:

```bash
npm run blog:update
```

### Manual Updates

1. Edit the MDX file content
2. Update the `lastUpdated` field in both:
   - The MDX file's metadata
   - The `app/data.ts` entry

## Date Format

Dates are stored in ISO format: `YYYY-MM-DD`

Examples:
- `2024-01-21`
- `2024-12-31`

## Utility Functions

The `lib/blog-utils.ts` file provides helper functions:

```typescript
import { 
  getCurrentDate, 
  formatDate, 
  getRelativeTime 
} from '@/lib/blog-utils';

// Get current date
const today = getCurrentDate(); // "2024-01-21"

// Format for display
const displayDate = formatDate('2024-01-21'); // "21. Januar 2024"

// Get relative time
const relative = getRelativeTime('2024-01-20'); // "vor 1 Tag"
```

## Git Hooks (Optional)

To automatically update dates when committing, you can add this to your `.git/hooks/pre-commit`:

```bash
#!/bin/bash
npm run blog:update
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Displaying Dates

To display dates in your components, import the utility functions:

```typescript
import { formatDate, getRelativeTime } from '@/lib/blog-utils';

// In your component
<div>
  <p>Erstellt: {formatDate(post.date)}</p>
  <p>Zuletzt aktualisiert: {getRelativeTime(post.lastUpdated)}</p>
</div>
```

## Best Practices

1. **Always use the script** for creating new posts to ensure consistency
2. **Run `npm run blog:update`** before committing changes
3. **Keep dates in sync** between MDX files and `data.ts`
4. **Use meaningful slugs** that reflect the post content
5. **Include proper descriptions** for SEO and preview purposes
