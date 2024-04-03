/** @type {import('next').NextConfig} */

// Fixes Airtable filterByFormula bug: https://github.com/triggerdotdev/trigger.dev/issues/806
const nextConfig = {
    swcMinify: true,
    experimental: {
        serverMinification: false,
    },
};

export default nextConfig;
