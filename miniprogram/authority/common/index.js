const db = wx.cloud.database()
const _ = db.command
class index{

  static async getAdmin(){
   return await db.collection('admin').where({
      _openid:wx.getStorageSync('openId')
    }).get()

  }


}
module.exports = index