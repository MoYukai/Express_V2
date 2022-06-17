const mydb = require('../../db/index')
const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
const orderOperate = require('../../order-operate/index')
class index {


  static async getDelivery() {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      _openid: openId,
      status: 3
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }
}
module.exports = index