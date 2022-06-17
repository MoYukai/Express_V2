const couponOperate = require('../../coupon-operate/index')
const couponAcquire = require('../../coupon-acquire/index')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
const wxpay = require('../../pay/index')
const { default: dialog } = require('../../miniprogram_npm/@vant/weapp/dialog/dialog')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthCardStatus: false,
    expire:'---------',
    remain:"2"

  },
  async use() {
    console.log("点击了使用")
    //如果已经购买了月卡
    let res = await couponAcquire.get()
    if(res.data.length > 0){
    wx.switchTab({
      url: '../orderRelease/orderRelease',
    })
    }else{
      dialog.confirm({
        title: '权益使用',
        message: '你选择使用的权益需要去购买袋鼠月卡哦~',
        confirmButtonText:'去购买',
        cancelButtonText:'我再想想'
      })
        .then(() => {
          this.buyMonthCard()
        })
        .catch(() => {
          // on cancel
        });
    }

  },
  async buyMonthCard() {
    if(!await couponAcquire.check()){
      return
    }
    const price = 1900
    await wxpay.pay("购买月卡",price)
    await couponOperate.add(price)
    toast('购买成功')
    wx.switchTab({
      url: '../orderRelease/orderRelease',
    })
    this.onShow()
  },
  async useMonthCard() {
    wx.switchTab({
      url: '../orderRelease/orderRelease',
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
  async onShow() {
    console.log("今天使用的次数",await couponAcquire.getTodayCount())
    let res = await couponAcquire.get()
    console.log("月卡页面加载", res)
    if (res.data.length > 0) {
      this.setData({
        monthCardStatus: true,
        monthCardCount:res.data[0].total,
        expire:new Date(res.data[0].expiresTimestamp).getTime(),
        remain:2 - await couponAcquire.getTodayCount()
      })

    }


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