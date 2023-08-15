const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/auth/*","/group/*"],
        createProxyMiddleware({
            target: `http://localhost:8090`,
            changeOrigin: true,
        })
    );
};