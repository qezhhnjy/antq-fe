/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: 'https://preview.pro.ant.design',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
    },
    '/antq': {
      target: 'http://localhost:11000/',
      changeOrigin: true,
      pathRewrite: {'^/antq': ''},
    },
    '/doctor': {
      // target: 'https://localhost:11000/v1/',
      target: 'https://api.doctorxiong.club/v1/',
      changeOrigin: true,
      pathRewrite: {'^/doctor': ''},
    },
    '/snowball-api': {
      target: 'https://xueqiu.com',
      changeOrigin: true,
      credentials: "include",
      headers: {
        Cookie: 'xq_a_token=d9e55dabd156b1ce81e221878e2d9897ccea8920'
      },
      pathRewrite: {'^/snowball-api': ''},
    },
    '/snowball-stock': {
      target: 'https://stock.xueqiu.com',
      changeOrigin: true,
      credentials: "include",
      headers: {
        Cookie: 'xq_a_token=d9e55dabd156b1ce81e221878e2d9897ccea8920'
      },
      pathRewrite: {'^/snowball-stock': '/v5'},
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
};
