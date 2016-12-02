let renderer, scene, camera, geometry, material, model, line, lineGeometry, cameraCtrl;
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
      canvas: $('#canvas')[0],
      antialias:true,
      maxLights:1,
    })
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 4000)
    camera.position.set(600, 600, 1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera)
    this.initGrid()
    this.control()
  }
  initGrid() {
    // 网格的边长是1000，每个小网格的边长是50
    let helper = new THREE.GridHelper(200, 200);
    scene.add(helper);
  }
  control() {
    cameraCtrl = new THREE.OrbitControls(camera, renderer.domElement)
    cameraCtrl.target.set(0, 0, 0);
    cameraCtrl.update();
  }
}
let ctx = new Ctx()
ctx.init()
//model
// geometry = new THREE.CubeGeometry(20, 20, 20, 20, 20)
// material = new THREE.MeshLambertMaterial({
//   color: 0x357FBE,
//   emissive: 0x9AD3EC,
//   wireframe: true
// })
// model = new THREE.Mesh(geometry, material)
// scene.add(model)

//light
let light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 0, 1, 0 );
scene.add(light)

//line
lineGeometry = new THREE.Geometry()
lineGeometry.vertices.push(
  new THREE.Vector3(-1, 0, 10),
  new THREE.Vector3(0, -.5, 10),
  new THREE.Vector3(1, 0, 10),
);
line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
  color: 0xFC0302
}))
scene.add(line);

let mtlModel = new THREE.MTLLoader()
mtlModel.setPath('../images/OBJ/tex/');
mtlModel.load('../alduin.mtl', (mtl)=>{
  mtl.preload()
  let objModel =  new THREE.OBJLoader()
  objModel.setMaterials(mtl);
  objModel.load('../images/OBJ/alduin.obj', (obj)=>{
    console.log(obj);

    obj.name='dragon'
    scene.add(obj)
    renderer.render(scene, camera)
    camera.lookAt(obj.position);
    animate()
  })
})
function animate() {
  renderer.setClearColor(0xffffff,0.3);
  renderer.render(scene, camera)
  stats.begin()
  stats.end()
  console.log();
  requestAnimationFrame(animate)
}
