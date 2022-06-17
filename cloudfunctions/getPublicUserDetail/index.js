const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const url = "https://api.weixin.qq.com/cgi-bin/user/info"

/**
 * 根据openid获取用户的其他数据
 * 最重要的还是获取用户的unionid
 * */
exports.main = async (event) => {

  let triggerSource = "other"

  if (event.Type && event.Type == "timer") {
    triggerSource = "timer"
  }

  if (event.data && event.data.dataType && event.data.dataType === "insert") {
    triggerSource = "insert"
  }

  let openidList = []

  // 由定时触发器触发
  if (triggerSource === "timer") {
    const openidListObj = await getOpenidList(100)
    openidList = openidListObj.data
  }
  // 由底层数据库触发器触发
  else if (triggerSource === "insert") {
    const _id = event.data.docId // 公众号数据列表的docId
    const openid = event.data.doc.openid // 公众号数据列表的openid
    openidList.push({
      _id,
      openid
    })
  }
  // 其他触发（例如调用）仅作查询使用，不对数据进行修改
  else if (triggerSource === "other") {
    const _id = event.docId // 公众号数据列表的docId
    const openid = event.openid // 公众号数据列表的openid
    openidList.push({
      _id,
      openid
    })
  } else {
    return "触发类型有误", event
  }

  if (openidList.length <= 0) {
    return "无新用户需要获取数据"
  }

  const accessTokenObj = await getAccessToken()
  const accessToken = accessTokenObj.data[0].access_token
  let resList = []
  for (let i = 0; i < openidList.length; i++) {
    const paramPbj = {
      access_token: accessToken,
      openid: openidList[i].openid
    }
    const rqRes = await requestFun(url, paramPbj)

    // 仅仅查询
    if (triggerSource === "other") {
      return rqRes
    }

    // 删除未关注的数据
    if (rqRes.subscribe == 0) {
      removeData(openidList[i]._id)
      continue
    }

    const nowTime = new Date().getTime()
    const updateObj = Object.assign({
      updateTime: nowTime,
      isGet: true
    }, rqRes)
    updateUserData(openidList[i]._id, updateObj)
    resList.push(rqRes)
  }
  return resList
}

/**
 * 获取未曾获取过详细信息的openidList
 * @param {number} limit 获取的条数,默认10条
 */
const getOpenidList = async (limit = 10) => {
  return await db.collection("publicUserList")
    .where({
      isGet: false,
    })
    .limit(limit)
    .skip(0)
    .get()
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
 * 更新订阅号用户数据
 * 
 * */
const updateUserData = (docId, updateObj) => {
  db.collection("publicUserList").doc(docId).update({
    data: updateObj
  })
}

/**
 * 删除数据 
 * 
 * */
const removeData = (docId) => {
  db.collection('publicUserList').doc(docId).remove()
}