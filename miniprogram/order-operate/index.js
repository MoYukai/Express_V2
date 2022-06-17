const db = wx.cloud.database()
const _ = db.command
const common = require('./common/index')
const assetsOperate = require('../assets-operate/index')
const orderAcquire = require('../order-acquire/index')
const orderRecOperate = require('./record/index')
const orderRecAcquire = require('../order-acquire/record/index')
const { default: toast } = require('../miniprogram_npm/@vant/weapp/toast/toast')
const vms = require('../utils/vms/index')
class index {


  /**
   * 
   * @param {Number} orderId 订单唯一_id
   * @param {String} reason 取消订单的原因
   */
  static async orderCancel(orderId, reason) {
    let rec = await orderRecAcquire.getOrderRec(orderId)
    console.log(rec)
    if(rec == "cancel"){
      return false
    }
    let status = [{
      type: 'cancel',
      operator: wx.getStorageSync('openId'),
      description: '用户取消订单',
      reason,
      timestamp: db.serverDate()
    }]
    let updateRes = await db.collection('order').doc(orderId).update({
      data: {
        status: _.push(status),
        status_code: -2
      }
    })

    await orderRecOperate.addRec(orderId,status)

    if (updateRes.errMsg == 'document.update:ok') {
      return true
    }
    return false
  }

  /**
   * 
   * @param {Object} userAddress 用户地址（发单人）
   * @param {String} code 取件码
   * @param {String} poster 驿站
   */
  static async orderRelease(userAddress, code, poster,totalFee,originalFee) {
    let status = [{
      type: 'waitting',
      operator: wx.getStorageSync('openId'),
      description: '用户发布订单',
      timestamp: db.serverDate()
    }]

    let writeRes = await db.collection('order').add({
      data: {
        code,
        poster,
        userAddress,
        createTimestamp: db.serverDate(),
        status,
        status_code: 1,
        totalFee,
        originalFee
      }
    })
    if (writeRes.errMsg == 'collection.add:ok') {
      return true
    }
    return false
  }

  /**
   * 会员取消接单
   * @param {Number} orderId 
   * @param {Object} reason
   */
  static async pickerCancel(orderId,reason){
    let rec = await orderRecAcquire.getOrderRec(orderId)
    console.log(rec)
    if(rec == "picker_cancel"){
      return false
    }
    let status = [{
      type: 'picker_cancel',
      operator: wx.getStorageSync('openId'),
      description: '快递员取消接单',
      reason,
      timestamp: db.serverDate()
    }]

    let updateRes = await db.collection('order').doc(orderId).update({
      data:{
        status: _.push(status),
        status_code: -3,
        pickerData:{
          _openid:wx.getStorageSync('openId'),
        }
      }
    })
    if (updateRes.errMsg == 'document.update:ok') {
      let openid = await orderAcquire.getOpenIdByOrderId(orderId)
      let realPrice = await orderAcquire.getOrderRealPriceById(orderId)
      let order = await orderAcquire.getOrderById(orderId)
      await assetsOperate.refundToOpenID(realPrice,order,openid)//doing
      await orderRecOperate.addRec(orderId,status)
      return true
    }
    return false
  }


  /**
   * 会员接单
   * @param {Number} orderId 
   */
  static async orderPick(orderId){
    if(await orderAcquire.getOpenIdByOrderId(orderId) == wx.getStorageSync('openId')){
      toast('不能接自己的单哦~')
      return
    }
    let rec = await orderRecAcquire.getOrderRec(orderId)
    console.log(rec)
    if(rec == "picking"){
      return false
    }
    let status = [{
      type: 'picking',
      operator: wx.getStorageSync('openId'),
      description: '快递员接单',
      timestamp: db.serverDate()
    }]

    let updateRes = await db.collection('order').doc(orderId).update({
      data:{
        status: _.push(status),
        status_code:2,
        pickerData:{
          _openid:wx.getStorageSync('openId'),
        }
      }
    })
    if (updateRes.errMsg == 'document.update:ok') {
      await orderRecOperate.addRec(orderId,status)
      return true
    }
    return false
  }

  /**
   * 会员配送订单
   * @param {Number} orderId 
   */
  static async orderDelivery(orderId){
    let rec = await orderRecAcquire.getOrderRec(orderId)
    console.log(rec)
    if(rec == "delivering"){
      return false
    }
    let status = [{
      type: 'delivering',
      operator: wx.getStorageSync('openId'),
      description: '快递员取货后配送',
      timestamp: db.serverDate()
    }]

    let updateRes = await db.collection('order').doc(orderId).update({
      data:{
        status: _.push(status),
        status_code:3,
        pickerData:{
          _openid:wx.getStorageSync('openId'),
        }
      }
    })
    if (updateRes.errMsg == 'document.update:ok') {
      await orderRecOperate.addRec(orderId,status)
      return true
    }
    return false
  }

  /**
   * 会员完成订单
   */
  static async orderComplete(orderId){
    let rec = await orderRecAcquire.getOrderRec(orderId)
    console.log(rec)
    if(rec == "complete"){
      return false
    }
    let status = [{
      type: 'complete',
      operator: wx.getStorageSync('openId'),
      description: '快递员送达订单',
      timestamp: db.serverDate()
    }]

    let updateRes = await db.collection('order').doc(orderId).update({
      data:{
        status: _.push(status),
        status_code:4,
        pickerData:{
          _openid:wx.getStorageSync('openId'),
        }
      }
    })
    if (updateRes.errMsg == 'document.update:ok') {
      //成功更改订单信息
      let price = await orderAcquire.getOrderPriceById(orderId)
      await assetsOperate.income(price)
      await orderRecOperate.addRec(orderId,status)

      //发送语音消息
      let order = await orderAcquire.getOrderById(orderId)
      let orderReleaserPhone = order.userAddress.phone

      await vms.Completed(orderReleaserPhone).catch(err=>{
        console.log(err)
      })
      return true
    }
    return false

  }

  static async orderUpdateDeliveryImg(orderId,fileID){
    let updateRes = await db.collection('order').doc(orderId).update({
      data:{
        processData:{
          deliveryImg:fileID
        }
      }
    })
    if (updateRes.errMsg == 'document.update:ok') {
      return true
    }
    return false
  }

  static async test(){
    return  await common.takeTime()
  }

}
module.exports = index