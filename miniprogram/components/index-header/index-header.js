// components/index-header/index-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    in_neu:{
      type:Boolean,
      value:false
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
      console.log("首页设置头像")
      this.setData({
        avatarUrl:   wx.getStorageSync('avatarUrl')
      })

    },
    header(){
      this.triggerEvent("header")
    },
    arrow(){
      this.triggerEvent("arrow")
    }
  }
})
