const db = wx.cloud.database()
const _ = db.command
class index{
  
  static async getOrderRecByID(orderId){
    return await db.collection('order-record').where({
      orderId
    }).orderBy('createTimestamp','desc').get()
  }

}
module.exports = index