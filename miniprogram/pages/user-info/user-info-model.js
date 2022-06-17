const db = wx.cloud.database()
const _ = db.command
class index{

  static async getAddress() {
    let {data} = await db.collection('user').where({
      "_openid" : wx.getStorageSync('openId')
    }).get()
    if(data[0].userData){
      let user = data[0].userData.address
      return user
    }else{
      return false
    }
  }

}
module.exports = index