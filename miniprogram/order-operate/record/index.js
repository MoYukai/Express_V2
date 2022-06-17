const common = require('./common/index.js')
class index{

  static async addRec(orderId,status){
    return await common.addOrderRec(orderId,status)
  }

}

module.exports = index