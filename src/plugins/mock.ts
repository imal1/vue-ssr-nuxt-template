import Mock from 'better-mock'

export default function (ctx: any) {
  if (!process.env.MOCK) {
    return
  }
  const { baseURL } = ctx.$axios.defaults
  Mock.mock(`${baseURL}/menus/getMenus`, function () {
    return {
      code: 200,
      msg: "",
      data: [
        {
          name: 'RecordFill',
          index: '1'
        }
      ]
    }
  })
}
