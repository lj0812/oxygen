// components/voice-word/index.js
import Recorder from './recorder'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    recorderName: Date.now(),
    recorder: null,
    isRecording: false,
    showPageModal: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTouchStart() {
      wx.getSetting({
        success: res => {
          let { authSetting } = res
          let recordSetting = authSetting['scope.record']

          if (typeof recordSetting !== 'undefined' && !recordSetting) {
            this.setData({
              showPageModal: true
            })
            return false
          }
        }
      })

      this.recorder.start()
    },

    onTouchEnd() {
      this.recorder.stop()
    },

    onTouchCancel() {
      this.recorder.stop()
    },

    modalCancel () {
      this.setData({
        showPageModal: false
      })
    },

    goAuth () {
      this.setData({
        showPageModal: false
      })
    }
  },

  lifetimes: {
    attached () {
      const recorderName = this.data.name || Date.now()
      this.recorderName = recorderName

      this.recorder = new Recorder(recorderName, {
        onStart: () => {
          this.setData({
            isRecording: true
          })
        },
        onStop: tempFilePath => {
          console.log('结束了', tempFilePath)
          this.setData({
            isRecording: false
          })

          this.triggerEvent('change', {
            value: tempFilePath
          })
        }
      })
    }
  }
})
