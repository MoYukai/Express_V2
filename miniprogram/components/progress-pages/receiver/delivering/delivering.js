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
    deliveringList:''
  },
  lifetimes:{
    attached(){
      this.loadData()
    }
  },


  methods: {
    async loadData(){
      let {data} = await orderAcquire.getOrderDelivering()
      this.setData({
        deliveringList:data
      })
    },
    detail(e){
      this.triggerEvent("detail",this.data.deliveringList[e.target.dataset.popidx])
    }
  }
})
