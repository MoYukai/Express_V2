const orderAcquire = require('../../../../order-acquire/index')
class index{

  static async getOrderList(){
    let res = await orderAcquire.getOrderByStatus(-2,-3)
    return res
  }
}
module.exports = index