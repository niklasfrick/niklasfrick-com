#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

// Get command line arguments
const args = process.argv.slice(2)
const title = args[0]
const description = args[1]
const slug = args[2]

if (!title || !description || !slug) {
  console.error('Usage: node create-blog-post.js "Title" "Description" "slug"')
  console.error(
    'Example: node create-blog-post.js "My New Post" "This is a description" "my-new-post"',
  )
  process.exit(1)
}

// Get current date
const currentDate = new Date().toISOString().split('T')[0]

// Create the blog post directory
const blogDir = path.join(process.cwd(), 'app', 'blog', slug)
const mdxFile = path.join(blogDir, 'page.mdx')

// Create directory if it doesn't exist
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

// Create the MDX content
const mdxContent = `export const metadata = {
  title: '${title}',
  description: '${description}',
  date: '${currentDate}',
  lastUpdated: '${currentDate}',
  alternates: {
    canonical: '/blog/${slug}',
  },
};

# ${title}

<BlogDateDisplay date="${currentDate}" lastUpdated="${currentDate}" className="mb-6" />

${description}

## Introduction

Start your blog post here...

## Main Content

Add your main content here...

## Conclusion

Wrap up your blog post here...

---

_This blog post was created on ${currentDate}._
`

// Write the file
fs.writeFileSync(mdxFile, mdxContent)

console.log(`✅ Blog post created successfully!`)
console.log(`📁 Directory: ${blogDir}`)
console.log(`📄 File: ${mdxFile}`)
console.log(`🔗 URL: /blog/${slug}`)
console.log(
  `\n💡 Tip: The blog post will automatically appear on your blog page and home page!`,
)
