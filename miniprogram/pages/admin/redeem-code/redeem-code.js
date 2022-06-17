const { default: toast } = require('../../../miniprogram_npm/@vant/weapp/toast/toast.js')
const redeemCodeAquire = require('../../../redeem-code-acquire/index.js')
const redeemCodeOperate = require('../../../redeem-code-operate/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async use_redeem(){
    console.log(this.data.redeem_code_detail.code)
    let res = await redeemCodeOperate.useRedeemCode(this.data.redeem_code_detail.code)
    if(res){
      toast('核销成功')
      this.onShow()
    }else{
      toast('核销失败')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    let redeem_code = options.redeem_code
    console.log(redeem_code)
    this.setData({
      redeem_code
    })
    
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
    let res = await redeemCodeAquire.checkRedeemCode(this.data.redeem_code
    )
    if(!res){
      toast('核销码不存在！')
      return
    }
    console.log(res)
    this.setData({
      redeem_code_detail:res
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