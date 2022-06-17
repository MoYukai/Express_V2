const assetsAcquire = require('../../assets-acquire/index')
const assetsOperate = require('../../assets-operate/index');
const redeemCodeOperate = require('../../redeem-code-operate/index')
const { default: toast } = require('../../miniprogram_npm/@vant/weapp/toast/toast');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '2',
    balance: '--',
    withdrawInput: 0
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  async withdraw() {

    const totalBalance = await assetsAcquire.getTotalBalance()
    console.log("账户余额", totalBalance.balance)
    console.log("准提现金额", this.data.withdrawInput)
    if (this.data.withdrawInput <= 0) {
      Toast('请输入有效提现金额')
      return
    }
    if (totalBalance.balance < this.data.withdrawInput * 100 || !totalBalance.balance) {
      Toast('余额不足')
      return
    }
    Dialog.confirm({
      title: '提现',
      message: '点击确认按钮，将余额提现到核销码',
    })
      .then(() => {
        this.final()
      })
      .catch(() => {
        toast('你点击了取消')
      });



  },
  async final() {
    const res = await assetsOperate.withdraw(this.data.withdrawInput * 100)
    await redeemCodeOperate.createRedeemCode(this.data.withdrawInput * 100)
    console.log(res)
    this.onShow()
    wx.navigateTo({
      url: '../redeem-code/redeem-code',
    })
  },
  async billhistory(){
    wx.navigateTo({
      url: '../bills-record/bills-record',
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
    const balance = await assetsAcquire.getTotalBalanceToFixed()
    console.log(balance)
    this.setData({
      balance,
      withdrawInput: '',
      radio: '2'
    })
    if(!balance){
      this.setData({
        balance:0
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