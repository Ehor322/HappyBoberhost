const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'http://localhost:3003/',
      changeOrigin: true,
    })
  );
  app.use(
    '/dialogs',
    createProxyMiddleware({
      target: 'http://localhost:3003/',
      changeOrigin: true,
    })
  );
  app.use(
    '/messages',
    createProxyMiddleware({
      target: 'http://localhost:3003/',
      changeOrigin: true,
    })
  );
  app.use(
    '/files',
    createProxyMiddleware({
      target: 'http://localhost:3003/',
      changeOrigin: true,
    })
  );
};