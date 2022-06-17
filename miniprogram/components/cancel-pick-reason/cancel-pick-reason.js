// components/cancel-pick-reason/cancel-pick-reason.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    list: {
      type: Array,
      value: [
        {
          code:-31,
          desc:'找不到快递'
        },{
          code:-32,
          desc:'超大/超重'
        },{
          code:-33,
          desc:'不想拿了'
        }
      ]


    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected:{

    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e){
      let item = e.currentTarget.dataset.item
      this.triggerEvent("select",item)
      this.setData({
        selected:item
      })
    }
  }
})
