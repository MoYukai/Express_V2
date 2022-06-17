const model = require('./model')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import dbUtils from '../../utils/dbUtils';
const orderOperate = require('../../order-operate/index')
const orderAcquire = require("../../order-acquire/index")
const cdb = require('../../cdb/index')

const dbutils = require("../../utils/dbUtils")
const { default: dialog } = require('../../miniprogram_npm/@vant/weapp/dialog/dialog')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QRcode:'',
    acitve:0
  },
  reLoad(){
    this.onShow()
  },

  //订单池弹窗按钮
  poolDetail(e) {
    console.log(e.detail)
    this.setData({
      poolPop:e.detail,
      poolShow:true
    })
  },

  //取货中弹窗按钮
  async pickingUpDetail(e){
    console.log(e.detail)
    this.setData({
      pickingUpPop:e.detail,
      pickingUpShow:true
    })

    let IDCode = await model.getIDCode(e.detail._openid)
    this.setData({
      IDCode
    })
  },

  //配送中弹窗按钮
  deliveringDetail(e){
    console.log(e.detail)
    this.setData({
      deliveringPop:e.detail,
      deliveringShow:true
    })
  },

  //已完成弹窗按钮
  completedDetail(e){
    console.log(e.detail)
    this.setData({
      completedPop:e.detail,
      completedShow:true
    })
  },

// 关闭所有弹窗
_hideAllPop(){
  this.setData({
    poolShow:false,
    pickingUpShow: false,
    deliveringShow:false,
    completedShow:false
  })

  this.setData({
    IDCode:''
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
    wx.getLocation({
      type:'gcj02',
      isHighAccuracy:true,
      altitude: true,
      success(res){
        console.log("latitude",res.latitude)
        console.log("longitude",res.longitude)
      },
      fail(err){
        console.log("您拒绝了",err)
      }
    })
    
    //判断是否具备接单条件

    const totalObj = await dbUtils.getCount("memberUser", {},{},1)
    //totalObj.total = 0
    if (!totalObj || totalObj.total <= 0){

      // wx.showModal({
      //   title: "当前不在校区",
      //   content: "请进入该校区后，再执行接单操作！",
      //   showCancel: false,
      //   cancelText: "我知道了",
      //   success(res){
      //     if (res.confirm){
      //       wx.switchTab({
      //         url: '../index/index',
      //       })
      //       return
      //     }
      //   }
      // })
      // return

        Dialog.alert({
          title: '您不在校区',
          message: '接单需要您的定位处在校区范围内，请进入校区后再接单哦~',
        }).then(() => {
          wx.switchTab({
            url: '../index/index',
          })
        });

    }

    let address = await model.getAddress()
    console.log(address)
    if(!address){
      wx.navigateTo({
        url: '../user-info/user-info',
      })
      return
    }

    //获取小红点数据
    let dotList = await orderAcquire.getMemberTabDot()
    this.setData({
      dotList
    })

    //开始获取页面信息
    this.selectComponent('#pool').loadData()
    this.selectComponent('#picking-up').loadData()
    this.selectComponent('#delivering').loadData()
    this.selectComponent('#completed').loadData()
    this.selectComponent("#tabs").resize()
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
    this.onShow()
    wx.stopPullDownRefresh({
      
    })
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