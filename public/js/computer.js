io.protocol = 1
var socket = io.connect({ forceNew: true })

socket.on('setup', (data) => {
  $('.container')
    .append('<div></div>')
    .children()
    .last()
      .attr('id', data.uuid)
      .css('width', `${data.width / 2}px`)
      .css('height', `${data.height / 2}px`)
      .css('background-color', data.color)
      .append(`${data.name} ${data.width}x${data.height}`)
})

socket.on('position', (data) => {
  // console.log(data.position)
  // console.log(normal_xyz(data))

  $('.container').find(`#${data.uuid}`)
  .css('transform', `
    rotateX(${- data.position.beta + 90}deg)
    rotateY(${data.position.gamma}deg)
    rotateZ(0deg)
  `)
})

socket.on('remove', (uuid) => {
  $('.container').find(`#${uuid}`).remove()
})

function normal_xyz(data) {
  // return `x: ${data.position.x.toFixed(2)} y: ${data.position.y.toFixed(2)} z: ${data.position.z.toFixed(2)}`
}
