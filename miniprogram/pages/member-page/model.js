const db = wx.cloud.database()
const _ = db.command
const mydb = require('../../db/index')
class index{

  static async getIDCode(openid){
    let {data} = await db.collection('user').where({
      "_openid":openid
    }).get()
    return data[0].userAssets.QRCode
  }
  
  static async getAddress() {
    let {data} = await db.collection('user').where({
      "_openid" : wx.getStorageSync('openId')
    }).get()
    if(!data[0].userData){
      return false
    }
    if(data[0].userData.address){
      let user = data[0].userData.address
      return user
    }
  }

  static async getMemberData(){
    return await mydb.collection('user',{
      _openid:wx.getStorageSync('openId')
    },1,20,'createTimestamp','desc')
  }

  static async picking(memberData,orderId){
    return await db.collection('order').doc(orderId).update({
      data:{
        status:2,
        pickerData:{
          _openid:wx.getStorageSync('openId'),
          memberData
        }
      }
    })
  }

  static async delivery(orderId){
    return await db.collection('order').doc(orderId).update({
      data:{
        status:3
      }
    })
  }

  static async done(orderId){
    return await db.collection('order').doc(orderId).update({
      data:{
        status:4
      }
    })
  }

//临时储存
  async delivery(){
    Toast.loading({
      message: '取货中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    let res = await this.delivery(this.data.nowOrderId)
      console.log(res)
      Toast('接单成功')
      this.onShow()
  }
  async done(){
    Toast.loading({
      message: '送达中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    let res = await model.done(this.data.nowOrderId)
      console.log(res)
      Toast('接单成功')
      this.onShow()
  }
}
module.exports = index