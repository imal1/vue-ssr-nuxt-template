async function getHost($http: any) {
  try {
    const { host } = await require('../../public/host.json')

    $http.setBaseURL(host)
  } catch (error) {
    throw new Error(error)
  }
}

export default async function ({ $http, $message }: any) {
  await getHost($http)

  $http.onResponse(async (_req: any, _options: any, res: any) => {
    switch (res.status) {
      case (500): {
        throw new Error('服务器错误')
      }
      case (404): {
        throw new Error('找不到服务器')
      }
      default: {
        const { code, msg } = await res.json()
        if (code.toString() !== '200') {
          process.client && $message.error(msg)
        }
      }
    }
  })

  $http.onError((error: any) => {
    process.client && $message.error(error.message)
    return {}
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
