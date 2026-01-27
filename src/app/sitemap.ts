import { MetadataRoute } from 'next'
import subsidies from '@/data/subsidies.json'

export default function sitemap(): MetadataRoute.Sitemap {
    const subsidyUrls = subsidies.map((subsidy) => ({
        url: `https://moneymatch.kr/money/${subsidy.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: 'https://moneymatch.kr',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...subsidyUrls,
    ]
}
