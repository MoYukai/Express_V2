const sms = require('./sms/index')
const getOpenId = require('./getOpenId/index')
const getTime = require('./getTime/index')
const uniformMessage = require('./uniformMessage/index')
const pay = require('./pay/index')
const cdb = require('./cdb/index')
const admin_panel_processing = require('./cdb/admin/panel/processing/index')
const vms = require('./vms/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'vms':
      return await vms.main(event,context)
    case 'sms':
      return await sms.main(event, context)
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'getTime':
      return await getTime.main(event, context)
    case 'uniformMessage':
      return await uniformMessage.main(event, context)
    case 'pay':
      return await pay.main(event, context)
    case 'cdb':
      return await cdb.main(event,context)
    case 'adminPanelProcessing':
      return await admin_panel_processing.main(event,context)
  }
}