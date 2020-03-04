// components/audio-player/index.js
import audioManager from './audio-player'

Component({
  externalClasses: ['ext-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    audioData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    audioStatus: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached () {
      audioManager.pushAudio()
    }
  }
})
