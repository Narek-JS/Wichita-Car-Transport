/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    disableStaticImages: true,
    loader: "custom",
    loaderFile: './public/assets/images/loader.js',
  },
  // remotePatterns: [
  //   {
  //     protocol: 'https',
  //     hostname: 'wichita.logixdevops.com/api/v1',
  //     port: '3000',
  //     pathname: '/my-bucket/**',
  //   },
  // ],
  async headers() {
    return [
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
                'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value:
                'public, max-age=360, s-maxage=360, stale-while-revalidate=360',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value:
                'public, max-age=360, s-maxage=360, stale-while-revalidate=360',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value:
                'public, max-age=360, s-maxage=360, stale-while-revalidate=360',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
