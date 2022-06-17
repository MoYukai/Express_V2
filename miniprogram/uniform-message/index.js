
const utils = require('../utils/index')
class index{

  static async sendCheckoutSuccess(openid){
  let res = await  wx.cloud.callFunction({
      name:'functions',
      data:{
        type:'uniformMessage',
        data:{
          "touser": openid,
          "mpTemplateMsg": {
            "appid": 'wxeb236ca9d6615f23',
            "url": 'http://weixin.qq.com/download',
            "miniprogram": {
              "appid": 'wxdf56efd76f6f2f95',
              "pagepath": 'pages/index/index'
            },
            "data": {
              "first": {
                "value": '您的订单已受理，我们立即派人驿站取件，请保持手机通畅。',
                "color": '#173177'
              },
              "keyword1": {
                "value": '袋友速递',
                "color": '#173177'
              },
              "keyword2": {
                "value": '2021年6月22日 17:30',
                "color": '#173177'
              },
              "remark": {
                "value": '如有疑问请致电：0768-8888888',
                "color": '#173177'
              }
            },
            "templateId": 'YLoU7WBe-887mdT_5DVkZ9WRs-JtveBlO3OETlwO64g'
          }
        }
      }
    })

    return res

  }

  //返现到账通知
  static async rewardReceipt(openid){
   let date = await utils.getCurrentTime()
    let res = await  wx.cloud.callFunction({
      name:'functions',
      data:{
        type:'uniformMessage',
        data:{
          "touser": openid,
          "mpTemplateMsg": {
            "appid": 'wxa8559e4ee6dc0a3b',
            "templateId": '2udXEj8m5XOTO7_4sSjSWwQphcTs24qM4mS1Nk6S8bU',
            "url": 'http://weixin.qq.com/download',
            "miniprogram": {
              "appid": 'wxdf56efd76f6f2f95',
              "pagepath": 'pages/index/index'
            },
            "data": {
              "first": {
                "value": '您的推荐返利已到账，请在7天内进行使用',
                "color": '#173177'
              },
              "keyword1": {
                "value": date,
                "color": '#173177'
              },
              "keyword2": {
                "value": '对方点击了你分享的小程序',
                "color": '#173177'
              },
              "keyword3": {
                "value": '一张免费代拿券',
                "color": '#173177'
              },
              "remark": {
                "value": '点击进入小程序查看',
                "color": '#173177'
              }
            },
            
          }
        }
      }
    })

    return res

  }



}
module.exports = index