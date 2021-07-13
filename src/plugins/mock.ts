const Mock = require('mockjs');

Mock.mock("/api/getRoutes",{
  code: 200,
  msg: "",
  data: [
    {
      name: '123',
      path: '/123/456'
    }
  ]
})
