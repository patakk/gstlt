export class Quad{
    constructor(p1, p2, p3, p4){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }

    rotate(angle) {
        this.p1.rotate(angle);
        this.p2.rotate(angle);
        this.p3.rotate(angle);
        this.p4.rotate(angle);
    }

    rotateOff(angle, offset){
        this.p1.sub(offset).rotate(angle).add(offset);
        this.p2.sub(offset).rotate(angle).add(offset);
        this.p3.sub(offset).rotate(angle).add(offset);
        this.p4.sub(offset).rotate(angle).add(offset);
    }
}

export class Vector{
    constructor(x, y, z=0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vec){
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    sub(vec){
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    }

    normalize(){
        let length = Math.sqrt(this.x*this.x + this.y*this.y);
        this.x /= length;
        this.y /= length;
        return this;
    }

    rotate(angle){
        let newX = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let newY = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = newX;
        this.y = newY;
        return this;
    }

    clone(){
        return new Vector(this.x, this.y, this.z);
    }

    heading(){
        return Math.atan2(this.y, this.x);
    }

    dot(vec){
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    length(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    distance(vec){
        return Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2));
    }
    
}





// the following code implements perlin noise and is taken from p5.js

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin_octaves = 4;
let perlin_amp_falloff = 0.5;

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));
let perlin;


export function noise(x, y = 0, z = 0) {
    if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1);
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
            perlin[i] = prng.rand();
        }
    }

    if (x < 0) {
        x = -x;
    }
    if (y < 0) {
        y = -y;
    }
    if (z < 0) {
        z = -z;
    }

    let xi = Math.floor(x),
        yi = Math.floor(y),
        zi = Math.floor(z);
    let xf = x - xi;
    let yf = y - yi;
    let zf = z - zi;
    let rxf, ryf;

    let r = 0;
    let ampl = 0.5;

    let n1, n2, n3;

    for (let o = 0; o < perlin_octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

        rxf = scaled_cosine(xf);
        ryf = scaled_cosine(yf);

        n1 = perlin[of & PERLIN_SIZE];
        n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
        n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
        n1 += ryf * (n2 - n1);

        of += PERLIN_ZWRAP;
        n2 = perlin[of & PERLIN_SIZE];
        n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
        n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
        n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
        n2 += ryf * (n3 - n2);

        n1 += scaled_cosine(zf) * (n2 - n1);

        r += n1 * ampl;
        ampl *= perlin_amp_falloff;
        xi <<= 1;
        xf *= 2;
        yi <<= 1;
        yf *= 2;
        zi <<= 1;
        zf *= 2;

        if (xf >= 1.0) {
            xi++;
            xf--;
        }
        if (yf >= 1.0) {
            yi++;
            yf--;
        }
        if (zf >= 1.0) {
            zi++;
            zf--;
        }
    }
    return r;
};

export function noiseDetail(lod, falloff) {
    if (lod > 0) {
        perlin_octaves = lod;
    }
    if (falloff > 0) {
        perlin_amp_falloff = falloff;
    }
};

export function noiseSeed(seed) {
    const lcg = (() => {
        const m = 4294967296;
        const a = 1664525;
        const c = 1013904223;
        let seed, z;
        return {
            setSeed(val) {
                z = seed = (val == null ? prng.rand() * m : val) >>> 0;
            },
            getSeed() {
                return seed;
            },
            rand() {
                z = (a * z + c) % m;
                return z / m;
            }
        };
    })();

    lcg.setSeed(seed);
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = lcg.rand();
    }
};