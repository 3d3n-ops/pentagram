// next.config.js

module.exports = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xuot59okd8gfywot.public.blob.vercel-storage.com",
        port: "",
        pathname: "crypto.randomUUID()/**",
        search: "",
      },
    ],
  },
};
