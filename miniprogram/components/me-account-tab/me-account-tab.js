// components/me-account-tab/me-account-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardRemain:{
      type:String,
      value:"0"
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
    detail(){
      this.triggerEvent("detail")
    }
  }
})
