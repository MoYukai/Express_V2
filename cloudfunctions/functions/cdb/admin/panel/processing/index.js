const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const utils = require('../../../../utils/index')

exports.main = async (event, context) => {
  const querys = event.querys
  if(querys.status.length === 1){
    let res = await db.collection('order').aggregate().sort({
      createTimestamp: -1
    }).lookup({
      from: "user",
      localField: "pickerData._openid",
      foreignField: "_openid",
      as: "pickerDataLookUp"
    }).lookup({
      from: "user",
      localField: "_openid",
      foreignField: "_openid",
      as: "userDataLookUp"
    }).match({
      createTimestamp: _.lte(new Date(querys.todayEnd)).and(_.gte(new Date(querys.todayStart))),
      status_code: _.eq(querys.status[0])
    }).skip((querys.nowPage - 1) * querys.pageSize)
    .limit(querys.pageSize).end()
    return res.list
  }
  if(querys.status.length === 2){
    let res = await db.collection('order').aggregate().sort({
      createTimestamp: -1
    }).lookup({
      from: "user",
      localField: "pickerData._openid",
      foreignField: "_openid",
      as: "pickerDataLookUp"
    }).lookup({
      from: "user",
      localField: "_openid",
      foreignField: "_openid",
      as: "userDataLookUp"
    }).match({
      createTimestamp: _.lte(new Date(querys.todayEnd)).and(_.gte(new Date(querys.todayStart))),
      status_code: _.eq(querys.status[0]).or(_.eq(querys.status[1]))
    }).skip((querys.nowPage - 1) * querys.pageSize)
    .limit(querys.pageSize).end()
    return res.list
  }


}