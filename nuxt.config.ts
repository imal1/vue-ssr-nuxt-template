import { NuxtConfig } from '@nuxt/types'
import webpack from 'webpack'
import { version } from './package.json'

const serverConfig: NuxtConfig = {
  ssr: true,
  target: 'server',
  axios: {
    prefix: process.env.PREFIX,
    proxy: true
  },
  proxy: {
    '/grade': {
      router() {
        return process.env.TARGET
      }
    }
  },
}

const staticConfig: NuxtConfig = {
  ssr: false,
  target: 'static',
  axios: {
    prefix: process.env.PREFIX,
    proxy: false
  },
}

const config: NuxtConfig = {

  /**
   * @description: HTML头部元数据配置；文档: https://go.nuxtjs.dev/config-head
   */
  head: {
    title: 'Mandala.web.template.ts',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /**
   * @description: 环境声明配置
   */
  env: {
    PREFIX: '/grade',
  },

  srcDir: 'src/',
  dir: {
    static: '../public/'
  },
  content: {
    dir: '../public/'
  },

  /**
   * @description: 全局引入的CSS文件；文档：https://go.nuxtjs.dev/config-css
   */
  css: [
    '@/theme/element-ui.scss',
    '@/theme/index.scss'
  ],

  /**
   * @description: 样式变量、混合资源（替代@import）；文档：https://github.com/nuxt-community/style-resources-module
   */
  styleResources: {
    scss: [
      '~theme/element-variables.scss'
    ],
    hoistUseStatements: true
  },

  /**
   * @description: 渲染前注入的插件js；文档：https://go.nuxtjs.dev/config-plugins
   */
  plugins: [
    { src: '@/plugins/inject' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/element-ui', ssr: false },
    // { src: '@/plugins/mock', ssr: true }, // http://lavyun.gitee.io/better-mock
    { src: '@/plugins/appInit', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    interval: 2000,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 'nuxt-vite', // https://vite.nuxtjs.org
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/composition-api/module', // https://composition-api.nuxtjs.org,
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/stylelint-module', // https://go.nuxtjs.dev/stylelint
    'nuxt-windicss', // https://windicss.org/integrations/nuxt
    '@nuxtjs/style-resources', // https://github.com/nuxt-community/style-resources-module
    'nuxt-build-optimisations', // https://github.com/harlan-zw/nuxt-build-optimisations
    '@nuxtjs/router', // https://github.com/nuxt-community/router-module
    // '@nuxt/content' // https://content.nuxtjs.org/
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org
    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module
    // 'nuxt-i18n', // https://i18n.nuxtjs.org
    'nuxt-precompress', // https://github.com/frenchrabbit/nuxt-precompress
    '@luxdamore/nuxt-prune-html', // https://luxdamore.github.io/nuxt-prune-html
    '@nuxtjs/component-cache', // https://github.com/nuxt-community/component-cache-module
    // '@dewib/xhr-cache', // https://xhr-cache.dewib.com
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org
    '@nuxtjs/proxy', // https://github.com/nuxt-community
    'portal-vue/nuxt', // https://portal-vue.linusb.org
    '@nuxtjs/universal-storage', // https://github.com/nuxt-community/universal-storage-module
    ['@nuxtjs/html-minifier', { logHtml: true }], // https://github.com/nuxt-community/html-minifier-module
  ],

  /**
   * @description: 自定义webpack配置；文档：https://go.nuxtjs.dev/config-build
   */
  build: {
    transpile: [
      /^element-ui/,
      '@nuxtjs/auth-next'
    ],
    loaders: {
      scss: {
        sourceMap: true,
      },
    },
    optimizeCSS: true,
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': version
      })
    ]
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}'
      }
    }
  },

  /**
   * @description: 自定义loading加载组件
   */
  loading: {
    color: '#67C23A'
  },

  /**
   * @description: vue-router配置；自定义router：/src/router.js；文档：https://github.com/nuxt-community/router-module
   */
  routerModule: {
    keepDefaultRouter: true
  },


  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  /**
   * @description: vite配置；暂不使用
   */
  vite: {
    ssr: true,
    optimizeDeps: {
      include: [
        'cookie'
      ],
    },
  },

  /**
   * @description: 国际化配置；自定义：/src/lang
   */
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      }, {
        code: 'zh',
        file: 'zh-CN.ts'
      }
    ],
    defaultLocale: 'zh',
    lazy: true,
    langDir: 'lang/'
  },

  /**
   * @description: 日期处理库配置；文档：https://day.js.org/docs/en/installation/installation
   */
  dayjs: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    defaultTimeZone: 'Asia/Beijing',
    plugins: [
      'utc',
      'timezone',
      'localeData'
    ]
  },

  /**
   * @description: 公共存储库配置；文档：https://day.js.org
   */
  storage: {
    // vuex
    // localStorage
    cookie: false,
    initialState: {
      routeList: [],
      menuList: []
    }
  } as any
}

export default {
  ...config,
  ...process.env.NUXT_ENV === 'static' ? staticConfig : serverConfig
}
