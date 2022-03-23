const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { PORT = 3000 } = process.env;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// uncomment this for data from dev
proxyUrl = 'https://lens-api.sepana.io'


app.prepare().then(() => {
    const expressApp = express();
    expressApp.use('/contents', createProxyMiddleware({ target: proxyUrl, changeOrigin: true }));

    expressApp.all('*', (req, res) => handle(req, res));

    expressApp.listen(PORT, () => console.log("######## app running ########"));
});