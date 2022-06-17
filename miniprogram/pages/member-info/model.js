const db = wx.cloud.database()
const _ = db.command

class index {

  static async addMemberData(name, phone) {
    return await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).update({
      data: {
        memberData: {
          name,
          phone
        }
      }
    })
  }

  static async addExpressMan(name,phone,header){
    return await db.collection('express-man').add({
      data:{
        name,
        phone,
        header
      }
    })
  }

}
module.exports = index