'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function NanoparticleScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera
    renderer?: THREE.WebGLRenderer
    particles?: THREE.Mesh[]
    animationId?: number
  }>({})

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0b0e14, 10, 50)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create nanoparticles
    const particles: THREE.Mesh[] = []
    const particleCount = 50
    const geometry = new THREE.SphereGeometry(0.2, 16, 16)
    
    // Cyan glow material
    const material = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.7,
    })

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(geometry, material.clone())
      
      // Random orbital starting position
      const radius = 15 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta)
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta)
      particle.position.z = radius * Math.cos(phi)
      
      // Vary size slightly (18-22nm scale representation)
      const scale = 0.9 + Math.random() * 0.4
      particle.scale.setScalar(scale)
      
      // Store orbital parameters
      particle.userData = {
        radius,
        theta,
        phi,
        speed: 0.0002 + Math.random() * 0.0003,
        phiSpeed: 0.0001 + Math.random() * 0.0002,
      }
      
      scene.add(particle)
      particles.push(particle)
    }

    // Add point lights for glow effect
    const light1 = new THREE.PointLight(0x22d3ee, 1, 50)
    light1.position.set(10, 10, 10)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x22d3ee, 0.5, 50)
    light2.position.set(-10, -10, -10)
    scene.add(light2)

    // Animation loop
    let time = 0
    function animate() {
      sceneRef.current.animationId = requestAnimationFrame(animate)
      time += 0.01

      // Gentle camera rotation
      camera.position.x = Math.sin(time * 0.05) * 2
      camera.position.y = Math.cos(time * 0.03) * 2
      camera.lookAt(0, 0, 0)

      // Orbital motion for particles
      particles.forEach((particle) => {
        const { radius, speed, phiSpeed } = particle.userData
        particle.userData.theta += speed
        particle.userData.phi += phiSpeed
        
        const { theta, phi } = particle.userData
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta)
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta)
        particle.position.z = radius * Math.cos(phi)

        // Gentle opacity pulse
        const mat = particle.material as THREE.MeshBasicMaterial
        mat.opacity = 0.5 + Math.sin(time * 2 + particle.id) * 0.2
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    function handleResize() {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Store refs
    sceneRef.current = { scene, camera, renderer, particles }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="nanoparticle-scene" />
}
