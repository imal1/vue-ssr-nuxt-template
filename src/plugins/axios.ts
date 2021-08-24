import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { AxiosResponse } from 'axios'
import { toNumber } from "lodash"

async function getHost(api: NuxtAxiosInstance, $axios: NuxtAxiosInstance) {
  try {
    const { host } = await $axios.$get('../host.json')

    api.setBaseURL(`${host}${process.env.PREFIX}`)
  } catch (error) {
    throw new Error(error)
  }
}

export default async function (
  { $axios, $message, error: nuxtError, isDev }: any,
  inject: any
) {
  const api = $axios.create()

  await getHost(api, $axios)

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

  inject('api', api)
}
