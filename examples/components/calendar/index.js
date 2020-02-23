// components/calendar/index.js
import Calendar from './utils/index'
import { getYearMonth, timestamp2Semantic } from './utils/time.js'

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const calendarManage = new Calendar()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTimeShow: {
      type: Boolean,
      value: false
    },
    timeGap: {
      type: Number,
      value: 180
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 日历
    calendarList: [],
    currCalendarIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initCalendarList (timeGap = 180) {
      let calendarList = []
      let now = Date.now()
      let ym = []
      let ymStr = ''
      let canSelect = []

      let i = Math.min(0, timeGap)
      let end = Math.max(0, timeGap)

      for (; i <= end; i++) {
        ymStr = getYearMonth(now + i * ONE_DAY_MS, '-')
        if (!ym.includes(ymStr)) {
          ym.push(ymStr)
        }

        let date = timestamp2Semantic(now + i * ONE_DAY_MS)
        canSelect.push(new Date(date.year, date.month, date.day).getTime())
      }

      ym.forEach((str, index) => {
        let [y, m] = str.split('-')
        let oneMonth = calendarManage.createOneMonth(y, m, 1)
        calendarList.push(oneMonth)
      })

      calendarList.forEach((month, index) => {
        month.days.forEach(item => {
          if (!item.isGhost) {
            item.disable = !canSelect.includes(item.timestamp)
            if (item.localDateStr === new Date().toLocaleDateString()) {
              this.updateCalendarIndex(index)
            }
          }
        })
      })

      this.setData({
        calendarList
      })
    },

    updateCalendarIndex (index) {
      this.setData({
        currCalendarIndex: index
      })
    },

    toggleYm (e) {
      let { currentTarget: { dataset: { direction } } } = e
      direction = parseInt(direction)

      if (
        (this.data.currCalendarIndex === 0 && direction < 0) ||
        (this.data.currCalendarIndex === this.data.calendarList.length - 1 && direction > 0)
      ) {
        return false
      }

      this.setData({
        currCalendarIndex: this.data.currCalendarIndex + direction
      })
    },

    calendarChange (e) {
      let { current } = e.detail
      this.setData({
        currCalendarIndex: current
      })
    },

    selectTime (e) {
      let { currentTarget: { dataset: { day } } } = e

      if (day.isGhost) {
        return false
      }

      if (day.disable) {
        wx.showModal({
          title: '提示',
          content: '不可点击'
        })
        return false
      }

      this.triggerEvent('change', { value: day })
    },

    toggleCalendar () {
      this.setData({
        isTimeShow: false
      })
    },

    ghost () {
      return false
    },
  },
  lifetimes: {
    attached () {
      this.initCalendarList(this.data.timeGap)
    }
  }
})
