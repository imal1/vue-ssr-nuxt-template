async function getHost($http: any) {
  try {
    const { code, msg, data } = await fetch(
      'http://localhost:3000/host.json',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }
    ).then((res) => res.json())

    if (code !== 200 || !data) {
      throw new Error(msg || '未知错误')
    }

    $http.setBaseURL(data)
  } catch (error) {
    throw new Error(error)
  }
}

export default async function ({ $http }: any) {
  await getHost($http)
}
