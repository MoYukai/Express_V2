const common = require('./common/index')
class index{
  //管理员角色
  static async useRedeemCode(RedeemCode){
    let res = await common.useRedeemCode(RedeemCode)
    if(res.stats.updated >=1 ){
      return true
    }else{
      return false
    }
  }

  //用户角色
  static async createRedeemCode(price){
    return await common.createRedeemCode(price)
  }

}
module.exports = index