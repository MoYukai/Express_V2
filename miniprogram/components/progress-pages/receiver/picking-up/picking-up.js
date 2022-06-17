const { default: toast } = require('../../../../miniprogram_npm/@vant/weapp/toast/toast');
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
    pickingUpList:''
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
    async loadData(){

      let {data} = await orderAcquire.getOrderPicking()
      this.setData({
        pickingUpList:data
      })

    },
    detail(e){
      this.triggerEvent("detail",this.data.pickingUpList[e.target.dataset.popidx])
    }
  }
})
