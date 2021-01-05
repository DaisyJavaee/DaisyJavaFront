const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://team.lykdsb.cn:10000",
			changeOrigin: true,
			pathRewrite: {
				'^/api': ''
			},
		})
    );
};