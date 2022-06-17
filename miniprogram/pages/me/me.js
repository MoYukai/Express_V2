const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
const model = require('./model')
const couponAcquire = require('../../coupon-acquire/index')
const auth = require('../../authority/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '--',
    cardRemain:"0"
  },
  buyCard(){
    wx.navigateTo({
      url: '../monthcard-buy/monthcard-buy',
    })
  },
  orderTabSelect(e){
    wx.navigateTo({
      url: '../progress/progress?index='+e.detail,
    })
  },
  orderDetail(){
    wx.navigateTo({
      url: '../progress/progress',
    })
  },
  cardBagDetail(){
    wx.navigateTo({
      url: '../my-card-bag/my-card-bag',
    })
  },
  gotoJD(){
    toast('去京东页面')
    wx.navigateTo({
      url: '../laboratory/meeting/meeting',
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
 async onShow () {
  this.selectComponent('#header').setHeader()
    //页面获取权限
   let authLev =await auth.getType()
   console.log(authLev)
   this.setData({
     authLev
   })

    this.selectComponent('#me-order-tab').load()
    const day = await model.delta_T()
    this.setData({
        day
    })

    let res = await couponAcquire.get()
    if(res.data.length == 1){
      this.setData({
        monthCardType:true
      })
    }else{
      this.setData({
        monthCardType:false
      })
    }

    let res3 =await couponAcquire.get()
    if(res3.data.length == 0){
      this.setData({
        cardRemain : 0
      })
      return 
    }
    let total = res3.data[0].total
    console.log(total)
    this.setData({
      cardRemain : total
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})