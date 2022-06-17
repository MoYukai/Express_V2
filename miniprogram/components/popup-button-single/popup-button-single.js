// components/popup-button/popup-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    button:{
      type:String,
      value:"返回"
    },
    bottom:{
      type:String,
      value:"55"
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
    button(){
      this.triggerEvent("button")
    }
  }
})
