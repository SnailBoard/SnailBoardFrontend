const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8081',
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: (path, req) => req.originalUrl.replace('/api/', '/'),
    }),
  )
}
