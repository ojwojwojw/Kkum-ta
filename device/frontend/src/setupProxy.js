const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
<<<<<<< HEAD
    ["/timer", "/stopwatch", "/device", "/synchro"],
=======
    ["/timer", "/stopwatch", "/device"],
>>>>>>> f4f13cd723e840c0834e116b5427d023d5075037
    createProxyMiddleware({
      target: `http://localhost:8085`,
      changeOrigin: true,
    })
  );
};
