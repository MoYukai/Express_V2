const mydb = require('../../db/index')
const db = wx.cloud.database()
const $ = db.command.aggregate
const _ = db.command
const utils = require('../../utils/index')
const cdb = require('../../cdb/index')
class index {

  /**
   * 获取自己订单
   * @param {Number} status 
   */
  static async getOrderByOneStatus(status) {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      _openid: openId,
      status_code: _.eq(status)
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }

  /**
   * 获取自己订单
   * @param {Number} status1 
   * @param {Number} status2 
   */
  static async getOrderByDoubleStatus(status1, status2) {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      _openid: openId,
      status_code: _.eq(status1).or(_.eq(status2))
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }


  /**
   * 获取其他人的订单
   * @param {Number} status 
   */
  static async getOtherOrderByOneStatus(status) {
    const openId = await wx.getStorageSync('openId')
    let res = await cdb.get('order',{
      _openid:_.neq(openId),
      status_code:status
    },"createTimestamp","desc")
    res = res.result.res
    return res
  }

  /**
   * 获取其他人订单
   * @param {Number} status1 
   * @param {Number} status2 
   */
  static async getOtherOrderByDoubleStatus(status1, status2) {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      _openid: _.neq(openId),
      status_code: _.eq(status1).or(_.eq(status2))
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }

  /**
   * 接单侧 获取我接的订单 取货中
   */
  static async getOrderPicking() {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      status_code: 2,
      pickerData: {
        _openid: openId
      }
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }

  /**
   * 接单侧 获取我接的订单 配送中
   */
  static async getOrderDelivering() {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      status_code: 3,
      pickerData: {
        _openid: openId
      }
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }
  /**
   * 接单侧 获取我接的订单 完成
   */
  static async getOrderCompleted() {
    const openId = wx.getStorageSync('openId')
    let res = await mydb.collection('order', {
      status_code: _.eq(4),
      pickerData: {
        _openid: openId
      }
    }, 1, 20, 'createTimestamp', 'desc')
    return res
  }

  static async getOrderById(id) {
    let order = await db.collection("order").doc(id).get()
    return order
  }

  //管理员身份 获取今日订单数量通过状态码
  static async getTodayAllOrderCountByStatus(status,status2) {
    const todayStart = await utils.getTodayStartTime()
    const todayEnd = await utils.getTodayEndTime()
    console.log("参数",arguments.length)
    //无状态码，即获取今日全部订单
    if (arguments.length === 0) {
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart)))
      }).count()
      return res
    }
    if(arguments.length === 1){
      console.log("h",status)
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:status
      }).count()
      return res
    }
    if(arguments.length === 2 ){
      console.log("进行中")
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:_.eq(status).or(_.eq(status2))
      }).count()
      return res
    }

  }

    /**
     * 通过状态1获取今日订单
     */
    static async getTodayAllOrderByOneStatus(status1){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:status1
      }).orderBy('createTimestamp','desc').get()
      return res.data
      
    }

    /**
     * 通过状态1获取今日订单 -- 带分页
     */
    static async getTodayAllOrderByOneStatusSP(status1,nowPage,pageSize){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()

      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:status1
      }).orderBy('createTimestamp','desc').skip(pageSize*(nowPage-1)).limit(pageSize).get()
      return res.data
    }

    /** 
     * 【云函数】通过状态1获取今日订单 -- 带分页
     */
    static async getTodayAllOrderByOneStatusSPCloud(status1,nowPage,pageSize){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()
      let res = await wx.cloud.callFunction({
        name:'functions',
        data:{
          type:'adminPanelProcessing',
          querys:{
            todayStart,
            todayEnd,
            status:[
              status1
          ],
            nowPage,
            pageSize
          }
        }
      })
      return res.result
    }

    /**
     * 通过状态 1,2 获取今日订单 -- 带分页
     */
    static async getTodayAllOrderByTwoStatusSP(status1,status2,nowPage,pageSize){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:_.eq(status1).or(_.eq(status2))
      }).orderBy('createTimestamp','desc').skip(pageSize*(nowPage-1)).limit(pageSize).get()
      return res.data
    }

    /**
     * [云函数]通过状态 1,2 获取今日订单 -- 带分页
     */
    static async getTodayAllOrderByTwoStatusSPCloud(status1,status2,nowPage,pageSize){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()
      let res = await wx.cloud.callFunction({
        name:'functions',
        data:{
          type:'adminPanelProcessing',
          querys:{
            todayStart,
            todayEnd,
            status:[
              status1,
              status2,
          ],
            nowPage,
            pageSize
          }
        }
      })
      console.log("OOOL",res.result)
      return res.result
      
    }

    /**
     * 通过状态1,2获取今日订单
     */
    static async getTodayAllOrderByDoubleStatus(status1,status2){
      const todayStart = await utils.getTodayStartTime()
      const todayEnd = await utils.getTodayEndTime()
      let res = await db.collection('order').where({
        createTimestamp: _.lte(new Date(todayEnd)).and(_.gte(new Date(todayStart))),
        status_code:_.eq(status1).or(_.eq(status2))
      }).get()
      return res.data
    }

}
module.exports = index