/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'stock-insight.app' },
            { hostname: 'unsedam.kr' },
            { hostname: 'vibecheck.page' },
            { hostname: 'promptgenie.kr' },
            { hostname: 'irumlab.com' },
            { hostname: 'nutrimatch.kr' },
        ],
    },
};

export default nextConfig;
