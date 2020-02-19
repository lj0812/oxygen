// pages/select-group.js
const opts = [
  {
    key: 'name',
    name: '姓名',
    opts: [
      {
        label: '张三',
        value: '张三'
      }, {
        label: '李四',
        value: '李四'
      }
    ]
  },
  {
    key: 'color',
    name: '颜色',
    opts: [
      {
        name: '红色',
        id: 1
      },
      {
        name: '黄色',
        id: 2
      },
      {
        name: '绿色',
        id: 3
      }
    ],
    mapper: {
      label: 'name',
      value: 'id'
    }
  },
  {
    key: 'status',
    name: '状态',
    opts: [
      {
        label: '初始化',
        value: 'init'
      },
      {
        label: '开始',
        value: 'created'
      },
      {
        label: '挂载',
        value: 'mounted'
      },
      {
        label: '销毁',
        value: 'destory'
      }
    ]
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyOpts: [...opts],
    keyValues: {
      name: '',
      color: '',
      status: 'init'
    }
  },

  selectGroupChange (e) {

  }
})
