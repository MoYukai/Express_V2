const db = wx.cloud.database()
const _ = db.command
const utils = require("../../utils/index")
class index{

  static async checkUserInfo(){
    let {data} = await db.collection('user').where({
      _openid : wx.getStorageSync('openId')
    }).get()

    let userInfo = data[0].userInfo
    if(!userInfo){
      return false
    }
    if(userInfo){
      return true
    }
  }

  static async addUserInfo(userInfo){
    let res = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).update({
       data:{
         userInfo:{
           data:userInfo,
           createTimestamp : db.serverDate()
         }
       }
     })
     return res
  }

  static async updateUserInfo(userInfo){
    let res = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).update({
       data:{
         userInfo:{
           data:userInfo,
           updateTimestamp : db.serverDate()
         }
       }
     })
     return res
  }

}

module.exports = index