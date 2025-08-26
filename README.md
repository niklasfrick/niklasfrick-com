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
