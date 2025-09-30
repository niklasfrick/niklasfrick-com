## Features

- Minimal one-page portfolio layout.
- Blog support with MDX and automatic date tracking.
- Responsive and accessible design.
- Easy to use
- [Motion-Primitives](https://motion-primitives.com) for animated components.
- Automated blog post management with creation and update scripts.

## Getting Started

For detailed setup instructions, refer to the [Installation Guide](./INSTALLATION.md).

```bash
git clone https://github.com/ibelick/nim.git
cd nim
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blog Management

For detailed blog management instructions, refer to the [Blog Management Guide](./BLOG_MANAGEMENT.md).

### Quick Commands

```bash
# Create a new blog post
npm run blog:create "my-post-slug" "My Post Title" "Post description"

# Update lastUpdated dates for all posts
npm run blog:update
```

## Company Logo Feature

The portfolio includes automatic company logo generation for work experience entries:

### How it works:

1. **Real logo detection**: The system first attempts to fetch real company logos from Clearbit's Logo API
2. **Fallback generation**: If no real logo is found, it generates a beautiful logo using the company's initials
3. **Consistent colors**: Each company gets a unique, consistent color based on their name
4. **Custom logos**: You can also provide custom logo URLs in the data

### Adding work experience:

```typescript
// In app/data.ts
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Google',
    title: 'Senior Software Engineer',
    start: '2023',
    end: 'Aktuell',
    link: 'https://google.com',
    id: 'work1',
    // logo field is optional - will be auto-generated if not provided
  },
]
```

### Using the utility script:

```bash
node scripts/add-work-experience.js
```

This interactive script helps you add new work experience entries with automatic logo generation.
