const common = require('./common/index')
const assetsAcquire = require('../assets-acquire/index')
class index {

  static async refund(totalFee,orderInfo) {
    const describe = "退款"
    const Res = await common.addBalance(totalFee,describe,orderInfo)
    return Res
  }

  static async refundToOpenID(totalFee,orderInfo,openID) {
    const describe = "退款"
    const Res = await common.addBalanceByOpenID(totalFee,describe,orderInfo,openID)
    return Res
  }


  static async withdraw(totalFee){
    const describe = "提现"
    const Res = await common.decBalance(totalFee,describe)
    return Res
  }

  static async income(totalFee){
    const describe = "接单收入"
    const Res = await common.addBalance(totalFee,describe)
    return Res
  }

  static async updateQRCode(){
    let res = await assetsAcquire.getQRInfo()
    console.log("身份码信息",res)
    //第一次上传身份码
    if(!res){
      await common.addQRCode()
      return
    }
    //更新身份码
    if(res){
      await common.addQRCode()
      return
    }
    return true

  }

}
module.exports = index