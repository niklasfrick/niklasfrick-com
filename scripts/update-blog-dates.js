#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Script to automatically update the lastUpdated field in blog posts
 * This can be run manually or as a pre-commit hook
 */

const BLOG_DIR = path.join(__dirname, '../app/blog')

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

function updateBlogPostDates() {
  let updated = false

  // Update individual blog post metadata files
  const blogDirs = fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  for (const blogDir of blogDirs) {
    const mdxFile = path.join(BLOG_DIR, blogDir, 'page.mdx')

    if (fs.existsSync(mdxFile)) {
      const stats = fs.statSync(mdxFile)
      const fileModifiedDate = new Date(stats.mtime).toISOString().split('T')[0]

      let mdxContent = fs.readFileSync(mdxFile, 'utf8')

      // Check if file has lastUpdated field and if it needs updating
      if (mdxContent.includes('lastUpdated:')) {
        // Extract current lastUpdated date
        const lastUpdatedMatch = mdxContent.match(
          /lastUpdated:\s*['"`]([^'"`]+)['"`]/,
        )
        const currentLastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1] : null

        // Only update if the file was modified after the lastUpdated date
        if (currentLastUpdated && fileModifiedDate > currentLastUpdated) {
          mdxContent = mdxContent.replace(
            /lastUpdated: '\d{4}-\d{2}-\d{2}'/g,
            `lastUpdated: '${fileModifiedDate}'`,
          )

          fs.writeFileSync(mdxFile, mdxContent)
          console.log(
            `✅ Updated lastUpdated in ${blogDir}/page.mdx to ${fileModifiedDate}`,
          )
          updated = true
        } else if (!currentLastUpdated) {
          // If no lastUpdated field exists, add it with the file modification date
          mdxContent = mdxContent.replace(
            /(date:\s*['"`][^'"`]+['"`],)/,
            `$1\n  lastUpdated: '${fileModifiedDate}',`,
          )

          fs.writeFileSync(mdxFile, mdxContent)
          console.log(
            `✅ Added lastUpdated field to ${blogDir}/page.mdx with date ${fileModifiedDate}`,
          )
          updated = true
        } else {
          console.log(
            `ℹ️  ${blogDir}/page.mdx is up to date (lastUpdated: ${currentLastUpdated}, file modified: ${fileModifiedDate})`,
          )
        }
      }
    }
  }

  // Update the data.ts file to reflect any changes
  if (updated) {
    console.log(
      `✅ Blog post dates have been updated. Please run the data generation script if needed.`,
    )
  } else {
    console.log('ℹ️  No blog posts needed date updates')
  }
}

function createNewBlogPost(slug, title, description) {
  const currentDate = getCurrentDate()
  const blogDir = path.join(BLOG_DIR, slug)

  // Create directory
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true })
  }

  // Create the MDX file
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

${description}

<!-- Add your blog content here -->

---

*Erstellt am ${currentDate}*
`

  const mdxFile = path.join(blogDir, 'page.mdx')
  fs.writeFileSync(mdxFile, mdxContent)

  console.log(`✅ Created new blog post: ${slug}`)
  console.log(`📝 File: ${mdxFile}`)
  console.log(`📅 Date: ${currentDate}`)
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
  // Update existing blog posts
  updateBlogPostDates()
} else if (args[0] === 'create' && args.length >= 4) {
  // Create new blog post: node update-blog-dates.js create slug "Title" "Description"
  const slug = args[1]
  const title = args[2]
  const description = args[3]
  createNewBlogPost(slug, title, description)
} else {
  console.log('Usage:')
  console.log(
    '  node update-blog-dates.js                    # Update lastUpdated for all posts',
  )
  console.log(
    '  node update-blog-dates.js create slug "Title" "Description"  # Create new post',
  )
}
