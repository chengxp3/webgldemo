"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function animate(){renderer.setClearColor(16777215,.3),renderer.render(scene,camera),stats.begin(),stats.end(),console.log(),requestAnimationFrame(animate)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),renderer=void 0,scene=void 0,camera=void 0,geometry=void 0,material=void 0,model=void 0,line=void 0,lineGeometry=void 0,cameraCtrl=void 0,stats=new Stats;stats.showPanel(0),document.body.appendChild(stats.dom);var Ctx=function(){function e(){_classCallCheck(this,e),this.width=2*window.innerWidth,this.height=2*window.innerHeight}return _createClass(e,[{key:"init",value:function(){$("#canvas")[0].width=this.width,$("#canvas")[0].height=this.height,renderer=new THREE.WebGLRenderer({canvas:$("#canvas")[0],antialias:!0,maxLights:1}),scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,4e3),camera.position.set(600,600,1e3),camera.lookAt(new THREE.Vector3(0,0,0)),scene.add(camera),this.initGrid(),this.control()}},{key:"initGrid",value:function(){var e=new THREE.GridHelper(200,200);scene.add(e)}},{key:"control",value:function(){cameraCtrl=new THREE.OrbitControls(camera,renderer.domElement),cameraCtrl.target.set(0,0,0),cameraCtrl.update()}}]),e}(),ctx=new Ctx;ctx.init();var light=new THREE.DirectionalLight(16777215,.5);light.position.set(0,1,0),scene.add(light),lineGeometry=new THREE.Geometry,lineGeometry.vertices.push(new THREE.Vector3((-1),0,10),new THREE.Vector3(0,(-.5),10),new THREE.Vector3(1,0,10)),line=new THREE.Line(lineGeometry,new THREE.LineBasicMaterial({color:16515842})),scene.add(line);var mtlModel=new THREE.MTLLoader;mtlModel.setPath("../images/OBJ/tex/"),mtlModel.load("../alduin.mtl",function(e){e.preload();var t=new THREE.OBJLoader;t.setMaterials(e),t.load("../images/OBJ/alduin.obj",function(e){console.log(e),e.name="dragon",scene.add(e),renderer.render(scene,camera),camera.lookAt(e.position),animate()})});