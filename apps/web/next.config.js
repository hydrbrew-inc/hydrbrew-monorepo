/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "stream.mux.com", pathname: "/**" },
      { protocol: "https", hostname: "image.mux.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
