import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://moneymatch.kr',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://moneymatch.kr/money',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ]
}
