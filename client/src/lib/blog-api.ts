import blogData from '../data/blog-posts.json';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    category: string | null;
    contentType: string;
    coverImage: string | null;
    author: string;
    readTime: string;
    status: string;
    publishedAt: string;
    updatedAt: string;
}

// Convert JSON strings to Date objects for consistent handling if needed,
// but for display purposes strings are usually fine or parsed in components.
const posts: BlogPost[] = blogData as BlogPost[];

export async function getBlogPosts(): Promise<BlogPost[]> {
    // Simulate network delay for realism/loading states
    await new Promise(resolve => setTimeout(resolve, 300));
    return posts.filter(post => post.status === 'published')
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostsByContentType(contentType: string): Promise<BlogPost[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return posts
        .filter(post => post.contentType === contentType && post.status === 'published')
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return posts.find(post => post.id === id);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return posts.find(post => post.slug === slug);
}
