// components/page-btn/index.js
Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    active: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: String,
      optionalTypes: [Boolean, String],
      value: false
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

  }
})
