const utils = require('../../utils/index')
const db = wx.cloud.database()
const _ = db.command
class index{

  static async getRedeemCodeDetail(RedeemCode){

    let {data} = await db.collection('redeem-code').where({
      code:RedeemCode
    }).get()

    return data
  }

  static async getRedeemCode(){
   return await db.collection('redeem-code').where({
      _openid:wx.getStorageSync('openId'),
      available:true
    }).orderBy('createTimestamp','desc').get()

  }

  static async getRedeemCodeHistory(){
    return await db.collection('redeem-code').where({
       _openid:wx.getStorageSync('openId'),
       available:false
     }).orderBy('createTimestamp','desc').get()
 
   }
}
module.exports = index