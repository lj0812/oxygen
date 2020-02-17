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
    onTap (index) {
      if (index === this.currentIndex) {
        return false
      }

      this.currentIndex = index

      this.triggerEvent('click', { value: index })
    }
  },
  lifetimes: {
    attached () {
      this.setData({
        'data.currentIndex': this.activeIndex
      })
      console.log(this)
    }
  }
})
