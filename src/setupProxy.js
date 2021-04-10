const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            logLevel: 'debug',
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return req.originalUrl.replace('/api/', '/');
            }
        })
    );
};