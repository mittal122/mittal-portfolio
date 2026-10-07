import { useEffect, useRef, useState } from 'react';

// The one living surface of the site: a full-bleed fragment shader of
// interference filaments (lilac) crossed by a single ember current, plus film grain.
// Raw WebGL1, no three.js: one quad, one program.
//
// Legibility is enforced in the shader, not by hoping text lands on dark pixels:
// - `lane`: x position (0..1) where the reading column ends; bands are masked
//   to the right of it. Phones get a narrow lane and a dimmed field instead.
// - `calm`: 0 at the top of a page, 1 once scrolled a screen down. The field
//   quiets as the visitor moves from the portal into reading.
//
// Budget rules (the old Noise canvas burned ~38ms/frame on the main thread):
// - renders at RENDER_SCALE of device pixels, upscaled by the GPU
// - stops entirely while the tab is hidden
// - prefers-reduced-motion: draws still frames only (on resize/scroll), never animates

const RENDER_SCALE = 0.75;

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r; uniform float t; uniform vec2 m; uniform float ms;
uniform float pulse; uniform float lane; uniform float dim; uniform float calm;
uniform float elane; uniform float edim;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r; float asp=r.x/r.y; vec2 p=vec2(uv.x*asp,uv.y);
  vec2 mp=vec2(m.x*asp,m.y); float md=length(p-mp);
  float bend=ms*exp(-md*md*14.)*.07;
  float T=t*.045;
  vec3 col=vec3(.035,.043,.094)+vec3(.025,.03,.08)*(1.-uv.y);
  float g=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    float y=.34+fi*.11+.42*(uv.x-.55)*(1.+fi*.25)+(fbm(vec2(p.x*1.1+T*(1.+fi*.3),fi*3.7+T))-.5)*.42;
    y+=bend*sign(uv.y-m.y);
    y+=pulse*(noise(vec2(p.x*24.+fi*11.,T*40.))-.5)*.6;   /* route change: filaments shatter, then settle */
    float d=abs(uv.y-y);
    float dust=step(.8-pulse*.25,hash(gl_FragCoord.xy+fi*7.))*exp(-d*d*(220.-pulse*170.)); /* pulse spills dust off the filament */
    g+=(exp(-d*d*9000.)*.7+exp(-d*d*700.)*.35+exp(-d*d*60.)*.12+dust*.9)*(1.-fi*.16);
  }
  float ye=.12+.7*(uv.x-.35)+.2*sin((uv.x-.35)*4.6+T*2.2)+.05*sin(uv.x*11.+T*5.)+(fbm(vec2(p.x*1.4-T*1.3,9.1+T))-.5)*.16;
  ye+=bend*sign(uv.y-m.y)+pulse*(noise(vec2(p.x*20.,T*30.+4.))-.5)*.5;
  float de=abs(uv.y-ye);
  float em=exp(-de*de*8000.)*.8+exp(-de*de*600.)*.35+exp(-de*de*70.)*.12+step(.78,hash(gl_FragCoord.xy+3.3))*exp(-de*de*200.);
  float mask=smoothstep(lane,min(lane+.3,1.),uv.x)*dim*(1.-.75*calm);
  col+=vec3(.486,.494,.973)*g*mask*.65;
  /* the ember has its own lane: on phones it must never strike through body copy */
  float emask=smoothstep(elane,min(elane+.25,1.),uv.x)*edim*(1.-.75*calm);
  col+=vec3(1.,.42,.24)*em*emask*.8;
  col+=vec3(.486,.494,.973)*pulse*.12*exp(-md*1.5);
  col+=(hash(gl_FragCoord.xy+fract(t*.37)*311.)-.5)*.028;
  gl_FragColor=vec4(col,1.);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

// Other components ask for the route-change dissolve through this event.
export const pulseField = () => window.dispatchEvent(new Event('field:pulse'));

