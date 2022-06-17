const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 订阅号事件触发函数
exports.main = async (event) => {

  const addRes = await addEevent(event)
  const docId = addRes._id
  event.docId = docId
  const msgType = event.MsgType
  const eventType = event.Event
  // 关注与取关事件
  if (eventType === "subscribe" || eventType === "unsubscribe") {
    const subAndUnsub = require("./subAndunSub/index")
    const subAndUnsubRes = await subAndUnsub.main(event)
    console.log("关注事件触发 =====>", subAndUnsubRes)
  }
  return {
    event
  }
}

/** 入库事件触发记录 */
const addEevent = async (event) => {
  const nowTime = new Date().getTime()
  const addObj = Object.assign(event, {
    createTime: nowTime,
    deleteTime: null,
    updateTime: nowTime,
    proStatus: "wait"
  })
  const addRes = await db.collection("publicEventList").add({
    data: addObj
  })
  return addRes
}