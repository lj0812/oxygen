import BaseDate from './baseDate'
import { LunarSolarConverter, Solar } from './lunar'

const converter = new LunarSolarConverter()

class calendar {
  constructor () {
    this._ghostDay = {
      isGhost: true
    }
  }

  init () {
  }

  createOneMonth (year, month, firstDayOfWeek = 0) {
    month = parseInt(month)
    let days = []

    const ym = `${year}年${month + 1}月`

    let thisMonth = new BaseDate(new Date(year, month, 1), firstDayOfWeek)

    for (let i = 0; i < thisMonth.prevMonthDays; i++) {
      days.push(this._ghostDay)
    }

    for (let i = 1; i <= thisMonth.days; i++) {
      let date = new Date(year, month, i)
      let _month = month + 1
      if (_month < 10) {
        _month = `0${_month}`
      }
      let _day = i < 10 ? `0${i}` : i
      let dateStr = `${year}-${_month}-${_day}`
      let weekday = date.getDay()
      let timestamp = date.getTime()
      let isWeekend = weekday === 0 || weekday === 6
      let isAgo = Date.now() - timestamp > 24 * 60 * 60 * 1000
      let localDateStr = date.toLocaleDateString()

      let solar = new Solar()
      solar.solarYear = year
      solar.solarMonth = month + 1
      solar.solarDay = i

      let _lunar = converter.SolarToLunar(solar)
      let lunar = this.chineseNumber(_lunar)

      days.push({
        id: Date.now() + Math.random(),
        gregorian: i,
        lunar,
        date,
        dateStr,
        weekday,
        timestamp,
        isWeekend,
        isAgo,
        localDateStr
      })
    }

    for (let i = 0; i < thisMonth.nextMonthDays; i++) {
      days.push(this._ghostDay)
    }

    return {
      ym,
      days
    }
  }

  chineseNumber (lunar) {
    let { lunarDay, lunarMonth } = lunar
    let res = ''
    var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
    if (lunarDay === 1) {
      res = monthHash[lunarMonth]
    } else if (lunarDay > 1 && lunarDay <= 10) {
      res = '初' + dateHash[lunarDay]
    } else if (lunarDay > 10 && lunarDay < 20) {
      res = '十' + dateHash[lunarDay - 10]
    } else if (lunarDay === 20) {
      res = '二十'
    } else if (lunarDay > 20 && lunarDay < 30) {
      res = '廿' + dateHash[lunarDay - 20]
    } else if (lunarDay === 30) {
      res = '三十'
    }
    return res
  }
}

export default calendar
