const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/auth/*","/group/*","/timer/*"],
        createProxyMiddleware({
            target: `http://localhost:8090`,
            changeOrigin: true,
        })
    );
};