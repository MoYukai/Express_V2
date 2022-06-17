// components/code-input/code-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    code:{
      type:String
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
    input(e){
      this.triggerEvent("input",e.detail.value)
    },
    clean(){
      this.setData({
        code:''
      })
    }
  }
})
