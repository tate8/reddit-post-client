const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth/google", { target: "http://localhost:3001/" }),
    createProxyMiddleware("/auth/facebook", { target: "http://localhost:3001/" })
  );
};