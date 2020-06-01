const SerialPort = require('serialport')
SerialPort.list().then(
  ports => ports.forEach(console.log),
  err => console.error(err)
)