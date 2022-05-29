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
    domains: ['i.imgur.com', 'images2.imgbox.com']
  }
}

module.exports = nextConfig
