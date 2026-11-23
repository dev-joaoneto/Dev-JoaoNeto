import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 1500
const LINK_NODES = 420
const LINK_DISTANCE = 0.3
const MAX_LINKS = 3

// DGX:ANCHOR: brain-shape
function brainPoint(rand: () => number): THREE.Vector3 {
  const u = rand() * Math.PI * 2
  const v = Math.acos(2 * rand() - 1)
  const shell = 0.86 + rand() * 0.14

  // cerebelo: lóbulo pequeno atrás e embaixo
  if (rand() < 0.1) {
    return new THREE.Vector3(
      Math.sin(v) * Math.cos(u) * 0.5 * shell,
      -0.5 + Math.cos(v) * 0.2 * shell,
      -0.72 + Math.sin(v) * Math.sin(u) * 0.3 * shell,
    )
  }

  // dois hemisférios com sulcos e a fissura central
  const side = rand() < 0.5 ? -1 : 1
  const fold = 1 + 0.06 * Math.sin(u * 9 + v * 7) * Math.sin(v * 8)
  let x = Math.sin(v) * Math.cos(u) * 0.5 * shell * fold
  let y = Math.cos(v) * 0.72 * shell * fold
  const z = Math.sin(v) * Math.sin(u) * 1.02 * shell * fold
  x = Math.abs(x) * side + side * 0.06
  if (y < -0.3) y = -0.3 + (y + 0.3) * 0.55
  const frontDrop = z > 0.5 ? (z - 0.5) * 0.25 : 0
  return new THREE.Vector3(x * 1.35, y - frontDrop + 0.08, z)
}

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function NeuralBrain() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
    camera.position.set(0, 0.1, 4.4)

    const rand = seeded(7)
    const nodes = Array.from({ length: NODE_COUNT }, () => brainPoint(rand))

    const positions = new Float32Array(NODE_COUNT * 3)
    const phases = new Float32Array(NODE_COUNT)
    const sizes = new Float32Array(NODE_COUNT)
    nodes.forEach((p, i) => {
      positions.set([p.x, p.y, p.z], i * 3)
      phases[i] = rand() * Math.PI * 2
      sizes[i] = i < LINK_NODES ? 2.6 + rand() * 2 : 1.2 + rand() * 1.6
    })

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    pointsGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const pointsMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute float aPhase;
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vGlow;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase + position.y * 3.0);
          vGlow = pulse;
          gl_PointSize = aSize * uPixelRatio * (0.7 + pulse * 0.6) * (3.2 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vGlow;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 base = mix(vec3(0.20, 0.83, 0.60), vec3(0.85, 1.0, 0.94), vGlow * 0.55);
          gl_FragColor = vec4(base, a * (0.35 + vGlow * 0.65));
        }
      `,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)

    const linkPositions: number[] = []
    const linkCount = new Uint8Array(LINK_NODES)
    for (let i = 0; i < LINK_NODES; i++) {
      for (let j = i + 1; j < LINK_NODES && linkCount[i] < MAX_LINKS; j++) {
        if (linkCount[j] >= MAX_LINKS) continue
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
          linkPositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
          linkCount[i]++
          linkCount[j]++
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3))
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(linesGeo, linesMat)

    const brain = new THREE.Group()
    brain.add(points, lines)
    brain.rotation.set(0.25, -0.85, 0)
    scene.add(brain)

    const pointer = { x: 0, y: 0 }
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    resize()

    // só anima enquanto o hero está na tela e a aba está visível
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) loop()
    })
    io.observe(mount)

    const clock = new THREE.Clock()
    let raf = 0
    let spin = -0.85
    function loop() {
      cancelAnimationFrame(raf)
      if (!visible || document.hidden) return
      const t = clock.getElapsedTime()
      pointsMat.uniforms.uTime.value = t
      linesMat.opacity = 0.12 + 0.06 * Math.sin(t * 0.8)
      spin += 0.0018
      brain.rotation.y += (spin + pointer.x * 0.45 - brain.rotation.y) * 0.05
      brain.rotation.x += (0.25 + pointer.y * 0.25 - brain.rotation.x) * 0.05
      brain.position.y = Math.sin(t * 0.6) * 0.04
      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    const onVisibility = () => !document.hidden && loop()
    document.addEventListener('visibilitychange', onVisibility)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      pointsGeo.dispose()
      pointsMat.dispose()
      linesGeo.dispose()
      linesMat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
