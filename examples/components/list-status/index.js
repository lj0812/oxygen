// components/list-status/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasError: {
      type: Boolean,
      default: false
    },
    hasLoadedAll: {
      type: Boolean,
      default: false
    },
    listTotal: {
      type: Number,
      default: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onErrorTap () {
      this.triggerEvent('reload')
    }
  }
})
