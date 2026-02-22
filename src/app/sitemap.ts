import { MetadataRoute } from 'next'
import subsidies from '@/data/subsidies.json'
import blogPosts from '@/data/blog-posts.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const subsidyUrls = subsidies.map((subsidy) => ({
        url: `https://moneymatch.kr/money/${subsidy.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const blogUrls = blogPosts.map((post) => ({
        url: `https://moneymatch.kr/blog/${post.id}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: 'https://moneymatch.kr',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://moneymatch.kr/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://moneymatch.kr/quiz',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...subsidyUrls,
        ...blogUrls,
    ]
}
