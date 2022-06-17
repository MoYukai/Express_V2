// components/progress-card/progress-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    code:{
      type:String,
      value:"88-8-8888"
    },
    name:{
      type:String,
      value:"请输入驿站名称"
    },
    button:{
      type:String,
      value:"查看详情"
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
