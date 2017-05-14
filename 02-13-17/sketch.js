const glsl = require('glslify')
const regl = require('regl')()
const createSphere = require('primitive-sphere')


const TAU = 6.283185307179586

const bg = [255, 255, 157].map( i => i/255 ).concat([1]);

const camera = require('regl-camera')(regl, {
  center: [0, 0, 0],
  distance: 7,
})


const sphere = createSphere(1, {
  segments: 150  
});

const draw = regl({
  vert: glsl`

  #pragma glslify: noise = require(glsl-noise/classic/3d)
  precision mediump float;
  uniform float time;
  uniform mat4 projection, view;
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec2 uv;
  varying vec2 vUv;
  varying vec3 vNormal;


  void main() {
    vNormal = normal;
    vUv = uv;
    vec3 position3 = position;
    position3.z = sin(time + position.x * 3.14) * cos(time + position.y * 3.14) ;
    gl_PointSize = 10.0;
    gl_Position = projection * view * vec4(position3, 1.0);
  }

  `,

  frag: `

  precision mediump float;
  varying vec3 vNormal;
  varying vec2 vUv;
  vec3 colA;
  vec3 colB;
  void main() {
    colA = vec3(1.0, 0.38, 0.22);
    colB = vec3(0.0, 0.64, 0.53);
    gl_FragColor = vec4(mix(colA, colB, vec3(vUv * 1.8, 1.0)), 1.0);
  }

  `,

  attributes: {
    position: sphere.positions,
    normal: sphere.normals,
    uv: sphere.uvs
  },

  elements: sphere.cells,

  uniforms: {
    time: ({time}) => time,
  },

  primitive: 'points',
})


regl.frame(() => {
  camera(() => {
    regl.clear({ color: bg })
    draw()
  })
});
