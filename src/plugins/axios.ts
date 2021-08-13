import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { AxiosResponse } from 'axios'
import { toNumber } from "lodash"

async function getHost($axios: NuxtAxiosInstance) {
  try {
    const { host } = await $axios.$get('../host.json')

    $axios.setBaseURL(`${host}${process.env.PREFIX}`)
  } catch (error) {
    throw new Error(error)
  }
}

export default async function ({ $axios, $message, redirect, error: nuxtError }: any) {
  await getHost($axios)

  $axios.onResponse((res: AxiosResponse) => {
    const { data, code, msg } = res.data
    if (toNumber(code) === 200) {
      res.data = data
    } else {
      throw new Error(msg)
    }
  })

  $axios.onError((error: any) => {
    process.client && $message.error(error.message)
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    })
    redirect('/error')
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
