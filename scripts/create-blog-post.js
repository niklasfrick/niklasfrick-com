#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Comprehensive script to create a new blog post
 * This creates the MDX file and adds it to the data.ts file
 */

const BLOG_DIR = path.join(__dirname, '../app/blog');
const DATA_FILE = path.join(__dirname, '../app/data.ts');

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function generateUID() {
    // Find the highest existing UID number and increment it
    const dataContent = fs.readFileSync(DATA_FILE, 'utf8');
    const uidMatches = dataContent.match(/uid: 'blog-(\d+)'/g);
    let maxUID = 0;

    if (uidMatches) {
        uidMatches.forEach(match => {
            const num = parseInt(match.match(/\d+/)[0]);
            if (num > maxUID) maxUID = num;
        });
    }

    return `blog-${maxUID + 1}`;
}

function createNewBlogPost(slug, title, description) {
    const currentDate = getCurrentDate();
    const uid = generateUID();
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

<BlogDateDisplay date="${currentDate}" lastUpdated="${currentDate}" className="mb-6" />

${description}

{/* Add your blog content here */}

---

*Erstellt am ${currentDate}*
`;

    const mdxFile = path.join(blogDir, 'page.mdx');
    fs.writeFileSync(mdxFile, mdxContent);

    // Add to data.ts
    const dataContent = fs.readFileSync(DATA_FILE, 'utf8');

    // Find the BLOG_POSTS array and add the new entry
    const blogPostEntry = `  {
    title: '${title}',
    description: '${description}',
    link: '/blog/${slug}',
    uid: '${uid}',
    date: '${currentDate}',
    lastUpdated: '${currentDate}',
  },`;

    // Insert the new entry before the closing bracket of BLOG_POSTS array
    const updatedDataContent = dataContent.replace(
        /export const BLOG_POSTS: BlogPost\[\] = \[([\s\S]*?)\]/,
        (match, content) => {
            return `export const BLOG_POSTS: BlogPost[] = [${content}${blogPostEntry}\n]`;
        }
    );

    fs.writeFileSync(DATA_FILE, updatedDataContent);

    console.log(`✅ Created new blog post: ${slug}`);
    console.log(`📝 File: ${mdxFile}`);
    console.log(`📅 Date: ${currentDate}`);
    console.log(`🆔 UID: ${uid}`);
    console.log(`📊 Added to data.ts`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   1. Edit the content in ${mdxFile}`);
    console.log(`   2. Run 'npm run dev' to preview`);
    console.log(`   3. Run 'npm run blog:update' before committing changes`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
    console.log('Usage:');
    console.log('  node create-blog-post.js <slug> "Title" "Description"');
    console.log('');
    console.log('Example:');
    console.log('  node create-blog-post.js my-new-post "My New Post" "A brief description of the post"');
    process.exit(1);
}

const [slug, title, description] = args;

// Validate slug
if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error('❌ Error: Slug must contain only lowercase letters, numbers, and hyphens');
    process.exit(1);
}

// Check if slug already exists
const blogDir = path.join(BLOG_DIR, slug);
if (fs.existsSync(blogDir)) {
    console.error(`❌ Error: Blog post with slug '${slug}' already exists`);
    process.exit(1);
}

createNewBlogPost(slug, title, description);
