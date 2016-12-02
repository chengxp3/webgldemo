let renderer, scene, camera, geometry, material, model;
let stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom);

class Ctx {
  constructor() {
    this.width = window.innerWidth * 2
    this.height = window.innerHeight * 2
  }
  init() {
    $('#canvas')[0].width = this.width
    $('#canvas')[0].height = this.height
    renderer = new THREE.WebGLRenderer({
      canvas: $('#canvas')[0]
    })
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
    camera.position.set(1, 1, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera)
  }
}
let ctx = new Ctx()
ctx.init()
geometry = new THREE.Geometry()
geometry.vertices.push(
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(10, 0, 0)
)
material = new THREE.LineBasicMaterial({
  color: 0x0000ff
})
var line = new THREE.Line( geometry, material )
scene.add(line)
renderer.render(scene, camera)

function animate() {
  stats.begin()
  stats.end()
  requestAnimationFrame(animate)
}
animate()
