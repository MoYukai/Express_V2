const utils = require('../../utils/index')
const auth = require('../../authority/index')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    let url = decodeURIComponent(options.q)
    let code =await utils.getQueryVariable(url,"redeem_code")
    console.log(code)
    let auth_type = await auth.getType()
    console.log("用户类型",auth_type)
    if(auth_type == 0){
      wx.redirectTo({
        url: '../admin/redeem-code/redeem-code?redeem_code='+code,
      })

      return
    }
    if(auth_type == -1){
      wx.switchTab({
        url: '../index/index',
      })
      return
    }
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