class index{

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


}

module.exports = index