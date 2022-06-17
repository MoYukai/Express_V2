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
    reLoad(){
      this.triggerEvent("reLoad")
    },
    hidePop(){
      this.triggerEvent("hidePop")
    },
    async orderPick(e){
     let Res = await model.orderPick(e)
      if(Res){
        this.reLoad()
        this.hidePop()
      }
    },
    back(){
      //联系对方按钮
      // this.triggerEvent("back")
      let phone = this.data.pop.userAddress.phone
      wx.makePhoneCall({
        phoneNumber: phone,
      }).catch(err=>{
        
      })
    }
  }
})
