const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER_URL,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: (path, req) => req.originalUrl.replace('/api/', '/'),
    }),
  )
}
