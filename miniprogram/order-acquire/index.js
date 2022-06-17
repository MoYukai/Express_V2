const common = require('./common/index')

class index {

  /**
   * 获取自己的订单
   * @param {Number} a 第一个状态
   * @param {Number} b 第二个状态
   */
  static async getOrderByStatus(a, b) {
    if (arguments.length == 1) {
      return await common.getOrderByOneStatus(a)
    } else if (arguments.length == 2) {
      return await common.getOrderByDoubleStatus(a, b)
    } else {
      return 0
    }
  }

  /**
   * 获取除自己外的全部订单
   * @param {Number} a 第一个状态
   * @param {Number} b 第二个状态
   */
  static async getOtherOrderByStatus(a, b) {
    if (arguments.length == 1) {
      return await common.getOtherOrderByOneStatus(a)
    } else if (arguments.length == 2) {
      return await common.getOtherOrderByDoubleStatus(a, b)
    } else {
      return 0
    }
  }
  /**
   * 接单侧 获取取货中的订单
   */
  static async getOrderPicking() {
    return await common.getOrderPicking()
  }
  /**
   * 接单侧 获取配送中的订单
   */
  static async getOrderDelivering() {
    return await common.getOrderDelivering()
  }

  /**
   * 接单侧 获取完成的订单
   */
  static async getOrderCompleted(){
    return await common.getOrderCompleted()
  }

  /**
   * 用户 获取订单进度TAB小红点
   */
  static async getOrderTabDot() {
    const A = await this.getOrderByStatus(1, 2)
    const B = await this.getOrderByStatus(3)
    const C = await this.getOrderByStatus(4)
    const D = await this.getOrderByStatus(-2)
    return [A.data.length, B.data.length, C.data.length, D.data.length]
  }

  /**
   * 获取接单页面 TAB小红点
   */

  static async getMemberTabDot(){
    const B = await this.getOrderPicking()
    const C = await this.getOrderDelivering()
    const D = await this.getOrderCompleted()
    return [0, B.data.length, C.data.length, D.data.length]
  }

  /**
   * 根据订单ID获取该订单原先价值量
   * @param {String} id 
   */
  static async getOrderPriceById(id){
      let order = await common.getOrderById(id)
      let totalFee = order.data.originalFee
      return totalFee
  }

  /**
   * 根据订单ID获取该订单真实付款数额
   * @param {String} id 
   */
  static async getOrderRealPriceById(id){
    let order = await common.getOrderById(id)
    let totalFee = order.data.totalFee
    return totalFee
  }

  /**
   * 根据订单ID获取发布该订单的openID
   * @param {String} id 
   */
  static async getOpenIdByOrderId(id){
    let order = await common.getOrderById(id)
    let openId = order.data._openid
    return openId
  }

  /**
   * 根据订单ID获取订单数据
   * @param {String} id 
   */
  static async getOrderById(id){
    let order = await common.getOrderById(id)
    return order.data
  }

  /**
   * 获取订单数
   */
  static async getTodayAllOrderCount(){
    return await common.getTodayAllOrderCountByStatus()
  }
  static async getTodayProcessingOrderCount(){
    return await common.getTodayAllOrderCountByStatus(2,3)
  }
  static async getTodayDoneOrderCount(){
    return await common.getTodayAllOrderCountByStatus(4)
  }
  static async getTodayErrorOrderCount(){
    return await common.getTodayAllOrderCountByStatus(-3)
  }
  static async getTodayWaitingOrderCount(){
    return await common.getTodayAllOrderCountByStatus(1)
  }

  /**
   * 管理端数据接口如下
   */

   /**
    * 获取管理端 订单
    */
   static async adminGetOrder(status1,status2){
     
     if(arguments.length === 0){
      return await common.getTodayAllOrderByOneStatus()
     }
     if(arguments.length === 1){
      return await common.getTodayAllOrderByOneStatus(status1)
     }
     if(arguments.length === 2){
      return await common.getTodayAllOrderByDoubleStatus(status1,status2)
     }

   }

  /**
    * @param {状态1} status1 
    * @param {当前页} nowPage 
    * @param {每页条目数} pageSize 
    */
   static async adminGetOrderStatusOneSP(status1,nowPage,pageSize){
     return await common.getTodayAllOrderByOneStatusSP(status1,nowPage,pageSize)
  }

    /**
     * 云函数获取
    * @param {状态1} status1 
    * @param {当前页} nowPage 
    * @param {每页条目数} pageSize 
    */
   static async adminGetOrderStatusOneSPCloud(status1,nowPage,pageSize){
    return await common.getTodayAllOrderByOneStatusSPCloud(status1,nowPage,pageSize)
 }

    /**
    * @param {状态1} status1 
    * @param {状态2} status2
    * @param {当前页} nowPage 
    * @param {每页条目数} pageSize 
    */
   static async adminGetOrderStatusTwoSP(status1,status2,nowPage,pageSize){
    return await common.getTodayAllOrderByTwoStatusSP(status1,status2,nowPage,pageSize)
 }

  /**
    * 云函数获取
    * @param {状态1} status1 
    * @param {状态2} status2
    * @param {当前页} nowPage 
    * @param {每页条目数} pageSize 
    */
   static async adminGetOrderStatusTwoSPCloud(status1,status2,nowPage,pageSize){
    return await common.getTodayAllOrderByTwoStatusSPCloud(status1,status2,nowPage,pageSize)
 }

}
module.exports = index