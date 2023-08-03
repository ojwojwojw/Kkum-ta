const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/timer",
        createProxyMiddleware({
            target: `http://localhost:8085`,
            changeOrigin: true,
        })
    );
};
