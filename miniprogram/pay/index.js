class index{

  static async pay(body,totalFee) {
    let outTradeNo =await this.random()
    outTradeNo = "EV2_"+outTradeNo
    console.log(outTradeNo)
    return new Promise((resolve, reject) => {
      
      wx.cloud.callFunction({
        name: 'functions',
        data: {
          type:"pay",
          "body": body,
          "outTradeNo":outTradeNo,
          "spbillCreateIp": "127.0.0.1",
          "subMchId": "1604898047",
          "totalFee": totalFee
        }
      }).then(res => {
        console.log(res)
        const payment = res.result.res.payment
        wx.requestPayment({
          ...payment
        }).then(res2 => {
          resolve(res, res2)
        }).catch(res => {
          reject(res)
        })
      }).catch(res => {
        reject(res)
      })
    })

  }

  static async random(){
    return new Promise((resolve)=>{
      var str = '0123456789';
      var result = '';
      for (var i = 15; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)];
      }
      result = result+""
      console.log(result)
      resolve(result)
    })
   
  }
}

module.exports = index