// Where the reading column ends, as a fraction of the viewport width (see `column` in Page.jsx).
const laneFor = (w) => (w >= 1024 ? 0.5 : 0.15);
const dimFor = (w) => (w >= 1024 ? 1 : 0.45);
const emberLaneFor = (w) => (w >= 1024 ? 0.5 : 0.72);
const emberDimFor = (w) => (w >= 1024 ? 1 : 0.35);

export default function Field() {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl || gl.isContextLost()) return setFallback(true);

    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (err) {
      console.warn('[Field] shader failed, using static fallback:', err.message);
      return setFallback(true);
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    const u = Object.fromEntries(['r', 't', 'm', 'ms', 'pulse', 'lane', 'dim', 'calm', 'elane', 'edim'].map((k) => [k, gl.getUniformLocation(prog, k)]));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)').matches;
    const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, s: 0, ts: 0 };
    const calmOf = () => Math.min(1, window.scrollY / window.innerHeight);
    let calm = calmOf();
    let pulse = 0;
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const s = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
      canvas.width = Math.max(1, Math.round(window.innerWidth * s));
      canvas.height = Math.max(1, Math.round(window.innerHeight * s));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.r, canvas.width, canvas.height);
      gl.uniform1f(u.lane, laneFor(window.innerWidth));
      gl.uniform1f(u.dim, dimFor(window.innerWidth));
      gl.uniform1f(u.elane, emberLaneFor(window.innerWidth));
      gl.uniform1f(u.edim, emberDimFor(window.innerWidth));
    };

    // k: per-60fps-frame factor converted to this frame's dt, so easing is frame-rate independent
    const ease = (k, dt) => 1 - Math.pow(1 - k, dt * 60);
    let last = 0;
    const draw = (time) => {
      const dt = last ? Math.min(0.1, time - last) : 1 / 60;
      last = time;
      mouse.x += (mouse.tx - mouse.x) * ease(0.06, dt);
      mouse.y += (mouse.ty - mouse.y) * ease(0.06, dt);
      mouse.s += (mouse.ts - mouse.s) * ease(0.04, dt);
      mouse.ts *= Math.pow(0.985, dt * 60); // the bend relaxes when the pointer rests
      pulse *= Math.pow(0.92, dt * 60); // ~500ms to settle at any refresh rate
      calm += (calmOf() - calm) * ease(0.1, dt);
      gl.uniform1f(u.t, time);
      gl.uniform2f(u.m, mouse.x, mouse.y);
      gl.uniform1f(u.ms, mouse.s);
      gl.uniform1f(u.pulse, pulse);
      gl.uniform1f(u.calm, calm);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now) => {
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    // reduced motion: a fixed, composed moment of the field; no pulse, calm applied at once
    const still = () => { pulse = 0; calm = calmOf(); last = 0; draw(42); };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) still();
      else if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
      mouse.ts = 1;
    };
    const onPulse = () => { if (!reduce.matches) pulse = 1; };
    const onResize = () => { resize(); if (reduce.matches) still(); };
    const onScroll = () => { if (reduce.matches) { cancelAnimationFrame(raf); raf = requestAnimationFrame(still); } };

    resize();
    start();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', start);
    reduce.addEventListener('change', start);
    window.addEventListener('field:pulse', onPulse);
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); setFallback(true); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', start);
      reduce.removeEventListener('change', start);
      window.removeEventListener('field:pulse', onPulse);
      window.removeEventListener('pointermove', onMove);
      // Don't force loseContext() here: StrictMode re-runs this effect on the same
      // canvas, and a lost context makes every shader compile fail (null info log).
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 bg-void">
      {fallback ? (
        // ponytail: static stand-in when WebGL is unavailable; same palette, no motion
        <div className="absolute inset-0" style={{ background: 'radial-gradient(40% 45% at 88% 70%, rgba(255,107,61,0.16), transparent 70%), radial-gradient(45% 55% at 85% 35%, rgba(124,126,248,0.2), transparent 70%), #090B18' }} />
      ) : (
        <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
