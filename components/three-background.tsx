"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create leaves
    const leaves: THREE.Mesh[] = []
    const leafGeometry = new THREE.PlaneGeometry(1, 1)

    // Create leaf materials with different green shades
    const leafMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x8bc34a, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0x4caf50, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0x66bb6a, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: 0x81c784, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
    ]

    // Create 50 leaves with random positions, rotations, and sizes
    for (let i = 0; i < 50; i++) {
      const material = leafMaterials[Math.floor(Math.random() * leafMaterials.length)]
      const leaf = new THREE.Mesh(leafGeometry, material)

      // Random position
      leaf.position.x = Math.random() * 40 - 20
      leaf.position.y = Math.random() * 40 - 20
      leaf.position.z = Math.random() * 10 - 15

      // Random rotation
      leaf.rotation.x = Math.random() * Math.PI
      leaf.rotation.y = Math.random() * Math.PI
      leaf.rotation.z = Math.random() * Math.PI

      // Random scale
      const scale = Math.random() * 0.5 + 0.5
      leaf.scale.set(scale, scale, scale)

      // Add custom properties for animation
      ;(leaf as any).rotationSpeed = {
        x: Math.random() * 0.005 - 0.0025,
        y: Math.random() * 0.005 - 0.0025,
        z: Math.random() * 0.005 - 0.0025,
      }
      ;(leaf as any).floatSpeed = Math.random() * 0.01 + 0.005
      ;(leaf as any).floatDistance = Math.random() * 0.5 + 0.5
      ;(leaf as any).initialY = leaf.position.y
      ;(leaf as any).timeOffset = Math.random() * Math.PI * 2

      scene.add(leaf)
      leaves.push(leaf)
    }

    // Position camera
    camera.position.z = 5

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Animate each leaf
      leaves.forEach((leaf) => {
        // Gentle rotation
        leaf.rotation.x += (leaf as any).rotationSpeed.x
        leaf.rotation.y += (leaf as any).rotationSpeed.y
        leaf.rotation.z += (leaf as any).rotationSpeed.z

        // Floating motion
        leaf.position.y =
          (leaf as any).initialY +
          Math.sin(Date.now() * 0.001 * (leaf as any).floatSpeed + (leaf as any).timeOffset) *
            (leaf as any).floatDistance
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      leafGeometry.dispose()
      leafMaterials.forEach((material) => material.dispose())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}

