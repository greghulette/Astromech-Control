const test = require('ava')
const td = require('testdouble')

function mock (sp = { list: cb => cb() }) {
  td.replace('serialport', sp)
  td.replace('./connection')
  return require('./serialio')
}

test('.ports() should resolve to list of ports', async t => {
  const m = mock({ list: () => Promise.resolve('weeo') })
  t.is(await m.ports(), 'weeo')
})

test('.ports() should reject if erronous', t => {
  const m = mock({ list: () => Promise.reject(new Error('erroror'), 'weeo') }) // eslint-disable-line standard/no-callback-literal
  return t.throwsAsync(() => m.ports(), null, 'erroror')
})

test('.send() single command', t => {
  const m = mock()
  t.truthy(m.send)
})

test('.connect()', t => {
  const m = mock()
  m.connect()
  t.notThrows(m.connect)
})
