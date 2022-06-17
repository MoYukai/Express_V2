// components/me-header/me-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    day:{
      type:String,
      value:'3'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached(){
      this.setHeader()

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setHeader(){
      this.setData({
        avatarUrl:   wx.getStorageSync('avatarUrl')
      })
    }

  }
})
