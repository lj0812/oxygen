// components/select-group/index.js
const DEFAULT_MAPPER = { label: 'label', value: 'value' }

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keyOpts: {
      type: Array,
      value: []
    },
    keyValues: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    labels: [],
    activeIndex: -1,
    currentOpts: [],
    currentMapper: DEFAULT_MAPPER,
    currentData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleActiveIndex (e) {
      let { currentTarget: { dataset: { index = this.data.activeIndex } } } = e

      this.setData({
        activeIndex: index === this.data.activeIndex ? -1 : index
      })
    },

    selectOpt (e) {
      let { currentTarget: { dataset: { item } } } = e

      const { key } = this.data.currentData
      const { value: mapperValue } = this.data.currentMapper

      this.setData({
        [`keyValues.${key}`]: item[mapperValue]
      })

      console.log(this.data.keyValues)
    }
  },
  observers: {
    activeIndex (index) {
      if (index === -1) {
        return false
      }

      this.setData({
        currentOpts: this.data.keyOpts[index].opts,
        currentMapper: this.data.keyOpts[index].mapper || DEFAULT_MAPPER,
        currentData: this.data.keyOpts[index]
      })
    },

    'keyOpts,keyValues.**': function (keyOpts, keyValues) {
      console.log('change', keyOpts, keyValues)
      const labels = keyOpts.map(item => {
        const { key, opts, name, mapper = DEFAULT_MAPPER } = item
        const { label: mapperLable, value: mapperValue } = mapper

        const currValue = keyValues[key]

        const opt = opts.find(opt => currValue === opt[mapperValue])

        if (opt) {
          return opt[mapperLable]
        }

        return name
      })

      this.setData({
        labels
      })
    }
  },
  lifetimes: {
    attached () {
      this.setData({
        labels: this.data.keyOpts.map(item => {
          const { key, opts, name, mapper = DEFAULT_MAPPER } = item
          const { label: mapperLable, value: mapperValue } = mapper

          const currValue = this.data.keyValues[key]

          const opt = opts.find(opt => currValue === opt[mapperValue])

          if (opt) {
            return opt[mapperLable]
          }

          return name
        })
      })
    }
  }
})
