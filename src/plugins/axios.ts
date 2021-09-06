import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { AxiosResponse } from 'axios'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { toNumber } from "lodash"
import GlobalApi from '@/api/app'

async function getHost(api: NuxtAxiosInstance, $content: any) {
  try {
    const { host } = await $content('host').fetch()

    api.setBaseURL(`${host}${process.env.PREFIX}`)
  } catch (error: any) {
    throw new Error(error)
  }
}

export default defineNuxtPlugin(async (
  { $axios, $content, $message, error: nuxtError, isDev }: any,
  inject: any
) => {
  const api = $axios.create()

  await getHost(api, $content)

  api.onResponse((res: AxiosResponse) => {
    const { data, code, msg } = res.data
    if (toNumber(code) === 200) {
      res.data = data
    } else {
      throw new Error(msg)
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
