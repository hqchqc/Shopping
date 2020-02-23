module.export = {
    configureWebpack: {
        resolve:{
            alias:{
                // '@': 'src' 默认有一个了
                'assets': '@/assets',
                'common': '@/common',
                'components':  '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}