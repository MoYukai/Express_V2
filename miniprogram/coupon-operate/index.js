const { default: toast } = require('../miniprogram_npm/@vant/weapp/toast/toast')
const common = require('./common/index')

class index{


  static async add(price){
    return await common.add(price)
  }

  static async use(){
    return await common.use()
  }

  static async new_coupon_code(){
    return await common.coupon_code()
  }

  static async use_coupon_code(code){
    return await common.use_coupon_code(code)
  }
  static async add_coupon_code(code){
    let mycount = await common.get_uid_today_coupon_count(wx.getStorageSync('openId'))
    console.log(mycount)
    return await common.add_coupon_code(code)
  }

  static async cut_coupon_code(){
    return await common.cut_coupon_code()
  }

  static async add_coupon_code_to_user(openid,code){
    if(openid == wx.getStorageSync('openId')){
      return false
    }
    //查看领取uid下用户今日领取到的优惠码数（有效的）
    let shecount  =  await common.get_uid_today_coupon_count(openid)
    console.log("对方今日兑换的优惠券",shecount)
    if(shecount > 6){
      return false
    }
    return await common.add_coupon_code_to_user(openid,code)
  }

  static async get_uid_today_coupon_count(openid){
    return await common.get_uid_today_coupon_count(openid)
  }

}
module.exports = index