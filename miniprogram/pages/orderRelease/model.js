const db = wx.cloud.database()
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
const orderOperate = require('../../order-operate/index')
const couponOperate = require('../../coupon-operate/index')
const wxpay = require('../../pay/index')
class index {

  static async getAddress() {
    let { data } = await db.collection('user').where({
      "_openid": wx.getStorageSync('openId')
    }).get()
    if (data[0].userData.address) {
      let user = data[0].userData.address
      return user
    }
  }

  static async orderRelease(userAddress, code, poster, totalFee, type,originalFee) {
    if(totalFee != 0){
    if (type == "normal") {
      await wxpay.pay("代拿费用支付", totalFee)
      return await orderOperate.orderRelease(userAddress, code, poster, totalFee,originalFee)
    }
    if(type == "monthCard"){
      await wxpay.pay("买袋鼠月卡本单免费", totalFee)
      await couponOperate.add()
      return await orderOperate.orderRelease(userAddress, code, poster, 0,originalFee)
    }
    if (type == "freeCode") {
      await wxpay.pay("优惠码使用补差费用支付", totalFee)
      await couponOperate.cut_coupon_code()
      return await orderOperate.orderRelease(userAddress, code, poster, totalFee,originalFee)

    }
    }else{
      //判断是否存在
      if (type == "freeCode") {
        await couponOperate.cut_coupon_code()
        return await orderOperate.orderRelease(userAddress, code, poster, 0,originalFee)

      }
      await couponOperate.use()
      return await orderOperate.orderRelease(userAddress, code, poster, 0,originalFee)
    }



  }
}

module.exports = index