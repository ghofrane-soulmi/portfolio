import type { ProjectCategory } from '#shared/types'

/**
 * Deterministic abstract cover art for a project.
 * Same slug -> same picture. Category picks the motif, stack size drives density.
 */

export const COVER_W = 480
export const COVER_H = 300

function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 PRNG */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type CoverShape =
  | {
      kind: 'rect'
      x: number
      y: number
      w: number
      h: number
      r: number
      fill: 'surface' | 'accent' | 'none'
      stroke: boolean
      opacity: number
    }
  | {
      kind: 'circle'
      cx: number
      cy: number
      r: number
      fill: 'surface' | 'accent' | 'none'
      stroke: boolean
      opacity: number
    }
  | {
      kind: 'line'
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      dashed: boolean
    }

export interface Cover {
  glow: { cx: number; cy: number; r: number }
  shapes: CoverShape[]
  label: string
}

const between = (rand: () => number, min: number, max: number) => min + rand() * (max - min)

/** A browser-like window with skeleton text bars. */
function windowShapes(
  rand: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
  bars: number,
  opacity: number,
): CoverShape[] {
  const out: CoverShape[] = [
    { kind: 'rect', x, y, w, h, r: 10, fill: 'surface', stroke: true, opacity },
    {
      kind: 'line',
      x1: x,
      y1: y + 22,
      x2: x + w,
      y2: y + 22,
      opacity: opacity * 0.6,
      dashed: false,
    },
  ]
  for (let i = 0; i < 3; i++) {
    out.push({
      kind: 'circle',
      cx: x + 14 + i * 12,
      cy: y + 11,
      r: 3,
      fill: i === 0 ? 'accent' : 'none',
      stroke: true,
      opacity,
    })
  }
  const lineH = Math.min(16, (h - 40) / Math.max(bars, 1))
  for (let i = 0; i < bars; i++) {
    const bw = between(rand, 0.35, 0.85) * (w - 28)
    out.push({
      kind: 'rect',
      x: x + 14,
      y: y + 34 + i * lineH,
      w: bw,
      h: 6,
      r: 3,
      fill: i === 0 ? 'accent' : 'none',
      stroke: i !== 0,
      opacity: i === 0 ? opacity * 0.9 : opacity * 0.5,
    })
  }
  return out
}

function webMotif(rand: () => number, density: number): CoverShape[] {
  const shapes: CoverShape[] = []
  const count = 3
  for (let i = 0; i < count; i++) {
    const w = between(rand, 190, 250)
    const h = between(rand, 130, 170)
    const x = 40 + i * between(rand, 70, 95)
    const y = 30 + i * between(rand, 25, 40)
    shapes.push(...windowShapes(rand, x, y, w, h, Math.min(density, 6), 0.55 + i * 0.2))
  }
  return shapes
}

function mobileMotif(rand: () => number, density: number): CoverShape[] {
  const shapes: CoverShape[] = []
  const phones = 2
  for (let i = 0; i < phones; i++) {
    const x = 130 + i * 130 + between(rand, -10, 10)
    const y = 40 + i * 20
    const w = 100
    const h = 200
    const op = 0.6 + i * 0.3
    shapes.push({ kind: 'rect', x, y, w, h, r: 18, fill: 'surface', stroke: true, opacity: op })
    shapes.push({
      kind: 'rect',
      x: x + 38,
      y: y + 8,
      w: 24,
      h: 5,
      r: 2.5,
      fill: 'none',
      stroke: true,
      opacity: op * 0.6,
    })
    for (let j = 0; j < Math.min(density + 1, 5); j++) {
      shapes.push({
        kind: 'rect',
        x: x + 12,
        y: y + 28 + j * 30,
        w: 76,
        h: 22,
        r: 6,
        fill: j === 0 ? 'accent' : 'none',
        stroke: j !== 0,
        opacity: j === 0 ? op * 0.85 : op * 0.5,
      })
    }
  }
  // notification "pulse" rings
  const cx = between(rand, 340, 380)
  const cy = between(rand, 50, 80)
  for (let k = 0; k < 3; k++) {
    shapes.push({
      kind: 'circle',
      cx,
      cy,
      r: 8 + k * 10,
      fill: k === 0 ? 'accent' : 'none',
      stroke: k !== 0,
      opacity: 0.9 - k * 0.28,
    })
  }
  return shapes
}

function pipelineMotif(rand: () => number, density: number): CoverShape[] {
  const shapes: CoverShape[] = []
  const nodes = Math.max(4, Math.min(density, 7))
  const points = Array.from({ length: nodes }, (_, i) => ({
    x: 50 + (i * (COVER_W - 100)) / (nodes - 1),
    y: COVER_H / 2 + Math.sin(i * 1.3 + rand() * 2) * 60,
  }))
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!
    const b = points[i + 1]!
    shapes.push({
      kind: 'line',
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      opacity: 0.6,
      dashed: i % 2 === 1,
    })
  }
  points.forEach((p, i) => {
    const last = i === points.length - 1
    shapes.push({
      kind: 'circle',
      cx: p.x,
      cy: p.y,
      r: last ? 18 : 12,
      fill: last ? 'accent' : 'surface',
      stroke: !last,
      opacity: 0.95,
    })
    if (!last)
      shapes.push({
        kind: 'circle',
        cx: p.x,
        cy: p.y,
        r: 4,
        fill: 'accent',
        stroke: false,
        opacity: 0.8,
      })
  })
  // log lines in the corner
  for (let j = 0; j < 4; j++) {
    shapes.push({
      kind: 'rect',
      x: 40,
      y: 30 + j * 12,
      w: between(rand, 60, 140),
      h: 5,
      r: 2.5,
      fill: 'none',
      stroke: true,
      opacity: 0.45,
    })
  }
  return shapes
}

export function buildCover(slug: string, category: ProjectCategory, stack: string[]): Cover {
  const rand = seeded(hash(slug))
  const density = stack.length
  const motif = {
    'web-application': webMotif,
    'mobile-app': mobileMotif,
    'devops-tooling': pipelineMotif,
  }[category]
  return {
    glow: {
      cx: between(rand, 0.2, 0.8) * COVER_W,
      cy: between(rand, 0.2, 0.7) * COVER_H,
      r: between(rand, 160, 240),
    },
    shapes: motif(rand, density),
    label: stack.slice(0, 3).join(' · ').toLowerCase(),
  }
}
