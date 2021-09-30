const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth/google", { target: "https://a-reddit-clone.herokuapp.com/" }),
    createProxyMiddleware("/auth/facebook", { target: "https://a-reddit-clone.herokuapp.com/" })
  );
};