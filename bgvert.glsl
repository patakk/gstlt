attribute vec2 a_position;

varying vec2 v_uv;

void main() {
    vec2 position = a_position;

    gl_Position = vec4(position, 0, 1);
    v_uv = a_position*.5 + .5;
}
