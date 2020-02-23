const ONE_DAY_MS = 86400000
const THIS_YEAR = new Date().getFullYear()

const createYears = () => {
  let { year } = timestamp2Semantic(Date.now())
  let arr = [year, year + 1]
  return arr.map(i => ({
    label: `${i}年`,
    value: i
  }))
}

const createMonths = (start = 0) => {
  let arr = []
  for (let i = start; i <= 11; i++) {
    arr.push({
      label: `${i + 1}月`,
      value: i
    })
  }
  return arr
}

const createDays = (year, month) => {
  let days = new Date(year, month + 1, 0).getDate()
  let arr = []
  for (let i = 1; i <= days; i++) {
    arr.push({
      label: `${i}日`,
      value: i
    })
  }
  return arr
}

const createHours = () => {
  let arr = []
  for (let i = 0; i < 24; i++) {
    arr.push({
      label: (i < 10 ? `0${i}` : i) + '时',
      value: i
    })
  }
  return arr
}

const createMinutes = () => {
  let arr = []
  for (let i = 0; i < 60; i++) {
    arr.push({
      label: (i < 10 ? `0${i}` : i) + '分',
      value: i
    })
  }
  return arr
}

const createWeekLabel = (index, prefix = '周') => {
  let week = ['日', '一', '二', '三', '四', '五', '六']
  if (typeof index !== 'undefined') {
    return `${prefix}${week[index]}`
  }
  return week.map(v => `${prefix}${v}`)
}

const createWeeks = (prefix = '周') => {
  let arr = []
  let week = createWeekLabel(undefined, prefix)
  for (let i = 0; i < 7; i++) {
    arr.push({
      label: `${week[i]}`,
      value: i
    })
  }
  return arr
}

function formatValue (val) {
  return val < 10 ? `0${val}` : val
}

export const formatS2Ms = (s) => {
  let m = Math.floor(s / 60)
  s = Math.floor(s % 60)
  return `${formatValue(m)}:${formatValue(s)}`
}

function formatWeek (week, weekPrefix = '周') {
  let weekMap = ['日', '一', '二', '三', '四', '五', '六']

  return `${weekPrefix}${weekMap[week]}`
}

export const timestamp2Semantic = (timestamp) => {
  let time = new Date(timestamp)

  let year = time.getFullYear()
  let month = time.getMonth()
  let day = time.getDate()
  let week = time.getDay()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()

  let cMonth = formatValue(month + 1)
  let cDay = formatValue(day)
  let cWeek = formatWeek(week)
  let cHour = formatValue(hour)
  let cMinute = formatValue(minute)
  let cSecond = formatValue(second)

  return { year, month, day, week, hour, minute, second, cMonth, cDay, cWeek, cHour, cMinute, cSecond }
}

const getYTT = timestamp => {
  let arr = ['昨天', '今天', '明天']
  let { year, month, cDay } = timestamp2Semantic(Date.now())
  let todayTimestamp = new Date(year, month, cDay).getTime()

  let dayGap = Math.floor((timestamp - todayTimestamp) / ONE_DAY_MS)

  return arr[dayGap + 1]
}

export const getHourAndMinuteStr = timestamp => {
  if (timestamp < 2000000000) timestamp *= 1000
  let { cHour, cMinute } = timestamp2Semantic(timestamp)
  return `${cHour}:${cMinute}`
}

export const getSematicDate = timestamp => {
  timestamp += ''
  if (timestamp.length === 8) {
    let year = timestamp.slice(0, 4)
    let month = timestamp.slice(4, 6)
    let cDay = timestamp.slice(6)
    timestamp = new Date(`${year}-${month}-${cDay}`).getTime()
  } else if (timestamp < 2000000000) {
    timestamp *= 1000
  }

  timestamp = parseInt(timestamp)

  if (typeof timestamp !== 'number' || timestamp === 0) {
    return ''
  }

  let date = getYTT(timestamp)
  if (!date) {
    let { year, cMonth, cDay } = timestamp2Semantic(timestamp)
    date = `${cMonth}-${cDay}`
    if (THIS_YEAR !== year) {
      date = `${year}-${date}`
    }
  }

  return date
}

export const getYearMonthDay = (timestamp = Date.now(), hyphen = '-') => {
  if (timestamp < 2000000000) timestamp *= 1000

  let { year, cMonth, cDay } = timestamp2Semantic(timestamp)

  return `${year}${hyphen}${cMonth}${hyphen}${cDay}`
}

export const getTomorrowTimestamp = (timestamp) => {
  if (timestamp < 2000000000) timestamp *= 1000

  let { year, month, day } = timestamp2Semantic(timestamp)

  return new Date(year, month, day + 1).getTime()
}

export const getYearMonth = (timestamp, hyphen) => {
  if (timestamp < 2000000000) timestamp *= 1000
  let { year, month } = timestamp2Semantic(timestamp)

  return hyphen ? `${year}${hyphen}${month}` : { year, month }
}

export default {
  // 基础方法
  createYears,
  createMonths,
  createDays,
  createHours,
  createMinutes,
  createWeeks,
  timestamp2Semantic
}
