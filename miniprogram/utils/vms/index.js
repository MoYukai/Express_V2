class index{

    static async UploadCode(phone){
        let res = await wx.cloud.callFunction({
            name: 'functions',
            data: {
              type: 'vms',
              //上传身份码提醒
              params: {
                TemplateId: "1211213",
                TemplateParamSet: [""],
                CalledNumber: "+86"+phone,
                VoiceSdkAppid: "1400597435",
                PlayTimes: 2,
                SessionContext: "xxxx",
              }
            }
          })
          return res
    }

    static async Completed(phone){
        let res = await wx.cloud.callFunction({
            name: 'functions',
            data: {
              type: 'vms',
              //上传身份码提醒
              params: {
                TemplateId: "1211829",
                TemplateParamSet: [""],
                CalledNumber: "+86"+phone,
                VoiceSdkAppid: "1400597435",
                PlayTimes: 2,
                SessionContext: "xxxx",
              }
            }
          })
          return res
    }

}
module.exports = index