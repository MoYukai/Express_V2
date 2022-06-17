
/** 
 * 获取用户的头像信息函数
 * @param {string} desc 声明获取用户个人信息后的用途，后续会展示在弹窗中
 **/
const getUserProfile = (desc) => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: desc,
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log("===== 获取用户信息失败 =====", err)
        resolve(false)
      }
    })
  })
}

/** 
 * 上传文件封装函数, 文件名已作随机处理
 * 由17位随机字符+13位时间戳组成
 * @param filePath 要上传文件的临时路径
 * @param cloudPathPrefix 云数据库存储位置的文件夹
 * 例如：dir/xxx.txt 则只需要传入dir即可
 */
const uploadFile = (filePath, cloudPathPrefix) => {
  // 取随机名
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomStr = '';
  for (let i = 17; i > 0; --i) {
    randomStr += str[Math.floor(Math.random() * str.length)];
  }
  randomStr += new Date().getTime()

  return new Promise((resolve, reject) => {
    let suffix = /\.\w+$/.exec(filePath)[0] //正则表达式返回文件的扩展名
    let cloudPath = cloudPathPrefix + '/' + randomStr + suffix
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log("===== 图片上传失败 =====", err)
        resolve(false)
      },
    })
  })
}

/** 
 * 选择图片封装函数
 * @param count 可选择的照片数量, 默认可选择1张
 * @param sizeType 照片的质量, 默认 ['original', 'compressed']
 * @param sourceType 照片来源, 默认 ['album', 'camera']
 */
const chooseImg = (count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.log("===== 选取照片失败 =====", err)
        resolve(false)
      }
    })
  })
}

/**
 * 对象数据判空校验器, 通过返回true,否则返回false
 * @param {object} obj 数据对象
 * @param {Array} noVerList 不检测空值的keyName数组
 */
const checkData = (obj, noVerList) => {
  if (!noVerList) noVerList = []
  for (let key in obj) {
    if ((obj[key] == null ||
        obj[key].length == 0 ||
        obj[key] == '') &&
      (noVerList.indexOf(key) == -1)
    ) {
      return false
    }
  }
  return true
}

/** 
 * 生成随机字符/数字串
 * @param {string} strOrNum 生成字符串还是纯数字串 默认字符串 字符串:str 数字串:num
 * @param {number} length 需要生成的长度,默认1个长度的字符串
 */
const getRandomStrOrNum = (strOrNum = 'str', length = 1) => {
  let str = ''
  if (strOrNum == 'str') {
    str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  } else {
    str = '0123456789'
  }
  let randomStr = ''
  for (let i = length > 13 ? length - 13 : length; i > 0; --i) {
    randomStr += str[Math.floor(Math.random() * str.length)]
  }
  if (length === 13) {
    randomStr = new Date().getTime()
  } else if (length > 13) {
    randomStr += new Date().getTime()
  }
  return randomStr
}

/** 
 * 消除计算误差
 * @param f 需要消除的数字
 * @param digit 需要保留小数位数
 */
const formatNum = (f, digit) => {
  let m = Math.pow(10, digit);
  return parseInt(f * m, 10) / m;
}

/** 
 * 调用云函数
 * @param {string} cloudFunName
 * @param {object} eventData
 **/
const callCloudFun = async (cloudFunName, eventData) =>{
  return await wx.cloud.callFunction({
    name: cloudFunName,
    data: eventData
  })
}

/** 
 * 调起微信支付弹窗
 * @param {object} payment 免鉴权参数对象
 */
const wxPay = (payment) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...payment,
      success(res) {
        resolve({
          status: true,
          msg: res
        })
      },
      fail(err) {
        resolve({
          status: false,
          msg: err
        })
      }
    })
  })
}

module.exports = {
  getUserProfile: getUserProfile,
  uploadFile: uploadFile,
  chooseImg: chooseImg,
  checkData: checkData,
  getRandomStrOrNum: getRandomStrOrNum,
  formatNum: formatNum,
  wxPay: wxPay,
  callCloudFun: callCloudFun
}