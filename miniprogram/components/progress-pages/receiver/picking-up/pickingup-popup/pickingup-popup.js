const model = require('./model')
const assetsAcquire = require('../../../../../assets-acquire/index')
const orderOperate = require('../../../../../order-operate/index')
const { default: toast } = require('../../../../../miniprogram_npm/@vant/weapp/toast/toast')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean
    },
    pop:{
      type:Object
    },
    idcode:{
      type:Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowTime:'',
    selected:''
  },
  lifetimes:{
    ready(){
      this.setData({
        nowTime:new Date()
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    cancel_close(){

    },
    async cancel_confirm(){
      if(!this.data.selected || this.data.selected == ''){
        toast('请选择一个原因')
        return
      }
      toast.loading({
        message: '取消中...',
        forbidClick: true,
      })

      let res = await orderOperate.pickerCancel(this.data.pop._id,this.data.selected)
      if(res){
        toast('取消成功！')
      }else{
        toast('取消失败！')
      }
    },
    select(e){
      this.setData({
        selected:e.detail
      })

    },
    showPic(e){
      wx.previewImage({
        urls: [e.target.dataset.img],
      })
    },
    reLoad(){
      this.triggerEvent("reLoad")
    },
    hidePop(){
      this.triggerEvent("hidePop")
    },
    async orderDelivery(e){
     let Res = await model.orderDelivery(e)
      if(Res){
        this.reLoad()
        this.hidePop()
      }
    },
    back(){
      this.setData({
        cancel_show : true
      })
    },
    call(){
          
      let phone = this.data.pop.userAddress.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      }).catch(err=>{
        
      })
    }
  }
})
