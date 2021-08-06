// async function getHost($http: any) {
//   try {
//     const { code, msg, data } = await fetch(
//       'http://localhost:3000/host.json',
//       {
//         method: 'GET',
//         headers: {
//           'content-type': 'application/json',
//         },
//       }
//     ).then((res) => res.json())

//     if (code !== 200 || !data) {
//       throw new Error(msg || '未知错误')
//     }

//     $http.setBaseURL(data)
//   } catch (error) {
//     throw new Error(error)
//   }
// }

export default function ({ $http, $message }: any) {
  // await getHost($http)

  $http.onResponse(async (_req: any, _options: any, res: any) => {
    if (process.client) {
      const { code, msg } = await res.json()
      if (code.toString() !== '200') {
        $message.error(msg)
      }
    }
  })

  $http.onError((error: any) => {
    if (process.client && error.statusCode === 500) {
      $message.error('服务器错误')
    }
    // Tip: error.response will be undefined if the connection dropped to the server
    // Tip: You can use error.response.data to get response message
    // Tip: You can return an object or Promise as fallback response to avoid rejection
  })
}
