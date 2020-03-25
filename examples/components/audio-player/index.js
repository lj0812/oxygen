// components/audio-player/index.js
import audioManager from './audio-player'

const formatValue = val => {
  return val < 10 ? `0${val}` : val
}

const formatS2Ms = (s) => {
  let m = Math.floor(s / 60)
  s = Math.floor(s % 60)
  return `${formatValue(m)}:${formatValue(s)}`
}

const generateUUID = () => Date.now() + (Math.random() * 10e5 >> 0)

Component({
  externalClasses: ['ext-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    audioSource: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    audioId: '',
    audioData: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleAudio () {
      const audioId = this.audioId

      console.log(audioManager.paused)
      audioManager.stopAudio(audioManager.activeId)
      if (audioManager.activeId !== this.audioId) {
        audioManager.play(audioId)
      } else {
        audioManager.pause()
      }
    },

    audioProgressChanging (e) {
      console.log(e)
    },

    audioProgressChange (e) {
      console.log(e)
    }
  },

  lifetimes: {
    attached () {
      this.audioId = generateUUID()

      this.setData({
        audioData: Object.assign({}, {
          id: this.audioId,
          duration: 0,
          durationStr: '--:--',
          currentTime: 0,
          currentTimeStr: formatS2Ms(0),
          audioStatus: 'paused',
          updateCurrentTime: currentTime => {
            this.setData({
              'audioData.currentTime': currentTime,
              'audioData.currentTimeStr': formatS2Ms(currentTime)
            })
          },
          updateDuration: duration => {
            console.log('updateDuration', duration)
            this.setData({
              'audioData.duration': duration,
              'audioData.durationStr': formatS2Ms(duration)
            })
          },
          updateAudioStatus: status => {
            if (status === this.data.audioData.audioStatus) {
              return false
            }
            console.log('音频状态改变', status)

            this.setData({
              'audioData.audioStatus': status
            })
          }
        }, this.data.audioSource)
      })

      audioManager.addAudio(this.data.audioData)
    }
  }
})
