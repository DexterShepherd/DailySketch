
var stats, scene, renderer, composer;
var camera, cameraControls;

if( !init() )	animate();

// init the scene
function init(){

  if( Detector.webgl ){
    renderer = new THREE.WebGLRenderer({
      antialias		: true,	// to get smoother output
      preserveDrawingBuffer	: true	// to allow screenshot
    });
    renderer.setClearColor( 0xbbbbbb );
  }else{
    Detector.addGetWebGLMessage();
    return true;
  }
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('container').appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position	= 'absolute';
  stats.domElement.style.bottom	= '0px';
  document.body.appendChild( stats.domElement );

  // create a scene
  scene = new THREE.Scene();

  // put a camera in the scene
  camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // create a camera contol
  cameraControls	= new THREE.TrackballControls( camera )

  // transparently support window resize
  THREEx.WindowResize.bind(renderer, camera);
  // allow 'p' to make screenshot
  THREEx.Screenshot.bindKey(renderer);
  // allow 'f' to go fullscreen where this feature is supported
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey();		
    document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
  }

  // here you add your objects
  // - you will most likely replace this part by your own
  var light	= new THREE.AmbientLight( Math.random() * 0xffffff );
  scene.add( light );
  var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );
  var light	= new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );
  var light	= new THREE.PointLight( Math.random() * 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
        .normalize().multiplyScalar(1.2);
  scene.add( light );
  var light	= new THREE.PointLight( Math.random() * 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 )
        .normalize().multiplyScalar(1.2);
  scene.add( light );

  var geometry	= new THREE.SphereGeometry( 1, 16, 8 );
  var material	= new THREE.MeshPhongMaterial({ambient: 0x808080, color: Math.random() * 0xffffff});
  var mesh	= new THREE.Mesh( geometry, material ); 
  scene.add( mesh );
}

// animation loop
function animate() {

  requestAnimationFrame( animate );

  render();

  stats.update();
}

// render the scene
function render() {
  // variable which is increase by Math.PI every seconds - usefull for animation
  var PIseconds	= Date.now() * Math.PI;

  // update camera controls
  cameraControls.update();

  // animation of all objects
  scene.traverse(function(object3d, i){
    if( object3d instanceof THREE.Mesh === false )	return
    object3d.rotation.y = PIseconds*0.0003 * (i % 2 ? 1 : -1);
    object3d.rotation.x = PIseconds*0.0002 * (i % 2 ? 1 : -1);
  })
  // animate DirectionalLight
  scene.traverse(function(object3d, idx){
    if( object3d instanceof THREE.DirectionalLight === false )	return
    var ang	= 0.0005 * PIseconds * (idx % 2 ? 1 : -1);
    object3d.position.set(Math.cos(ang), Math.sin(ang), Math.cos(ang*2)).normalize();
  })
  // animate PointLights
  scene.traverse(function(object3d, idx){
    if( object3d instanceof THREE.PointLight === false )	return
    var angle	= 0.0005 * PIseconds * (idx % 2 ? 1 : -1) + idx * Math.PI/3;
    object3d.position.set(Math.cos(angle)*3, Math.sin(angle*3)*2, Math.cos(angle*2)).normalize().multiplyScalar(2);
  })

  // actually render the scene
  renderer.render( scene, camera );
}
