/**
 * Utility functions for managing blog post dates
 */

/**
 * Get the current date in ISO format (YYYY-MM-DD)
 */
export function getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
}

/**
 * Get the current date and time in ISO format
 */
export function getCurrentDateTime(): string {
    return new Date().toISOString();
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format a date string for display with time
 */
export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
}

/**
 * Get a human-readable relative time (e.g., "2 days ago", "yesterday")
 */
export function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Reset time to start of day for both dates to compare only dates
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowOnly.getTime() - dateOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays > 1 && diffDays < 7) return `vor ${diffDays} Tagen`;
    if (diffDays >= 7 && diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`;
    if (diffDays >= 30 && diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
    if (diffDays >= 365) return `vor ${Math.floor(diffDays / 365)} Jahren`;

    // For future dates (shouldn't happen in normal usage)
    if (diffDays < 0) {
        const absDays = Math.abs(diffDays);
        if (absDays === 1) return 'Morgen';
        if (absDays < 7) return `in ${absDays} Tagen`;
        return `in ${Math.floor(absDays / 7)} Wochen`;
    }

    return 'Heute'; // fallback
}

export function extractCoverImageFromMDX(mdxContent: string): string | null {
    // Look for Cover component usage in MDX content
    const coverMatch = mdxContent.match(/<Cover\s+src="([^"]+)"[^>]*>/);
    return coverMatch ? coverMatch[1] : null;
}

export async function getBlogPostCoverImage(slug: string): Promise<string | null> {
    try {
        // Remove the /blog/ prefix from the slug if present
        const cleanSlug = slug.replace('/blog/', '');

        // Try to read the MDX file content
        const fs = await import('fs/promises');
        const path = await import('path');

        const mdxPath = path.join(process.cwd(), 'app', 'blog', cleanSlug, 'page.mdx');
        const mdxContent = await fs.readFile(mdxPath, 'utf-8');

        return extractCoverImageFromMDX(mdxContent);
    } catch (error) {
        console.warn(`Could not read cover image for blog post: ${slug}`, error);
        return null;
    }
}

export interface BlogPost {
    title: string;
    description: string;
    link: string;
    uid: string;
    date: string;
    lastUpdated: string;
    coverImage?: string | null;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');

        const blogDir = path.join(process.cwd(), 'app', 'blog');
        const entries = await fs.readdir(blogDir, { withFileTypes: true });

        const blogPosts: BlogPost[] = [];

        for (const entry of entries) {
            if (entry.isDirectory() && entry.name !== 'layout') {
                const mdxPath = path.join(blogDir, entry.name, 'page.mdx');

                try {
                    const mdxContent = await fs.readFile(mdxPath, 'utf-8');
                    const metadata = extractMetadataFromMDX(mdxContent);

                    if (metadata) {
                        const coverImage = extractCoverImageFromMDX(mdxContent);

                        blogPosts.push({
                            title: metadata.title,
                            description: metadata.description,
                            link: `/blog/${entry.name}`,
                            uid: entry.name,
                            date: metadata.date,
                            lastUpdated: metadata.lastUpdated || metadata.date,
                            coverImage,
                        });
                    }
                } catch (error) {
                    console.warn(`Could not read blog post: ${entry.name}`, error);
                }
            }
        }

        // Sort by date (newest first)
        return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return [];
    }
}

export function extractMetadataFromMDX(mdxContent: string): { title: string; description: string; date: string; lastUpdated?: string } | null {
    try {
        // Extract metadata from the export const metadata = { ... } block
        const metadataMatch = mdxContent.match(/export const metadata = \{([\s\S]*?)\};/);

        if (!metadataMatch) {
            return null;
        }

        const metadataBlock = metadataMatch[1];

        // Extract title
        const titleMatch = metadataBlock.match(/title:\s*['"`]([^'"`]+)['"`]/);
        const title = titleMatch ? titleMatch[1] : 'Untitled';

        // Extract description
        const descriptionMatch = metadataBlock.match(/description:\s*['"`]([^'"`]+)['"`]/);
        const description = descriptionMatch ? descriptionMatch[1] : '';

        // Extract date
        const dateMatch = metadataBlock.match(/date:\s*['"`]([^'"`]+)['"`]/);
        const date = dateMatch ? dateMatch[1] : getCurrentDate();

        // Extract lastUpdated (optional)
        const lastUpdatedMatch = metadataBlock.match(/lastUpdated:\s*['"`]([^'"`]+)['"`]/);
        const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1] : undefined;

        return {
            title,
            description,
            date,
            lastUpdated,
        };
    } catch (error) {
        console.warn('Error extracting metadata from MDX:', error);
        return null;
    }
}

export async function getLatestBlogPosts(count: number = 3): Promise<BlogPost[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.slice(0, count);
}
