const orderAcquire = require('../../../../order-acquire/index')
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
    completedList:''
  },
  lifetimes:{
    attached(){
      this.loadData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showPic(e){
      wx.previewImage({
        urls: [e.target.dataset.img],
      })
    },
    async loadData(){
      let {data} = await orderAcquire.getOrderCompleted()
      this.setData({
        completedList:data
      })
    },
    detail(e){
      this.triggerEvent("detail",this.data.completedList[e.target.dataset.popidx])
    }
  }
})
