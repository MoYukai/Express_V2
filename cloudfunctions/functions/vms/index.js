const tencentcloud = require("tencentcloud-sdk-nodejs");

// 导入 VMS 模块的 client models
const vmsClient = tencentcloud.vms.v20200902.Client;

/* 实例化要请求 VMS 的 client 对象 */
const client = new vmsClient({
    credential: {
    /* 必填：腾讯云账户密钥对secretId，secretKey。
     * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
     * 您也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
     * 以免泄露密钥对危及您的财产安全。
     * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
      secretId: "****",
      secretKey: "****",
    },
    /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
    region: "ap-guangzhou",
    /* 非必填:
     * 客户端配置对象，可以指定超时时间等配置 */
    profile: {
      /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
      signMethod: "TC3-HMAC-SHA256",
      httpProfile: {
        /* SDK默认使用POST方法。
         * 如果您一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
        reqMethod: "POST",
        /* SDK有默认的超时时间，非必要请不要进行调整
         * 如有需要请在代码中查阅以获取最新的默认值 */
        reqTimeout: 30,
        /**
         * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果您访问的是金融区的服务
         * 则必须手动指定域名，例如vms的上海金融区域名： vms.ap-shanghai-fsi.tencentcloudapi.com
         */
        endpoint: "vms.tencentcloudapi.com"
      },
    },
  });

  /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
   * 属性可能是基本类型，也可能引用了另一个数据结构
   * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 
   * 帮助链接：
   * 语音消息控制台：https://console.cloud.tencent.com/vms
   * vms helper：https://cloud.tencent.com/document/product/1128/37720
   */
  let params = {
    TemplateId: "***",
    TemplateParamSet: [""],
    CalledNumber:"****",
    VoiceSdkAppid: "*****",
    PlayTimes: 2,
    SessionContext: "xxxx",
  };

  exports.main = async (event, context) => {
    const params = event.params
  // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
  await client.SendTtsVoice(params, function (err, response) {
    // 请求异常返回，打印异常信息
    if (err) {
      console.log(err);
      return err;
    }
    // 请求正常返回，打印response对象
    console.log(response);
    return response
  })


  }

