const model = require('./model')
const assetsAcquire = require('../../../../../assets-acquire/index')
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    hidePop(){
      this.triggerEvent("hidePop")
    },
    reLoad(){
      this.triggerEvent("reLoad")
    },
    async cancel(){
      let Res = await model.orderCancel(this.data.pop,"用户点击取消按钮")
      if(Res){
        console.log("ceshi")
        this.hidePop()
        this.reLoad()
      }
    },
    back(){
      this.triggerEvent("back")
    },
    async call(e){
      let runner_openID = e.target.dataset.pop.pickerData._openid
      let runner_address = await assetsAcquire.getAddressByOpenId(runner_openID)
      wx.makePhoneCall({
        phoneNumber: runner_address.phone,
      }).catch(res=>{
        
      })

    }
  }
})
