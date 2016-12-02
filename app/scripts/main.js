let renderer, scene, camera, geometry, material, model
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
    camera.position.set(4, 4, 5)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera)
  }
}
let ctx = new Ctx()
ctx.init()
geometry = new THREE.CubeGeometry(1, 1, 1, 2, 2)
material = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  emissive: 0xff0000
})
model = new THREE.Mesh(geometry, material)
let light = new THREE.PointLight(0xffffff, 2, 100)
light.position.set(-10, 4, 5)
scene.add(light);
scene.add(model)
let actA = new TWEEN.Tween(model.position).to({
  x: -10,
  y:-10,
  z: -10
}, 4000).delay(2000).start()
let actB = new TWEEN.Tween(model.position).to({
  x: -10,
  y:-4,
  z: -10
}, 4000)
function animate() {
  stats.begin()
  stats.end()
  requestAnimationFrame(animate)
  actA.chain(actB)
  TWEEN.update()
  renderer.render(scene, camera)
}
animate()
