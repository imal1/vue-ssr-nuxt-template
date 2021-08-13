import { NuxtConfig } from '@nuxt/types'
import windiConfig from './windi.config'

const config: NuxtConfig = {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
  env: {
    PREFIX: '/api',
  },

  srcDir: 'src/',
  dir: {
    static: '../public/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/inject', ssr: false },
    { src: '@/plugins/element-ui', ssr: false },
    { src: '@/plugins/axios' },
    { src: '@/plugins/mock', ssr: true }, // http://lavyun.gitee.io/better-mock
    { src: '@/plugins/app' },
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
    '@nuxtjs/router', // https://github.com/nuxt-community/router-module
    'nuxt-windicss', // https://windicss.org/integrations/nuxt
    'nuxt-build-optimisations', // https://github.com/harlan-zw/nuxt-build-optimisations
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org
    '@nuxtjs/dayjs', // https://github.com/nuxt-community/dayjs-module
    'nuxt-i18n', // https://i18n.nuxtjs.org
    '@nuxt/image', // https://image.nuxtjs.org
    'nuxt-precompress', // https://github.com/frenchrabbit/nuxt-precompress
    '@luxdamore/nuxt-prune-html', // https://luxdamore.github.io/nuxt-prune-html
    '@nuxtjs/component-cache', // https://github.com/nuxt-community/component-cache-module
    // '@dewib/xhr-cache', // https://xhr-cache.dewib.com
    '@nuxtjs/auth-next', // https://auth.nuxtjs.org
    '@nuxtjs/proxy', // https://github.com/nuxt-community
    'portal-vue/nuxt', // https://portal-vue.linusb.org
    ['@nuxtjs/html-minifier', { logHtml: true }], // https://github.com/nuxt-community/html-minifier-module
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  ssr: false,

  target: 'static',

  typescript: {
    typeCheck: {
      eslint: {
        files: './src/**/*.{ts,js,vue}'
      }
    }
  },

  loading: {
    color: (windiConfig.theme?.colors as any).success
  },

  axios: {
    prefix: process.env.PREFIX,
    // proxy: true
  },

  // proxy: {
  //   '/grade': {
  //     target: 'http://localhost:3000',
  //     // async router() {
  //     //   const hostJSON = await require('./public/host.json')
  //     //   return hostJSON.data
  //     // }
  //   }
  // },

  server: {
    port: 3000,
    host: '127.0.0.1'
  },

  vite: {
    optimizeDeps: {
      include: [
        'cookie'
      ],
    }
  },

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
  }
}

export default config
