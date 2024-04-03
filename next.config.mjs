/** @type {import('next').NextConfig} */

const nextConfig = {
    swcMinify: true,
    experimental: {
        serverMinification: false,
    },
};

export default nextConfig;
