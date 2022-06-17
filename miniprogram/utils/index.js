wx.cloud.init({
  env: 'second-env-0gm0mwun7feb1243',
  traceUser: true,
})
const drawQrcode = require("./QRcode/weapp.qrcode");
const db = wx.cloud.database()
class index {
  static async getQueryVariable(url,variable){
          let index = url.lastIndexOf("?")
          url=url.substring(index+1,url.length)
         var vars = url.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
  }

  static async getTimestamp() {
    const { result } = await wx.cloud.callFunction({
      name: 'functions',
      data: {
        type: 'getTime'
      }
    })
    return result
  }

  static async uploadSingleImage() {
    let res = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      camera: 'back',
    }).catch(err => {
    })
    if (res == undefined) {
      return false
    }
    let upRes = await wx.cloud.uploadFile({
      cloudPath: 'deliveryImg/' + new Date().getTime() + '.png',
      filePath: res.tempFiles[0].tempFilePath,
    })
    const fileID = upRes.fileID
    return fileID
  }

  static async uploadSingleImageFromAlbum() {
    let res = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      camera: 'back',
    }).catch(err => {
    })
    if (res == undefined) {
      return false
    }
    let upRes = await wx.cloud.uploadFile({
      cloudPath: 'deliveryImg/' + new Date().getTime() + '.png',
      filePath: res.tempFiles[0].tempFilePath,
    })
    const fileID = upRes.fileID
    return fileID
  }

  static async getTodayStartTime() {
    var now_date = new Date();
    now_date.setHours(0);
    now_date.setMinutes(0);
    now_date.setSeconds(0);
    now_date.setMilliseconds(0);
    var startTime = now_date;
    return startTime.getTime()
  }

  static async getTodayEndTime() {
    var now_date = new Date();
    now_date.setHours(23);
    now_date.setMinutes(59);
    now_date.setSeconds(59);
    now_date.setMilliseconds(0);
    var endTime = now_date;
    return endTime.getTime()
  }

  static async sendSms(phone, code) {
    return await wx.cloud.callFunction({
      name: 'functions',
      data: {
        type: 'sms',
        phone,
        code
      }
    })
  }

  static async random() {
    let random = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    return random
  }

  static async redeem_code(price) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 64; i > 0; --i) {
      result += str[Math.floor(Math.random() * str.length)];
    }
    return result
  }

  static async createDateToTimestamp(Objects){
    let length = Objects.length
    for(let i = 0;i<length;i++){
      // console.log("测试",Objects[i].createTimestamp.getTime())
      Objects[i].createDateToTimestamp = Objects[i].createTimestamp.getTime()
    }
    return Objects
  }

 
  static async getCurrentTime() {
    var date = new Date();//当前时间
    var year = date.getFullYear() //返回指定日期的年份
    var month = await this.repair(date.getMonth() + 1);//月
    var day = await this.repair(date.getDate());//日
    var hour = await this.repair(date.getHours());//时
    var minute =await this.repair(date.getMinutes());//分
    var second =await this.repair(date.getSeconds());//秒
    
    //当前时间 
    var curTime = year + "-" + month + "-" + day
            + " " + hour + ":" + minute + ":" + second;
    return curTime;
}
 
//补0
 
static async repair(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}


}
module.exports = index