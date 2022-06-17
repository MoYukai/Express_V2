import Abi from 'wx-axios-promise'
import toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:"--:--:--",

  },
  gotoLogin(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  button() {
    console.log("点击了按钮")
    // let api = Abi({
    //   url: 'http://www.baidu.com',//默认的接口后缀
    //   method: 'get',//默认的HTTP 请求方法
    //   dataType: 'json',//默认的返回类型
    //   responseType: 'text',
    //   header: {
    //     'content-type': "application/json"
    //   }
    // })

    wx.request({
      url: 'http://jmrs.jd.com/meetingOrder/create',
      method: 'POST',
      header: {
        Cookie: '__jdu=16255492758231016205496; shshshfpa=a7e14f8b-2daf-a149-4324-29110276f4e0-1625558337; shshshfpb=e1cBShXdJ%2FLj2dTWP5XnxEg%3D%3D; pinId=GbWd91IY9vE; pin=moyukai; unick=moyukai; _tp=1zrAZ4QxyMnw4TWqFjdaOw%3D%3D; _pst=moyukai; TrackID=1jyu2A7ua7EMNzvoJA0wpoZVzBxwF-evd5qHIKMyKQjFHzIUdN0bQFN_rxWprxcCf1QOmWYpqDc0CmuhyaE8FC75XKVzq8WBc1jMtHPTVu31vKGSVpKU4GE15qWDuhgNm; ipLoc-djd=1-2805-0-0; areaId=1; PCSYCityID=CN_110000_110100_0; shshshfp=51918a55646b1ba52d84602dab35b013; jd.erp.lang=zh_CN; jdd69fo72b8lfeoe=T3IF5W77UE75LQ72CD4OFKQO62ANHVJ6QDYXX5KD5KWCQPVLLYOQCUITS5LWGSE6LCDT64YGLIDTFKNRYV3IYMNCHQ; userIdType=2; ticket=e9250045b355ee1f1d69c330bfaa892f; userName=moyukai1; erp=moyukai1; umap_erp=moyukai1; umap_userData=j%3A%7B%22REQ_DATA%22%3A%7B%22personId%22%3A%22moyukai1%22%2C%22fullname%22%3A%22%E8%8E%AB%E7%85%9C%E6%A5%B7%22%2C%22username%22%3A%22moyukai1%22%2C%22orgName%22%3A%22%22%2C%22email%22%3A%22moyukai1%40jd.com%22%7D%7D; __jdv=137720036|direct|-|none|-|1628439107866; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZqdmoxUGlSc0prWHN0VmYzMTFKIiwiaWF0IjoxNjI4NTU5OTU3LCJleHAiOjE2MzExNTE5NTd9.VLAy-SHaKlJ2-L8I4Hl7y-OAMVi7WqOr9Ind_PRy3DI; focus-team-id=00046419; focus-client=WEB; focus-lang=zh-CN; focus-token=fddac2de1c64e23c16de2cb3a1bede2d; SSOID=b862c39fbb1acc21652477c2ae47d0588fbe5a5538bf002dac1884c5d89a234f,moyukai1; erp1.jd.com=9134A623B85B5B2C6D9395C32A98189DA880AC6132E36B1ACBBA57D6E4600EAAF0025DA7908D2C9FCDB4E4164DCB35AC749E884BBBF0C2182C6061DCF91975E66D277C3D4D244B77404DC6572B198E38; sso.jd.com=BJ.8C62A50FD9C895DF0B7020CDBBA7C6D15420210811084848; 3AB9D23F7A4B3C9B=AXMVURW2F5XEOGQWIHYVXN7ER4BDBAGZXXODNCJA6FKIFZB4275LGBCMELKHBRDJVRGAQ5F724AYXRS237I36T4CXM; __jdc=234025733; __jda=234025733.16255492758231016205496.1625549276.1628642932.1628646171.83; __jdb=234025733.1.16255492758231016205496|83.1628646171; RT="z=1&dm=jd.com&si=w7897qavqek&ss=ks6ryi0a&sl=5&tt=8r8&ld=1x73t&nu=d41d8cd98f00b204e9800998ecf8427e&cl=1ycno"'
      },
      data: {
        "meetingName": "宙斯",
        "meetingCode": "2001007035",
        "workplaceCode": "1001000052",
        "districtCode": "13",
        "meetingEstimateDate": "2021-08-16",
        "meetingEstimateStime": 1400,
        "meetingEstimateEtime": 1500,
        "bookJoyMeeting": 0,
        "joyMeetingParam": {
          "meeting": {
            "password": ""
          }
        },
        "meetingSubject": "莫煜楷预约了宙斯",
        "lang": "zh"
      },
      success(res) {
        console.log(res.data)
        toast(res.data.message)
      },
      fail(err){
        console.log(err)
      }
    })

    // console.log(api)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var timer = setInterval(this.getTimer,500);
  },
  getTimer(){
    let timer = new Date()
    this.setData({
      timer:timer.getTime()
    })
    var comp = new Date()
    comp.setMinutes(44);
    comp.setSeconds(0)
    comp.setMilliseconds(0);
    if(timer.setMilliseconds(0) == comp.getTime()){
      toast.loading({
        duration: 500,
        forbidClick: true,
        message: "进程中..."
      })
      console.log("sss")                      
    }

  },

  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})