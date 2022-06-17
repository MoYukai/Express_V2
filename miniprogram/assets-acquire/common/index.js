const db = wx.cloud.database()
const _ = db.command
class index {

  static async getAddress() {
    let {data} = await db.collection('user').where({
      "_openid" : wx.getStorageSync('openId')
    }).get()
    if(!data[0]){
      return false
    }
    if(!data[0].userData){
      return false
    }
    if(data[0].userData.address){
      let user = data[0].userData.address
      return user
    }
  }

  static async getTotalBalance() {
    const {data} = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).get()
    // if(!data[0]){
    //   return false
    // }
    return(data[0].userAssets)
  }

  static async getQRCode(){
    const {data} = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).get()
    if(!data[0]){
      console.log("当前没有身份码")
      return false
    }
    if(!data[0].userAssets){
      console.log("当前没有身份码")
      return false
    }
    if(!data[0].userAssets.QRCode){
      console.log("当前没有身份码")
      return false
    }
    return(data[0].userAssets.QRCode)
  }

  static async getAddressByOpenId(openid){
    let {data} = await db.collection('user').where({
      "_openid" : openid
    }).get()
    if(!data[0]){
      return false
    }
    if(!data[0].userData){
      return false
    }
    if(data[0].userData.address){
      let user = data[0].userData.address
      return user
    }
  }

  static async getBillsHistoryOfMine(){
    let user = await db.collection('user').where({
      _openid : wx.getStorageSync('openId')
    }).get()

    let bills = user.data[0].userAssets.record
    return bills
  }

}
module.exports = index