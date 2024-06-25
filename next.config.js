// Remove console.log in production
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
