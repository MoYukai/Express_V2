const { default: toast } = require('../miniprogram_npm/@vant/weapp/toast/toast')
const common = require('./common/index.js')
class index{
  static async check_coupon_code(code){
    return await common.check_coupon_code(code)
  }

  static async get_coupon_code(){
    return await common.get_coupon_code()
  }

  static async get_coupon_code_count(){
    return await common.get_coupon_code_count()
  }

  static async check(){
    return await common.check()
  }

  static async get(){
    return await common.get()
  }

  static async getTodayCount(){
    let {data} = await common.get()
    if(data.length > 1){
      toast('月卡异常')
      return false
    }
    if(data.length == 0){
      return 2
    }
    let ID = data[0]._id
    let data2 = await common.getToday(ID)
    return data2.data.length
  }

  static async getRemainDays(){
    let expiresTime = await common.getExpiresTime()
    expiresTime = new Date(expiresTime).getTime()
    let det = expiresTime - new Date().getTime()
    return parseInt(det / (60000*60*24)) 
  }

}

module.exports = index