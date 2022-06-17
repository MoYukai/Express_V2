// pages/admin/order-panel/order-panel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0

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
    this.selectComponent('#tabs').resize();

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


  onReachBottom: function () {
    if(this.data.active === 0){
      this.selectComponent("#all").nextPage()
      return
    }
    if(this.data.active === 1){
      this.selectComponent("#processing").nextPage()
      return
    }
    // if(this.data.active === 2){
    //   console.log("已送达触底")
    //   return
    // }
    // if(this.data.active === 3){
    //   console.log("异常触底")
    //   return
    // }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})