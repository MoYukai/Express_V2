const db = wx.cloud.database()
const _ = db.command
class index{

  static async collection(dbName,query,nowPage,pageSize,orderByWho,order){
   return await db.collection(dbName).where(query).skip(pageSize*(nowPage-1)).limit(pageSize).orderBy(orderByWho,order).get()
  }

}
module.exports = index