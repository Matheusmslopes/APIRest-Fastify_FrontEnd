/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          '/',
          'm.media-amazon.com',
          'blogger.googleusercontent.com',
          'yet-another-domain.com',
          // Adicione mais domínios conforme necessário
        ],
      },
};

export default nextConfig;
