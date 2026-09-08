import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Yeti',
                allow: '/',
            },
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://www.moneymatch.kr/sitemap.xml',
    }
}
