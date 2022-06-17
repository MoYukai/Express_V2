
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
    pop(){
      return "ceshi"
    },
    hidePop(){
      this.triggerEvent("hidePop")
    },
    reLoad(){
      this.triggerEvent("reLoad")
    },
    async cancel(){
      // let Res = await model.orderCancel(this.data.pop._id,"用户点击取消按钮")
      // if(Res){
      //   this.hidePop()
      //   this.reLoad()
      // }
    },
    back(){
      this.triggerEvent("back")
    },
    refundDetail(){
      this.triggerEvent("refundDetail")
    }
  }
})
