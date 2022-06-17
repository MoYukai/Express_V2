class index{

  /**
   * 模板ID枚举
   */
  static template(enum_name){
    var en = {   
      "下单成功提醒":{
        page : 'pages/index/index',
        tmplIds : "myRNO7GQFcB6meWpU8AXFn-dsRMsOo2mRT-FpeNynZ8",
        data : {
          thing5: {
            value: '快递代拿抢单即将开始,快来接单赚钱！'
          },
          time3:{
            value: '18:00'
          }
        }
      }



  } 
  return en[enum_name]
  }
}
module.exports = index