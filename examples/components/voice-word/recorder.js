const acceptor = {}
let currAcceptor = null

const defaultOptions = {
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'mp3',
  frameSize: 20
}

const wxRecorderManager = wx.getRecorderManager()

wxRecorderManager.onStart(function (res) {
  // 因为录音是异步，触控是同步，有可能出现，还没开始录音就已经要结束的情况
  if (acceptor[currAcceptor]._status === 'stopped') {
    wxRecorderManager.stop()
  }

  acceptor[currAcceptor].onStart()
  acceptor[currAcceptor]._status = 'recording'
})

wxRecorderManager.onStop(function (res) {
  let { tempFilePath } = res

  acceptor[currAcceptor].onStop(tempFilePath)
  acceptor[currAcceptor]._status = 'ending'
})

class Recorder {
  constructor (name, config) {
    this.name = name
    acceptor[name] = {
      _status: 'init',
      ...config
    }
  }

  start (options = defaultOptions) {
    currAcceptor = this.name
    acceptor[currAcceptor]._status = 'started'
    wxRecorderManager.start(options)
  }

  stop () {
    currAcceptor = this.name
    if (acceptor[currAcceptor]._status === 'recording') {
      wxRecorderManager.stop()
    }
    acceptor[currAcceptor]._status = 'stopped'
  }
}

export default Recorder
