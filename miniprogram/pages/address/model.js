const db = wx.cloud.database()
const _ = db.command
class index {
  static async sendSms(phone, code) {
    return await wx.cloud.callFunction({
      name: 'functions',
      data: {
        type: 'sms',
        phone,
        code
      }
    })
  }

  static async saveAddress(user) {
    console.log(user)
    let res = await db.collection('user').where({
      "_openid": wx.getStorageSync('openId')
    }).update({
      data: {
        'userData.address': user
      }
    })
    console.log(res)
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
}
module.exports = index