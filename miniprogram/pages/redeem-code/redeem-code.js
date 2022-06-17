const redeemCodeAquire = require('../../redeem-code-acquire/index')
const utils = require('../../utils/index')
const drawQrcode = require("../../utils/QRcode/weapp.qrcode");
import poster from '../../painter/palette/painter'
const posterView = require("../../painter/posterViewjs/posterView.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redeemCodeList:'',
    imgUrl: null,
    QRCodeText: "",
    paintPallette: '',
  },
  onImgOK(res) {
    this.setData({
      imgUrl: res.detail.path
    })
    console.log("新的",res.detail.path)
  },
  makePoster(qrcodeText) {
    qrcodeText = "https://pixcel.cn/miniprg/daiyou/admin?redeem_code="+qrcodeText
    // 这是绘制海报所用到JSON数据
    const viewList = posterView.getPosterView01(qrcodeText)
    this.setData({
      paintPallette: new poster().palette(viewList)
    })
  },
  onClose(){
    this.setData({
      show : false,
    })
  },
  service(){
    wx.navigateTo({
      url: '../customer-service/customer-service',
    })
  },
  async showPopup(e){
    let item = e.currentTarget.dataset.item
    this.makePoster(item.code)
    this.setData({
      show : true,
      item
    })
  },
  redeemHistory(){
    wx.navigateTo({
      url: '../redeem-code-history/redeem-code-history',
    })
  },
  gotoWidthdraw(){
    wx.navigateTo({
      url: '../withdraw/withdraw',
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
    let {data} = await redeemCodeAquire.getRedeemCode()
    this.setData({
      redeemCodeList:data
    })
    console.log(this.data.redeemCodeList)
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