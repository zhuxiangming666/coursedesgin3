module.exports  = {
    devServer : {
        proxy: {
            '/api' : {
                target:"http://127.0.0.1:8088",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'coursedesign/controller/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://api.douban.com/user/add'，直接写‘/api/user/add’即可，此处的‘api’可以设置为自己想要设置的任何词语，符合规范即可
                  }
            }
        }
    }
}