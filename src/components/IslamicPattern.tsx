import { useEffect, useRef } from 'react'

/**
 * Islamic Geometric Pattern Background
 * Creates floating 8-pointed stars and geometric shapes with animation
 */
const IslamicPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Pattern configuration
    const patterns: Array<{
      x: number
      y: number
      size: number
      rotation: number
      speed: number
      opacity: number
    }> = []

    // Initialize patterns
    const numPatterns = 20
    for (let i = 0; i < numPatterns; i++) {
      patterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0005 + 0.0002,
        opacity: Math.random() * 0.15 + 0.05,
      })
    }

    // Draw 8-pointed star (Islamic star)
    const drawStar = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity

      const numPoints = 8
      const outerRadius = size
      const innerRadius = size * 0.4

      ctx.beginPath()
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (Math.PI * i) / numPoints
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()

      // Gradient fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius)
      gradient.addColorStop(0, 'rgba(0, 168, 107, 0.3)')
      gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.2)')
      gradient.addColorStop(1, 'rgba(0, 107, 63, 0.1)')

      ctx.fillStyle = gradient
      ctx.fill()

      // Stroke
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.restore()
    }

    // Draw geometric hexagon pattern
    const drawHexagon = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * i) / 3
        const px = Math.cos(angle) * size
        const py = Math.sin(angle) * size

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()

      ctx.strokeStyle = 'rgba(0, 168, 107, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      patterns.forEach((pattern, index) => {
        // Update rotation
        pattern.rotation += pattern.speed

        // Float animation
        pattern.y += Math.sin(pattern.rotation * 2) * 0.5

        // Draw alternating patterns
        if (index % 2 === 0) {
          drawStar(pattern.x, pattern.y, pattern.size, pattern.rotation, pattern.opacity)
        } else {
          drawHexagon(pattern.x, pattern.y, pattern.size, pattern.rotation, pattern.opacity)
        }

        // Reset position if off screen
        if (pattern.y > canvas.height + 100) {
          pattern.y = -100
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      aria-hidden="true"
    />
  )
}

export default IslamicPattern
