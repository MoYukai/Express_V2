const db = wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
const until = require('../../utils/index.js')
const couponAcquire = require('../../coupon-acquire/index.js')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast.js')
class index {

  static async check_coupon_code(code){
    let res = await db.collection('coupon-code').where({
      code
    }).get()
    return res.data.length
  }

  static async get_coupon_code(){
    let res = await db.collection('coupon-code').where({
      owner:wx.getStorageSync('openId'),
      avaliable:true
    }).get()
    return res
  }

  static async get_coupon_code_count(){
    let res = await db.collection('coupon-code').where({
      owner:wx.getStorageSync('openId'),
      avaliable:true
    }).count()
    return res
  }

  static async check(){
    const { data } = await this.get()
    console.log(data.length)
    if (data.length >= 1) {
      toast('请不要重复购买')
      return false
    }
    return true
  }

  static async get() {
    let startTime = until.getTodayStartTime()
    let endTime = until.getTodayEndTime()
    let res = await db.collection('coupon').where({
      _openid: wx.getStorageSync('openId'),
      createTimestamp: _.lte(db.serverDate()),
      expiresTimestamp: _.gte(db.serverDate())
    }).get()
    return res
  }

  static async getToday(ID) {
    let startTime = await until.getTodayStartTime()
    let endTime = await until.getTodayEndTime()
    console.log(startTime)
    console.log(endTime)
    return await db.collection('coupon-record').where({
      detail: {
        _id: ID,
        createTimestamp: _.lte(db.serverDate()),
        expiresTimestamp: _.gte(db.serverDate())
      },
      usageTime: _.lte(new Date(endTime)).and(_.gte(new Date(startTime)))
    }).get()
  }

  static async getExpiresTime() {
    let { data } = await this.get()
    if (data.length > 0) {
      let expiresTimestamp = data[0].expiresTimestamp
      return expiresTimestamp
    }

  }
}
module.exports = index