const orderAcquire = require("../../order-acquire/index")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[
        {
          name: "取件中",
          icon: "../../static/order-tab/send.png"
        },
        {
          name: "派送中",
          icon: "../../static/order-tab/deliver.png"
        },
        {
          name:"已完成",
          icon:"../../static/order-tab/comment.png"
        },
        {
          name:"取消/退款",
          icon:"../../static/order-tab/refund.png"
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    async attached(){
      this.load()
    },
    detached(){
      this.setData({
        dotList:[]
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async load(){
      let dotList = await orderAcquire.getOrderTabDot()
      let temp = this.data.list
  
       for(let i=0;i<dotList.length;i++){
          if(dotList[i]==0){
            temp[i]['dot']=''
          }else{
            temp[i]['dot']=dotList[i]
          }
       }
       this.setData({
        list : temp
       })
       console.log(this.data.list)
    },
    itemSelect(e){
      this.triggerEvent("select",e.currentTarget.dataset.ids)
    }
  }
})
