const glsl = require('glslify')
const regl = require('regl')()
const createPlane = require('primitive-plane')


const TAU = 6.283185307179586

const camera = require('regl-camera')(regl, {
  center: [0, 0, 0],
  distance: 2,
  theta: TAU/4,
})


const plane = createPlane(1, 1, 500, 500)

const draw = regl({
  vert: glsl`

  #pragma glslify: noise = require(glsl-noise/classic/2d)
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
    position3.z = sin(time) * (sin(time * (cos(time + position.x) * sin(time + position.y)) * ((position.x + position.y)))) * 0.3;
    // gl_PointSize = (position3.z * 10.0) + 10.0;
    gl_PointSize = 1.0;
    gl_Position = projection * view * vec4(position3, 1.0);
  }

  `,

  frag: `

  precision mediump float;
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    float brightness = min(1.0,
      1.5 * (2.0 - length(1.0 * vUv - vec2(1.0)))
    ); 
    gl_FragColor = vec4(vec3(vUv, 1.0) * brightness, 1.0);
  }

  `,

  attributes: {
    position: plane.positions,
    normal: plane.normals,
    uv: plane.uvs
  },

  elements: plane.cells,

  uniforms: {
    time: ({time}) => time,
  },

  primitive: 'points',
})


regl.frame(() => {
  camera(() => {
    regl.clear({ color: [0, 0, 0, 1] })
    draw()
  })
});
