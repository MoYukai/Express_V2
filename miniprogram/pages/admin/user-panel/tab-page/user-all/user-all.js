const cdb = require('../../../../../cdb/index')
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

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
   async attached(){

   let res = await cdb.get("user",{},"createTimestamp","desc")
   this.setData({
     userList:res.result.res.data
   })
    }
  }
})
