const db = wx.cloud.database()
const _ = db.command
class index {

  static async getMemberData() {
    let {data} = await db.collection('user').where({
      _openid: wx.getStorageSync('openId')
    }).get()
    console.log(data)
    return data[0].memberData
  }

  static async takeTime(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(true)
      },1000)
    })
  }

  static async checkOrderStatus(){
    
  }
}
module.exports = index