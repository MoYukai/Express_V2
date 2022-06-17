const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : event.body,
    "outTradeNo" : event.outTradeNo,
    "spbillCreateIp" : event.spbillCreateIp,
    "subMchId" : event.subMchId,
    "totalFee" : event.totalFee,
    "envId": "****",
    "functionName": "pay_cb"
  })
  return {res, event}

}