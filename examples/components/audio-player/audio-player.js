class AudioManager {
  constructor () {
    this._audioList = {}
    this._activeId = ''
    this._activeAudio = null
    this.init()
  }

  get activeId () {
    return this._activeId
  }

  get paused () {
    return this.innerAudioContext.paused
  }

  init () {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.bindAudioEvent()
  }

  bindAudioEvent () {
    const innerAudioContext = this.innerAudioContext

    innerAudioContext.onError((res) => {
      // this._activeAudio.updateAudioStatus('has-error')
    })

    innerAudioContext.onWaiting(() => {
      this._activeAudio.updateAudioStatus('waiting')
    })

    innerAudioContext.onCanplay(() => {
      console.log('总时长', innerAudioContext.duration)
      // this._activeAudio.updateAudioStatus('canplay')
    })

    innerAudioContext.onPlay(() => {
      // this._activeAudio.updateAudioStatus('play')
    })

    innerAudioContext.onTimeUpdate(() => {
      this._activeAudio.updateAudioStatus('playing')

      if (!this._activeAudio.duration) {
        const duration = innerAudioContext.duration.toFixed(3)
        this._activeAudio.updateDuration(duration)
      }

      const currentTime = innerAudioContext.currentTime.toFixed(3)
      this._activeAudio.updateCurrentTime(currentTime)
    })

    innerAudioContext.onPause(() => {
      // this._activeAudio.updateAudioStatus('paused')
    })

    innerAudioContext.onStop(() => {
      this._activeAudio.updateAudioStatus('paused')
    })

    innerAudioContext.onSeeking(() => {
      // this._activeAudio.updateAudioStatus('seeking')
    })

    innerAudioContext.onSeeked(() => {
      // this._activeAudio.updateAudioStatus('seeked')
    })

    innerAudioContext.onEnded(() => {
      this._activeAudio.updateAudioStatus('paused')
      this._activeAudio.updateCurrentTime(0)
      // 音频结束初始化
      this.initAudioActive()
    })
  }

  addAudio (audio) {
    // 已经添加了audio
    if (typeof this._audioList[audio.id] !== 'undefined') {
      return false
    }

    this._audioList[audio.id] = audio
  }

  initAudioActive () {
    // 音频结束初始化
    this._activeId = ''
    // this._activeAudio = null
  }

  setAudio (audioId) {
    const audio = this._audioList[audioId]

    this._activeAudio = audio

    this._activeId = audio.id

    this.innerAudioContext.src = audio.src
    this.innerAudioContext.seek(audio.currentTime)
  }

  play (audioId) {
    this.setAudio(audioId)
    this.innerAudioContext.play()
  }

  pause () {
    this.innerAudioContext.stop()
    this.initAudioActive()
  }

  stopAudio (audioId) {
    if (!audioId) {
      return false
    }
    const audio = this._audioList[audioId]
    audio.updateAudioStatus('paused')
    console.log(audio)
  }
}

export default new AudioManager()
