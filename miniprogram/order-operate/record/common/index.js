const db = wx.cloud.database()
const _ = db.command

class index{

  static async addOrderRec(orderId,status){
     return await db.collection('order-record').add({
        data:{
          orderId,
          status:status[0],
          createTimestamp:db.serverDate()
        }
      })
  }

}
module.exports = index