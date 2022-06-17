// components/post-select/post-select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    idx:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e){
      let idx = e.currentTarget.dataset.idx
      this.triggerEvent("select",idx)
      this.setData({
        idx
      })
    }

  }
})
