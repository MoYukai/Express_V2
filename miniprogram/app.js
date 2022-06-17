const model = require('./model')

App({
  
  async onLaunch () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'second-env-0gm0mwun7feb1243',
        traceUser: true,
      })
    }
    await model.saveOpenId()
    model.userComeIn()

    this.globalData = {}


  },

  async onShow(){
    await model.getAv()
    model.checkForUpdate()
  },

  // loadFontFace() {
  //   console.log("进来下载字体")
  //   wx.loadFontFace({
  //     family: 'yahei2',
  //     source: 'url("https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf")',
  //     success: (res) => {
  //       console.log("成功",res)
  //     },
  //     fail: function (res) {
  //       console.log("失败",res)
  //     },
  //     complete: function (res) {
  //       console.log("完成",res)
  //     }
  //   });
  // }
  
})
