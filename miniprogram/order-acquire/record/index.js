const common = require('./common/index.js')
class index{

 static async getOrderRec(orderId){
   let {data} = await common.getOrderRecByID(orderId)
   if(data.length == 0){
     return false
   }
   let last = data[0]
   return last.status.type ? last.status.type : false
  }

}
module.exports = index