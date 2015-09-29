var socket = io.connect({ forceNew: true })
socket.uuid = uuid()
socket.color = random_hsla()

console.log(socket.color)

$('.container')
  .css('background-color', socket.color)

socket.emit('setup', {
  uuid: socket.uuid,
  name: device_name(),
  color: socket.color,
  width: window.screen.width,
  height: window.screen.height,
  features: gyro.getFeatures()
})

window.addEventListener('deviceorientation', function (event) {
  // $.throttle(1000, function (event){
    socket.emit('position', {
      uuid: socket.uuid,
      position: event
    })
  // })
}, true)

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function random_hsla() {
  return `hsl(${random(0, 360)}, 30%, 80%)`
}

function random(from, to) {
  return Math.floor((Math.random() * to) + from);
}

function device_name() {
  var agent = navigator.userAgent;

  if (/iPhone/.test(agent)) return 'iPhone'
  else if (/iPad/.test(agent)) return 'iPad'
  else return 'Other'
}
