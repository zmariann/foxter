const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      process.env.NODE_ENV === "development" && {
        source: "/api",
        destination: "http://localhost:3000/api",
      },
    ].filter(Boolean);
  },
};

module.exports = nextConfig;
