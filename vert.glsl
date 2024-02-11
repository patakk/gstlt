attribute vec3 a_position;
attribute vec2 a_uv;
attribute float a_info;
attribute float a_angle;
attribute vec3 a_diffuse1;
attribute vec3 a_diffuse2;
attribute vec3 a_diffuse3;


// attribute vec3 a_transform;

uniform vec2 u_resolution;
uniform vec2 u_simulation;
uniform vec2 u_averagepos;
uniform vec3 u_seed;

varying vec2 v_uv;
varying float v_info;
varying float v_angle;
varying vec3 v_diffuse1;
varying vec3 v_diffuse2;
varying vec3 v_diffuse3;

void main() {
    vec3 position = (a_position + 0.*vec3(u_averagepos.x, u_averagepos.y, 0.)) / vec3(u_simulation, 1.) * 2. - 1.;
    position.xy *= 1.*vec2(1., 1.);
    gl_PointSize = 10.0;
    // gl_Position = vec4(position * .87 - vec3(0., .03, 0.), 1);
    gl_Position = vec4(1.0*position*vec3(1.0,1.0,1.), 1);
    v_uv = a_uv;
    v_info = a_info;
    v_angle = a_angle;
    v_diffuse1 = a_diffuse1;
    v_diffuse2 = a_diffuse2;
    v_diffuse3 = a_diffuse3;
}