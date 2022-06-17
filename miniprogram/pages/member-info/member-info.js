const model = require('./model')
import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const utils = require('../../utils/index')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    sms_btn:'点击发送'
  },
  sms_btn_run() {
    this.setData({
      sms_num:30
    })
    let inter = setInterval(() => {
      this.setData({
        sms_num: this.data.sms_num - 1,
        sms_btn: this.data.sms_num + 's',
        sms_btn_active: false
      })
      if (this.data.sms_num == -1) {
        this.setData({
          sms_btn: '重发',
          sms_btn_active: true
        })
        clearInterval(inter)
      }
    }, 1000)

  },
  async sendSms(){
    
    if (!(/^1[3|4|5|7|8|9]\d{9}$/.test(this.data.phone))  ) {
      toast('手机号码错误！')
      return 
    }
    let random = await utils.random()
    
    let res = await utils.sendSms(this.data.phone,random)
    this.setData({
      auth_phone:this.data.phone,
      auth_code:random
    })
    console.log(res)
    this.sms_btn_run()
  },
  async confirm(){
    if(this.data.sms == this.data.auth_code && this.data.phone == this.data.auth_phone){
      toast('验证通过')
      return 
    }
    let data = await model.addMemberData(this.data.name,this.data.phone)
    if(data.errMsg == "collection.update:ok"){
     Toast("更新成功")
     wx.navigateBack({
       delta: 0,
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