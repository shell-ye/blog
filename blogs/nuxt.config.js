const path = require('path')
const config = require('./../config.json')
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/animate.css',
    '@/assets/iconfont/iconfont.css',
    '@/assets/css/element-ui.scss'
  ],
  script: [
    
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui',
    '@/element-ui/index',
    '@/plugins/filter',
    '@/plugins/init',
    { src: '@/plugins/mavon-editor', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],

    // 在这里配置 webpack
    extend (config, ctx) {
    // Run ESLint on save
    const vueLoader = config.module.rules.find((loader) => loader.loader === 'vue-loader');
     /* 把audio标签在编译时转成src属性 */
      vueLoader.options.transformToRequire = {
        audio: 'src'
      };
      /* 对mp3等格式的文件用url-loader进行处理 */
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: process.env.NODE_ENV === 'production'
            ? path.posix.join('./', 'media/[name].[hash:7].[ext]')
            : path.posix.join('./', 'media/[name].[hash:7].[ext]')
        }
      });
    }
  },
  router: {
    middleware: 'route',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  server: {
    port: config.nuxt_port, // default: 3000
    host: 'localhost' // default: localhost,
  }
}
