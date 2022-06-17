const db = wx.cloud.database()
const _ = db.command
const utils = require("../../utils/index")
class index {
  static async getUserOrderCount(){
    let res = await db.collection('order').where({
      _openid:wx.getStorageSync('openId'),
      status_code:_.gte(0)
    }).count()
    return res.total
  }

  static async getUserCount() {
    return await db.collection('user').count()
  }

  static async getTodayUserCount() {
    let todayStart = new Date(await utils.getTodayStartTime())
    let todayEnd = new Date(await utils.getTodayEndTime())
    console.log(todayEnd)
    console.log(todayStart)
    return await db.collection('user').where({
      createTimestamp: _.gte(todayStart).and(_.lte(todayEnd))
    }).count()
  }

  static async getAllUser(pageIndex, pageSize) {
    return await db.collection('user')
      .orderBy('createTimestamp', 'desc')
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .get()
  }

}

module.exports = index