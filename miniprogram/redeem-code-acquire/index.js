const common = require('./common/index')
class index{

  static async checkRedeemCode(RedeemCode){
    let list = await common.getRedeemCodeDetail(RedeemCode)
    if(list.length == 0){
      return false
    }
    if(list.length == 1){
      return list[0]
    }
  }

  static async getRedeemCode(){
    return await common.getRedeemCode()
  }
  static async getRedeemCodeHistory(){
    return await common.getRedeemCodeHistory()
  }
  static async getCount(){
    let {data} = await common.getRedeemCode()
    return data.length
  }
}
module.exports = index