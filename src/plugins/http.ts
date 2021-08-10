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
    if (process.client) {
      switch (res.status) {
        case (500): {
          throw new Error('服务器错误')
        }
        default: {
          const { code, msg } = await res.json()
          if (code.toString() !== '200') {
            $message.error(msg)
          }
        }
      }
    }
  })

  $http.onError((error: any) => {
    if (process.client && error.statusCode === 500) {
      $message.error('服务器错误')
    } else {
      $message.error(error.message)
    }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
