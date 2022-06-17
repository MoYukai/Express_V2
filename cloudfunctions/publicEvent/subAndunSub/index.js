const cloud = require('wx-server-sdk')
const request = require('request')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/**
 * 关注事件触发后执行的逻辑（关注公众号以及取消关注公众号）
 * 关注：入库关注数据库,新增关注关系
 * 取关：删除原有的关注关系
 */

exports.main = async (event) => {
  const docId = event.docId // 获取需要处理的文档Id
  const openid = event.FromUserName // 触发事件的用户公众号内的openid
  const eventType = event.Event
  const nowTime = new Date().getTime()
  let resList = []

  // 关注事件
  if (eventType === "subscribe") {
    // 新增至关注列表
    const addRes = await addPublicUser(openid)
    resList.push({
      msg: "新增关注用户入库",
      res: addRes
    })
    // 获取accessToken
    // const accessTokenObj = await getAccessToken()
    // let accessToken = null
    // if (accessTokenObj.data.length <= 0) {
    //   resList.push({
    //     msg: "获取accessToken失败",
    //     res: accessTokenObj
    //   })
    // } else {
    //   accessToken = accessTokenObj.data[0].access_token
    // }

    // }
    // // 下发消息
    // for (let i = 0; i < autoContentObj.data.length; i++) {
    //   const sendRes = await sendSubAutoRsp(openid, accessToken, autoContentObj.data[i].content)
    //   resList.push({
    //     msg: "下发关注回复结果",
    //     res: sendRes
    //   })
    // }
  }

  // 取消关注事件
  if (eventType === "unsubscribe") {
    const subDataObj = await getPublicUser(openid)
    const len = subDataObj.data.length
    if (len <= 0) {
      resList.push({
        msg: "未找到取关用户数据",
        res: subDataObj.data.length
      })
    }
    for (let i = 0; i < len; i++) {
      const _id = subDataObj.data[i]._id
      const removeRes = await removePublicUser(_id)
      resList.push({
        msg: "取消关注执行逻辑结果",
        res: removeRes
      })
    }

  }

  // 更新文档处理状态
  const updateEventRes = await updateEventList(docId, {
    updateTime: nowTime,
    proStatus: "success",
    msgData: resList
  })
  return {
    msg: "关注事件处理",
    res: resList
  }
}

/** 更新需要处理的事件处理文档状态 */
const updateEventList = async (docId, updateObj) => {
  return await db.collection("publicEventList").doc(docId).update({
    data: updateObj
  })
}

/** 移除关注 */
const removePublicUser = async (docId) => {
  return await db.collection("publicUserList").doc(docId).remove()
}

/** 新增关注 */
const addPublicUser = async (openid) => {
  const nowTime = new Date().getTime()
  return await db.collection("publicUserList").add({
    data: {
      openid,
      createTime: nowTime,
      updateTime: nowTime,
      deleteTime: null,
      isGet: false
    }
  })
}

/** 
 * 根据公众号openid获取关注的数据列表
 * @param {string} openid 用户公众号内的openid
 */
const getPublicUser = async (openid) => {
  return await db.collection("publicUserList").where({
    openid
  }).get()
}

/** 
 * 下发关注自动回复消息(目前仅支持文本)
 * @param {string} openid 接收者openid
 * @param {string} accessToken 公众号的accessToken
 * @param {string} textContent 下发的消息文本
 * */
const sendSubAutoRsp = async (openid, accessToken, textContent) => {
  const access_token = accessToken
  const url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + access_token
  const paramObj = {
    "touser": openid,
    "msgtype": "text",
    "text": {
      "content": textContent
    }
  }
  return await requestFun(url, paramObj)
}

/** 获取自动回复文本 */
const getAutoText = async () => {
  return await db.collection("publicAutoResponse")
    .where({
      triggerType: "subRsp",
      msgType: "text",
      isUse: "yes"
    })
    .orderBy("updateTime", "desc")
    .skip(0)
    .limit(3)
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
    method: 'POST', //请求方式
    url: url,
    json: paramObj
  }
  // 发起请求
  return new Promise((resolve, reject) => {
    request(opt, (error, response, data) => {
      resolve(data)
    })
  })
}

/** 获取accessToken */
const getAccessToken = async () => {
  return await db.collection("AccessToken")
    .where({})
    .orderBy("createTime", "desc")
    .skip(0)
    .limit(1)
    .get()
}