const EventEmitter = require('events').EventEmitter
const test = require('ava')
const td = require('testdouble')

class SpStub extends EventEmitter {
  constructor (port, opts, cb) {
    super()
    cb(null, this)
  }

  close (cb) {
    cb()
  }
}

function mock (sp = SpStub) {
  td.replace('serialport', sp)
  return require('./connection')
}

test('.constructor() should resolve', t => {
  const M = mock()
  return t.notThrowsAsync(() => new M())
})

test('.state should be OPEN after .constructor() call', async t => {
  const M = mock()
  t.is((await new M()).state, M.states().OPEN)
})

test('.constructor() should reject on error', t => {
  class SpStub {
    constructor (port, opts, cb) {
      cb(new Error('erroror')) // eslint-disable-line standard/no-callback-literal
    }
  }
  const M = mock(SpStub)
  return t.throwsAsync(() => new M(), null, 'erroror')
})

test('.close() should resolve', async t => {
  const M = mock()
  const m = await new M()
  return t.notThrows(() => m.close())
})

test('.close() should reject on error', async t => {
  class SpStub {
    constructor (port, opts, cb) {
      cb()
    }

    close (cb) {
      cb(new Error('errors')) // eslint-disable-line standard/no-callback-literal
    }
  }
  const M = mock(SpStub)
  const m = await new M()
  return Promise.all([
    t.throwsAsync(() => m.close(), null, 'errors'),
    t.is(m.getState(), M.states().ERROR)
  ])
})

test('.getState() should always show correct state', async t => {
  const M = mock()
  const m = await new M()
  t.is(m.getState(), M.states().OPEN)
  t.is((await m.close()).getState(), M.states().CLOSED)
})

test('state should change to error if connection breaks', async t => {
  const M = mock()
  const m = await new M()
  m.port.emit('error')
  await new Promise(resolve => setTimeout(resolve, 10))
  t.is(m.getState(), M.states().ERROR)
})

test('state should change to closed if connection ends', async t => {
  const M = mock()
  const m = await new M()
  m.port.emit('close')
  await new Promise(resolve => setTimeout(resolve, 10))
  t.is(m.getState(), M.states().CLOSED)
})
