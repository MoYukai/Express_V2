const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/**
 * 获取公众号的openid列表
 */
exports.main = async () => {
  const accessTokenObj = await getAccessToken()
  const accessToken = accessTokenObj.data[0].access_token
  const nextOpenidObj = await getOpenidList(accessToken)
  return nextOpenidObj
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

/**
 * 从数据库获取accessToken 
 */
const getAccessToken = async () => {
  return await db.collection("AccessToken")
    .where({})
    .orderBy('createTime', 'desc')
    .limit(1)
    .get()
}

/**
 * 将获取到的服务号openid数据插入数据库
 */
const addOpenid = async (addObj) => {
  await db.collection("publicUserList").add({
    data: addObj
  })
}

/** 
 * 从数据库拿到最后一个openid
 * 用于更新每日新增的关注用户数据
 * */
const getNextOpenid = async () => {
  return await db.collection("publicUserList")
    .where({})
    .orderBy('createTime', 'desc')
    .limit(1)
    .get()
}

/** 
 * 执行获取新的openid函数
 * 每日执行一次，每次最多更新1300条
 * @param {string} accessToken 接口申请Token
 * */
const getOpenidList = async (accessToken) => {
  const nextOpenidObj = await getNextOpenid()
  let nextOpenid = ""
  if (nextOpenidObj.data.length >= 1) {
    nextOpenid = nextOpenidObj.data[0].openid
  }
  const url = "https://api.weixin.qq.com/cgi-bin/user/get"
  const paramObj = {
    access_token: accessToken,
    next_openid: nextOpenid
  }
  const resultObj = await requestFun(url, paramObj)
  if (resultObj.count === 0) {
    return "无需要获取的新用户"
  }
  const openidArray = resultObj.data.openid
  let num = 0
  if (openidArray.length > 1000) {
    num = 1000
  } else {
    num = openidArray.length
  }
  for (let i = 0; i < num; i++) {
    const nowTime = new Date().getTime()
    const addObj = {
      openid: openidArray[i],
      isGet: false,
      createTime: nowTime,
      updateTime: nowTime,
      deleteTime: null
    }
    await addOpenid(addObj)
  }
  return {nextOpenid:openidArray[num-1], resultObj:resultObj}
}