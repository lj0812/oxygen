class BaseDate {
  constructor (date = new Date(), firstDayOfWeek = 0) {
    this._date = date
    this.firstDayOfWeek = firstDayOfWeek

    this._getBaseDate()

    this._init()
  }

  _getBaseDate () {
    this.year = this._date.getFullYear()
    this.month = this._date.getMonth()
  }

  _init () {
    this.days = this._getMonthDayCount()
    this.firstDayWeekday = this._getFirstDayWeekday()
    this.prevMonthDays = (this.firstDayWeekday - this.firstDayOfWeek + 7) % 7
    this.nextMonthDays = (42 - (this.prevMonthDays + this.days)) % 7
  }

  _getMonthDayCount () {
    return new Date(this.year, this.month + 1, 0).getDate()
  }

  _getFirstDayWeekday () {
    const firstDay = new Date(this.year, this.month, 1)
    const firstDayWeekday = firstDay.getDay()
    return firstDayWeekday
  }
}

export default BaseDate
