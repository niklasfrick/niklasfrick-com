#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to automatically update the lastUpdated field in blog posts
 * This can be run manually or as a pre-commit hook
 */

const BLOG_DIR = path.join(__dirname, '../app/blog');
const DATA_FILE = path.join(__dirname, '../app/data.ts');

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function updateBlogPostDates() {
    const currentDate = getCurrentDate();
    let updated = false;

    // Read the data file
    let dataContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Update lastUpdated for all blog posts
    dataContent = dataContent.replace(
        /lastUpdated: '\d{4}-\d{2}-\d{2}'/g,
        `lastUpdated: '${currentDate}'`
    );

    // Write back to the data file
    fs.writeFileSync(DATA_FILE, dataContent);
    console.log(`✅ Updated lastUpdated dates to ${currentDate} in data.ts`);

    // Update individual blog post metadata files
    const blogDirs = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const blogDir of blogDirs) {
        const mdxFile = path.join(BLOG_DIR, blogDir, 'page.mdx');

        if (fs.existsSync(mdxFile)) {
            let mdxContent = fs.readFileSync(mdxFile, 'utf8');

            // Update lastUpdated in metadata if it exists
            if (mdxContent.includes('lastUpdated:')) {
                mdxContent = mdxContent.replace(
                    /lastUpdated: '\d{4}-\d{2}-\d{2}'/g,
                    `lastUpdated: '${currentDate}'`
                );

                fs.writeFileSync(mdxFile, mdxContent);
                console.log(`✅ Updated lastUpdated in ${blogDir}/page.mdx`);
                updated = true;
            }
        }
    }

    if (!updated) {
        console.log('ℹ️  No blog posts found with lastUpdated fields to update');
    }
}

function createNewBlogPost(slug, title, description) {
    const currentDate = getCurrentDate();
    const blogDir = path.join(BLOG_DIR, slug);

    // Create directory
    if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
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
`;

    const mdxFile = path.join(blogDir, 'page.mdx');
    fs.writeFileSync(mdxFile, mdxContent);

    console.log(`✅ Created new blog post: ${slug}`);
    console.log(`📝 File: ${mdxFile}`);
    console.log(`📅 Date: ${currentDate}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
    // Update existing blog posts
    updateBlogPostDates();
} else if (args[0] === 'create' && args.length >= 4) {
    // Create new blog post: node update-blog-dates.js create slug "Title" "Description"
    const slug = args[1];
    const title = args[2];
    const description = args[3];
    createNewBlogPost(slug, title, description);
} else {
    console.log('Usage:');
    console.log('  node update-blog-dates.js                    # Update lastUpdated for all posts');
    console.log('  node update-blog-dates.js create slug "Title" "Description"  # Create new post');
}
