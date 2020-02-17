// components/topbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topbarList: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap (e) {
      const { currentTarget: { dataset: { index } } } = e

      if (index === this.data.currentIndex) {
        return false
      }

      this.setData({
        currentIndex: index
      })

      this.triggerEvent('click', { value: index })
    }
  },
  lifetimes: {
    attached () {
      this.setData({
        currentIndex: this.data.activeIndex
      })
    }
  }
})
