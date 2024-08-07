import {createProxyMiddleware} from 'http-proxy-middleware'

export default function config(req, res){
    let target = ''
    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    // target 替换为你跨域请求的服务器 如： http://baidu.com
    if (req.url.startsWith('/api')) {
        target = 'http://region-42.seetacloud.com:58749'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            // 通过路径重写，去除请求路径中的 `/backend`
            // 例如 /backend/user/login 将被转发到 https://fanyi-api.baidu.com/user/login
            '^/api/': '/',
        },
    })(req, res)
}