const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const tencentcloud = require("tencentcloud-sdk-nodejs");
const smsClient = tencentcloud.sms.v20190711.Client

const client = new smsClient({
  credential: {
    secretId: "****",//替换为你的秘钥
    secretKey: "***",//替换为你的秘钥
  },
  region: "ap-guangzhou",
  profile: {
    signMethod: "HmacSHA256",
    httpProfile: {
      reqMethod: "POST",
      reqTimeout: 30,
      endpoint: "sms.tencentcloudapi.com"
    },
  },
})

var params = {
  SmsSdkAppid: "****",
  Sign: "***",
  ExtendCode: "",
  SenderId: "",
  SessionContext: "",
  TemplateID: "***",
}

exports.main = async (event, context) => {
  console.log(event.phone)
  var code = event.code + ""
  var phone = "+86"+event.phone
  params.PhoneNumberSet = [phone]
  params.TemplateParamSet = [code]

  console.log(params)
  await client.SendSms(params).then(
    (data) => {
      console.log(data);
      message = data
    },
    (err) => {
      console.error("error", err);
    }
  )


  return {'event.phone':event.phone}
}
