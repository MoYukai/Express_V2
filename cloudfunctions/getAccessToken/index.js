const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const publicAppid = "****"
const secret = "*****"

/** 每隔1小时获取接口调用权限Token */
exports.main = async () => {
  const url = "https://api.weixin.qq.com/cgi-bin/token"
  const paramObj = {
    grant_type: "client_credential",
    appid: publicAppid,
    secret: secret
  }
  const accessTokenObj = await requestFun(url, paramObj)
  console.log(accessTokenObj)
  const addres = await addAccessToken(accessTokenObj)
  console.log("===== 插入accessToken结果 =====", addres)
  return addres
}

/**
 * 发起网络请求
 * @param {object} paramObj 请求的参数对象
 */
const requestFun = (url, paramObj) => {
  // 请求数据
  const opt = {
    timeout: 5000, // 设置超时
    method: 'GET', //请求方式
    url: url,
    qs: paramObj
  }
  // 发起请求
  return new Promise((resolve, reject) => {
    request(opt, (error, response, data) => {
      resolve(JSON.parse(data))
    })
  })
}

/** 将token插入数据库 */
const addAccessToken = async (addObj) => {
  addObj = Object.assign(addObj, {
    createTime: new Date().getTime()
  })
  return await db.collection("AccessToken")
    .add({
      data: addObj
    })
}