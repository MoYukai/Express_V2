const model = require('./user-info-model')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  gotoAddress(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  gotoExpressMan(){
    wx.navigateTo({
      url: '../member-page/member-page',
    })
  },
  async checkAddress(){
    let res = await model.getAddress()
    if(res){
      this.setData({
        userAddress : true
      })
    }else{
      this.setData({
        userAddress : false
      })
    }
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
    this.checkAddress()

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