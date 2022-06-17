const utils = require('../../utils/index')
const db = wx.cloud.database()
const _ = db.command
class index {
  static async useRedeemCode(code){
    return await db.collection('redeem-code').where({
      code
    }).update({
      data:{
      available : false,
      useTimestamp: db.serverDate()
      }

    })
  }

  static async getRedeemCode() {
    return await utils.redeem_code()
  }

  static async createRedeemCode(price){
    let code =await this.getRedeemCode()
   return await db.collection('redeem-code').add({
      data:{
        code,
        price,
        available:true,
        createTimestamp:db.serverDate()
      }
    })
  }

}
module.exports = index