const userAcquire = require('../../../user-acquire/index')
const orderAcquire = require('../../../order-acquire/index')
const couponOperate = require('../../../coupon-operate/index')
const { default: toast } = require('../../../miniprogram_npm/@vant/weapp/toast/toast')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      count: {
        today: "--",
        all: "----"
      }
    },
    order:{
      count:{
        today:{
          wait:"-",
          all:"-",
          pro:"-",
          done:"-",
          error:"-"
        }
      }
    }


  },
  async gotoGift(){
   let res =  await couponOperate.new_coupon_code()
   console.log(res)
   wx.setClipboardData({
     data: res,
   })

  },
  loadData() {
    this._loadUserCount()
    this._loadOrderCount()
  },
  async _loadOrderCount(){
    let allOrderCount = await orderAcquire.getTodayAllOrderCount()
    let waitingOrderCount = await orderAcquire.getTodayWaitingOrderCount()
    let processingOrderCount = await orderAcquire.getTodayProcessingOrderCount()
    let doneOrderCount = await orderAcquire.getTodayDoneOrderCount()
    let errorOrderCount = await orderAcquire.getTodayErrorOrderCount()
    this.setData({
      "order.count.today.all":allOrderCount.total,
      "order.count.today.wait":waitingOrderCount.total,
      "order.count.today.pro":processingOrderCount.total,
      "order.count.today.done":doneOrderCount.total,
      "order.count.today.error":errorOrderCount.total
    })
  },
  async _loadUserCount() {
    let allUser = await userAcquire.getUserCount()
    console.log(allUser)
    this.setData({
      "user.count.all": allUser
    })

    let todayUser = await userAcquire.getTodayUserCount()
    console.log(todayUser)
    this.setData({
      "user.count.today": todayUser
    })
  },

  gotoUserPanel(){
    wx.navigateTo({
      url: '../user-panel/user-panel',
    })
  },

  orderPanel(){
    wx.navigateTo({
      url: '../order-panel/order-panel',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },



})