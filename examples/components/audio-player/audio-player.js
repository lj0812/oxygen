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
    this._audioList = {}
    this._activeId = ''
    this.activeAudio = null
    this.init()
  }

  get activeId () {
    return this._activeId
  }

  init () {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.bindAudioEvent()
  }

  bindAudioEvent () {
    const innerAudioContext = this.innerAudioContext

    innerAudioContext.onError((res) => {
      console.log('onError', res)
    })

    innerAudioContext.onWaiting(() => {
      console.log('onWaiting', new Date())
    })

    innerAudioContext.onCanplay(() => {
      console.log('onCanplay', new Date())
    })

    innerAudioContext.onPlay(() => {
      console.log('onPlay', new Date())
    })

    innerAudioContext.onTimeUpdate(() => {
      console.log(this._audioList[this._activeId].currentTime)
      if (!this._audioList[this._activeId].max) {
        let duration = innerAudioContext.duration.toFixed(3)
        this._audioList[this._activeId].max = duration
        this._audioList[this._activeId].maxStr = formatS2Ms(duration)
      }

      let currentTime = innerAudioContext.currentTime.toFixed(3)

      this._audioList[this._activeId].currentTime = currentTime
      this._audioList[this._activeId].currentTimeStr = formatS2Ms(currentTime)
    })

    innerAudioContext.onPause(() => {
      console.log('onPause', new Date())
    })

    innerAudioContext.onStop(() => {
      console.log('onStop', new Date())
    })

    innerAudioContext.onSeeking(() => {
      console.log('onSeeking', new Date())
    })

    innerAudioContext.onSeeked(() => {
      console.log('onSeeked', new Date())
    })

    innerAudioContext.onEnded(() => {
      console.log('onEnded', new Date())
      this._audioList[this._activeId].isPlaying = false
      this._audioList[this._activeId].currentTime = 0
      this._audioList[this._activeId].currentTimeStr = formatS2Ms(0)
    })
  }

  addAudio (audio) {
    // 已经添加了audio
    if (typeof this._audioList[audio.id] !== 'undefined') {
      return false
    }

    const newAudioData = this.enrichAudio(audio)
    this._audioList[audio.id] = newAudioData
  }

  enrichAudio (audio) {
    return Object.assign(audio, {
      isPlaying: false,
      currentTime: 0,
      currentTimeStr: formatS2Ms(0)
    })
  }

  play (audioId) {
    let audio = this._audioList[audioId]

    this._activeId = audio.id

    this.innerAudioContext.src = audio.src
    this.innerAudioContext.play()

    console.log(this.innerAudioContext.onTimeUpdate)
  }
}

export default new AudioManager()
