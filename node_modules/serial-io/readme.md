serial-io
===

[![npm version](https://img.shields.io/npm/v/serial-io.svg)](https://www.npmjs.com/package/serial-io)
[![Build Status](https://travis-ci.org/anoff/serial-io.svg?branch=master)](https://travis-ci.org/anoff/serial-io)
[![Coverage Status](https://coveralls.io/repos/github/anoff/serial-io/badge.svg?branch=master)](https://coveralls.io/github/anoff/serial-io?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/anoff/serial-io.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/npm/serial-io/badge.svg)](https://snyk.io/test/npm/serial-io)
[![Outdated dependencies](https://david-dm.org/anoff/serial-io.svg)](https://david-dm.org/anoff/serial-io)

> serialport interface for batch style commands

This module is a **promise** based wrapper for the [node-serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport) package.
It allows you to interact with devices on a **command & response** basis. Based on a defined `terminator` or `timing` behavior the end of a response is deterimed and the complete response returned as a _resolved_ `Promise`.

<!-- TOC depthFrom:1 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
	- [serialIo.ports()](#serialioports)
	- [serialIo.send(portName, content, {options})](#serialiosendportname-content-options)
		- [portName](#portname)
		- [content](#content)
		- [options](#options)
	- [serialIo.connect(portName, {options})](#serialioconnectportname-options)
		- [portName](#portname)
		- [options](#options)
	- [connection.close()](#connectionclose)
	- [connection.send(content, {options})](#connectionsendcontent-options)
		- [content](#content)
		- [options](#options)
	- [connection.getState()](#connectiongetstate)
- [License](#license)

<!-- /TOC -->

# Install

```
$ npm install --save serial-io
```


# Usage

```js
const serialIo = require('serial-io');

// this will send HELLO to the device and resolve with
//  anything that gets received within 100ms
serialIo.send('thisPortName', 'HELLO')
.then(response => console.log(`device responded:\n${response}`))

// if you don't know the devices port name try
serialIo.ports().then(console.log.bind(console))

// will show the response of a device on port '/dev/cu.usbmodem1411' (assuming it reacts to 'version\n')
serialIo.send('/dev/cu.usbmodem1411', 'version\n').then(console.log.bind(console))
```

# API
The package exposes two APIs with different abstraction levels.
Directly interacting with the `serialIo` objects gives you the highest level of abstraction.

If you use `serialIo.connect()` you get a `Connection` object returned that allows you to do things like multiple requests without re-connecting every time.
Using the `Connection` API is recommended for programmatic use cases, whereas the high level `serialIO.send()` API is great for handling events that are triggered by humans i.e. low frequency.

All methods are _promise-based_.

## serialIo.ports()
Resolves to a list of available serial ports. Refer to the [serialport documentation](https://github.com/EmergingTechnologyAdvisors/node-serialport#module_serialport--SerialPort.list) for a specification of the returned data.

## serialIo.send(portName, content, {options})
Single interaction with a `device`. Opens up a connection, transmits the `content` and waits for the response to resolve the returned `Promise`.

### portName

Type: `string`

A valid portname.

### content

Type: `string`

Payload to send.

### options
#### terminator

Type: `string`<br>
Default: `none`

If the specified `terminator` string/character is found within the response the `Promise` is resolved immediately with the capture data. The returned data includes the `terminator`.

#### timeoutInit

Type: `number` in ms<br>
Default: `100`

Time to listen to the device for a (first) response.

#### timeoutRolling

Type: `number` in ms<br>
Default: `10`

Time to wait after receiving a data chunk until the next one arrives. If the timer runs out the response is `resolved`.

## serialIo.connect(portName, {options})
Opens up a `Connection` to the given port.
This method is **NOT** _promise-based_ it will return the `Connection` object directly.

### portName

Type: `string`

A valid portname.

### options

Refer to [serialport openOptions](https://github.com/EmergingTechnologyAdvisors/node-serialport#module_serialport--SerialPort..openOptions) for an overview of available options.

## connection.close()

Closes the `Connection` instance.

## connection.send(content, {options})
Send `content` over the connection and wait for an answer. The method returns a `Promise` that will resolve to the received answer. Using `options` you can define how listening to answer is done.

### content

Type: `string`

Payload to send.

### options
#### terminator

Type: `string`<br>
Default: `none`

If the specified `terminator` string/character is found within the response the `Promise` is resolved immediately with the capture data. The returned data includes the `terminator`.

#### timeoutInit

Type: `number` in ms<br>
Default: `100`

Time to listen to the device for a (first) response.

#### timeoutRolling

Type: `number` in ms<br>
Default: `10`

Time to wait after receiving a data chunk until the next one arrives. If the timer runs out the response is `resolved`.

## connection.getState()
Tells you something about the current connection.

# License

MIT © [anoff](http://github.com/anoff)
