const couponAcquire = require('../../coupon-acquire/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthCardType:false,
    cardRemain:40
  },
  monthCardDetail(){
    wx.navigateTo({
      url: '../monthcard-buy/monthcard-buy',
    })
  },
  getTrial(){
    wx.navigateTo({
      url: '../customer-service/customer-service',
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
    let res = await couponAcquire.get()
    console.log(res)
    if(res.data.length == 0){
      this.setData({
        monthCardType:false
      })
      return
    }
    this.setData({
      cardRemain : res.data[0].total
    })
    if(res.data.length != 1){
      this.setData({
        monthCardType : false
      })
    }else{
      this.setData({
        monthCardType : true
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