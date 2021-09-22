/*
 * @Author: imali
 * @Date: 2021-09-03 11:50:05
 * @LastEditTime: 2021-09-17 15:14:54
 * @LastEditors: imali
 * @Description:
 */
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { AxiosResponse } from 'axios'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { toNumber } from "lodash"
import GlobalApi from '@/api/app'

async function getHost(api: NuxtAxiosInstance, ctx: any) {
  try {
    if (ctx.isStatic) {
      ctx.$axios.setBaseURL(window.location.origin)
      const { host } = await ctx.$axios.$get('/host.json?callback=')
      api.setBaseURL(`${host}${process.env.PREFIX}`)
    } else {
      const { host } = await ctx.$axios.$get('host.json')
      api.setBaseURL('/grade')
      process.env.TARGET = host
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export default defineNuxtPlugin(async (ctx: any, inject: any) => {
  const { $axios, $message, error: nuxtError, isDev } = ctx
  const api = $axios

  await getHost(api, ctx)

  api.onResponse((res: AxiosResponse) => {
    if (!(res.data instanceof Blob)) {
      const { data, code, msg } = res.data
      if (toNumber(code) === 200) {
        res.data = data
      } else {
        throw new Error(msg)
      }
    }
  })

  api.onError((error: any) => {
    process.client && $message.error(error.message)
    if (!isDev) {
      nuxtError({
        statusCode: error.response?.status || 0,
        message: error.message,
      })
    }
    // redirect('/error')
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })

  inject('globalApi', GlobalApi(api.$request))
})
