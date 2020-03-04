const formatValue = val => {
  return val < 10 ? `0${val}` : val
}

const formatS2Ms = (s) => {
  let m = Math.floor(s / 60)
  s = Math.floor(s % 60)
  return `${formatValue(m)}:${formatValue(s)}`
}

class AudioManager {
  constructor () {
    this.audioList = []
    this.activeIndex = -1
    this.init()
  }

  // get activeIndex () {
  //   return this.activeIndex
  // }

  init () {
    this.innerAudioContent = wx.createInnerAudioContext()
  }

  bindAudioEvent () {
    const innerAudioContent = this.innerAudioContent

    innerAudioContent.onError((res) => {
      console.log('onError', res)
    })

    innerAudioContent.onWaiting(() => {
      console.log('onWaiting', new Date())
    })

    innerAudioContent.onCanplay(() => {
      console.log('onCanplay', new Date())
    })

    innerAudioContent.onPlay(() => {
      console.log('onPlay', new Date())
    })

    innerAudioContent.onTimeUpdate(() => {
      if (!this.audioList[this.activeIndex].max) {
        let duration = innerAudioContent.duration.toFixed(3)
        this.audioList[this.activeIndex].max = duration
        this.audioList[this.activeIndex].maxStr = formatS2Ms(duration)
      }

      let currentTime = innerAudioContent.currentTime.toFixed(3)

      this.audioList[this.activeIndex].currentTime = currentTime
      this.audioList[this.activeIndex].currentTimeStr = formatS2Ms(currentTime)
    })

    innerAudioContent.onPause(() => {
      console.log('onPause', new Date())
    })

    innerAudioContent.onStop(() => {
      console.log('onStop', new Date())
    })

    innerAudioContent.onSeeking(() => {
      console.log('onSeeking', new Date())
    })

    innerAudioContent.onSeeked(() => {
      console.log('onSeeked', new Date())
    })

    innerAudioContent.onEnded(() => {
      console.log('onEnded', new Date())
      this.audioList[this.activeIndex].isPlaying = false
      this.audioList[this.activeIndex].currentTime = 0
      this.audioList[this.activeIndex].currentTimeStr = formatS2Ms(0)
    })
  }

  pushAudio (audio) {
    this.audioList.push(this.initAnAudio(audio))

    console.log(this.audioList)
  }

  initAnAudio (audio) {
    return Object.assign(audio, {
      isPlaying: false,
      currentTime: 0,
      currentTimeStr: formatS2Ms(0),
      id: Date.now() + Math.random() * 10e5 >> 0
    })
  }
}

export default new AudioManager()
