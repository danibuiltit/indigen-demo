"use client"

import { useEffect, useRef } from "react"

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
uniform vec3 u_secondary_color;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);

  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);

  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);

  float tone=dot(col,vec3(.21,.71,.07));
  vec3 palette=mix(u_secondary_color,u_color,smoothstep(.25,.9,noise(uv*1.7+vec2(T*.006,0))));
  col=mix(col, palette, tone);
  col=mix(vec3(.08),col,min(time*.1,1.));
  col=clamp(col,.08,1.);
  O=vec4(col,1);
}`

class Renderer {
  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`
  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

  private readonly gl: WebGL2RenderingContext
  private readonly canvas: HTMLCanvasElement
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private resolutionLocation: WebGLUniformLocation | null = null
  private timeLocation: WebGLUniformLocation | null = null
  private colorLocation: WebGLUniformLocation | null = null
  private secondaryColorLocation: WebGLUniformLocation | null = null
  private color: [number, number, number] = [0.18, 0.49, 0.27]
  private secondaryColor: [number, number, number] = [0.49, 0.25, 0.17]

  constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
    this.canvas = canvas
    const gl = canvas.getContext("webgl2")
    if (!gl) {
      throw new Error("WebGL2 is not supported")
    }

    this.gl = gl
    this.setup(fragmentSource)
    this.init()
  }

  updateColor(newColor: [number, number, number]) {
    this.color = newColor
  }

  updateSecondaryColor(newColor: [number, number, number]) {
    this.secondaryColor = newColor
  }

  updateScale(width: number, height: number) {
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    this.canvas.width = Math.max(1, Math.floor(width * dpr))
    this.canvas.height = Math.max(1, Math.floor(height * dpr))
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  reset() {
    const { gl, program, vs, fs, buffer } = this
    if (program) {
      if (vs) gl.detachShader(program, vs)
      if (fs) gl.detachShader(program, fs)
      gl.deleteProgram(program)
    }
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    if (buffer) gl.deleteBuffer(buffer)

    this.program = null
    this.vs = null
    this.fs = null
    this.buffer = null
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Shader compilation error: ${gl.getShaderInfoLog(shader)}`)
    }
  }

  private setup(fragmentSource: string) {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!this.vs || !this.fs || !program) return

    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, fragmentSource)
    this.program = program
    gl.attachShader(program, this.vs)
    gl.attachShader(program, this.fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Program linking error: ${gl.getProgramInfoLog(program)}`)
    }
  }

  private init() {
    const { gl, program } = this
    if (!program) return

    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    this.resolutionLocation = gl.getUniformLocation(program, "resolution")
    this.timeLocation = gl.getUniformLocation(program, "time")
    this.colorLocation = gl.getUniformLocation(program, "u_color")
    this.secondaryColorLocation = gl.getUniformLocation(program, "u_secondary_color")
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this
    if (!program || !gl.isProgram(program)) return

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(this.resolutionLocation, canvas.width, canvas.height)
    gl.uniform1f(this.timeLocation, now * 1e-3)
    gl.uniform3fv(this.colorLocation, this.color)
    gl.uniform3fv(this.secondaryColorLocation, this.secondaryColor)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        Number.parseInt(result[1], 16) / 255,
        Number.parseInt(result[2], 16) / 255,
        Number.parseInt(result[3], 16) / 255,
      ]
    : null
}

interface SmokeBackgroundProps {
  smokeColor?: string
  secondaryColor?: string
}

export function SmokeBackground({ smokeColor = "#2f7d46", secondaryColor = "#7c3f2c" }: SmokeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<Renderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let renderer: Renderer

    try {
      renderer = new Renderer(canvas, fragmentShaderSource)
    } catch (error) {
      console.error(error)
      return
    }

    rendererRef.current = renderer

    const resizeObserver = new ResizeObserver(([entry]) => {
      renderer.updateScale(entry.contentRect.width, entry.contentRect.height)
    })

    resizeObserver.observe(canvas)

    let animationFrameId = 0
    const loop = (now: number) => {
      renderer.render(now)
      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
      renderer.reset()
      rendererRef.current = null
    }
  }, [])

  useEffect(() => {
    const rgbColor = hexToRgb(smokeColor)
    if (rgbColor) {
      rendererRef.current?.updateColor(rgbColor)
    }
  }, [smokeColor])

  useEffect(() => {
    const rgbColor = hexToRgb(secondaryColor)
    if (rgbColor) {
      rendererRef.current?.updateSecondaryColor(rgbColor)
    }
  }, [secondaryColor])

  return <canvas ref={canvasRef} className="block size-full" />
}
