/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/launches',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['imgur.com', 'i.imgur.com', 'images2.imgbox.com', 'live.staticflickr.com', 'farm5.staticflickr.com']
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
}

module.exports = nextConfig
