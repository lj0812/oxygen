// components/audio-player/index.js
import audioManager from './audio-player'

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
    audioData: null,
    audioStatus: 'init'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleAudio () {
      const audioId = this.audioId
      if (audioManager.activeId !== this.audioId) {
        audioManager.play(audioId)
      }
    }
  },

  lifetimes: {
    attached () {
      this.audioId = Date.now() + (Math.random() * 10e5 >> 0)

      this.setData({
        audioData: Object.assign({}, { id: this.audioId }, this.data.audioSource)
      })

      audioManager.addAudio(this.data.audioData)
    }
  }
})
