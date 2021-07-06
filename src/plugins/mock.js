const Mock = require('mockjs');

Mock.mock("/api/getRoutes",{
  code: 200,
  msg: "",
  data: "http://localhost:7000"
})
