const couponAcquire = require('../../coupon-acquire/index')
const couponOperate = require('../../coupon-operate/index')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''

  },
  input(e) {
    console.log(e.detail.value)
    this.setData({
      code:e.detail.value
    })
      
    
  },
 async  submit(){
    console.log("提交",this.data.code)
    let res = await couponOperate.use_coupon_code(this.data.code)
    console.log(res)
    if(!res){
      toast('兑换码无效或已被使用过!')
      return
    }
    toast('兑换成功!')
    

    wx.switchTab({
      url: '../../pages/orderRelease/orderRelease',
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