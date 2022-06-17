// components/user-panel/user-row/user-row.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time:{
      type:String,
      value:"--/-- --:--"
    },
    nick:{
      type:String,
      value:"未知用户"
    },
    avatar:{
      type:String,
      value:"../../../static/icon/header-null.svg"
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    time:''

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  },
  lifetimes:{
    attached(){
      if(this.data.nick == ''){
        this.setData({
          nick : "未知用户"
        })
      }
    }
  }
})
