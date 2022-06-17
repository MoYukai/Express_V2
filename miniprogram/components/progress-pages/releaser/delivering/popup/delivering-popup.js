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
    async call(){
      let runner_openID = this.data.pop.pickerData._openid
      let runner_address = await assetsAcquire.getAddressByOpenId(runner_openID)

      wx.makePhoneCall({
        phoneNumber: runner_address.phone,
      }).catch(err=>{
        
      })
      

    },
    back(){
      this.triggerEvent("back")
    }
  }
})
