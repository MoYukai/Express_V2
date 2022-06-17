// components/index-codeTab/index-codeTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    code:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    next(){
      this.triggerEvent("next",this.data.code)
      this.selectComponent('#code-input').clean()
    },
    free(){
      this.triggerEvent("free")
    },
    input(e){
      this.setData({
        code:e.detail
      })
    }

  }
})
