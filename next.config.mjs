/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "res.cloudinary.com",
      "as1.ftcdn.net",
      "t3.ftcdn.net",
    ],
  },
  eslint: {
    // This will allow builds to pass even if ESLint errors are present
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
