const db = wx.cloud.database()
const _ = db.command
class index{

  static async delta_T(){
   const delta = await this.getEndTime() - await this.getStartTime() 
    const dayTime = delta/86400000
    const day = parseInt(dayTime)
    if(day === 0){
      day = 1
    }
    return day
  }

  static async getStartTime(){
    const a = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).get()
    return a.data[0].createTimestamp
  }

  static async getEndTime(){
    const a = await db.collection('user').where({
      _openid:wx.getStorageSync('openId')
    }).get()
    return a.data[0].updateTimestamp

  }


}
module.exports = index