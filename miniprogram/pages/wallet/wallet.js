const assetsAcquire = require('../../assets-acquire/index')
const redeemCodeAquire = require('../../redeem-code-acquire/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'-.--',
    redeemCount:'-'

  },
  withdraw(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
    })
  },
  exchange(){
    wx.navigateTo({
      url: '../redeem-code/redeem-code',
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
  async  onShow  () {
   const balance = await assetsAcquire.getTotalBalanceToFixed()
   if(balance){
        this.setData({
     balance
   })
   }
   let redeemCount = await redeemCodeAquire.getCount()
   this.setData({
     redeemCount
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