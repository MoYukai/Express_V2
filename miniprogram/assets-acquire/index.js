const common = require('./common/index')
class index {

  static async getTotalBalance() {
    const res = await common.getTotalBalance()
    return res
  }
  static async getTotalBalanceToFixed() {
    let res = await common.getTotalBalance()
    if(!res){
      return (0).toFixed(2)
    }
    if(res.balance){
      res = res.balance * 0.01
      res = res.toFixed(2)
      return res
    }
    return (0).toFixed(2)
  }
  
  // 获取用户资产中身份码的信息
  static async getQRInfo(){
    return await common.getQRCode()
  }
  //检查用户资产中身份码是否过期
  static async checkQRInfo(){
    let res = await common.getQRCode()
    if(!res){
      return 0
    }
    let codeTime = new Date(res.updateTimestamp).getTime()
    let expiresTime = codeTime + (1000*60*25)
    if(new Date().getTime() > expiresTime){
      console.log("身份码已经过期")
      return -1
    }else{
      console.log("身份码未过期")
      return 1
    }
  }

  static async getAddress(){
    return await common.getAddress()
  }

  static async getAddressByOpenId(openID){
    return await common.getAddressByOpenId(openID)
  }

  static async getBillsHistory(){
    return await common.getBillsHistoryOfMine()
  }


}
module.exports = index