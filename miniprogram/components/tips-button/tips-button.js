const assetsAcquire = require('../../assets-acquire/index')
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
    codeAvailable : 0

  },

  lifetimes:{
    async attached(){
      this.loadData()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async loadData(){
      let res =  await assetsAcquire.checkQRInfo()
      if(res == 0){
        console.log("还未上传身份码")
        this.setData({
          codeAvailable : 0
        })
        return
      }
      if(res == 1){
        console.log("服务端的身份码还有效")
        this.setData({
          codeAvailable : 1
        })
        return
      }
      if(res == -1){
        console.log("服务端的身份码已经过期")
        this.setData({
          codeAvailable : -1
        })
        return
      }
    },
    button(){
      this.triggerEvent("button")
    }

  }
})
