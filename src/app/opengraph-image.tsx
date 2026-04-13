import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Pet Care — Affordable Veterinary in Tucson'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const logoSvg = await readFile(join(process.cwd(), 'public/petcare-logo.svg'), 'utf-8')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf8f3',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Seafoam blob — top left (matches hero blob-1) */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            background: 'rgba(174, 231, 208, 0.40)',
          }}
        />

        {/* Gold blob — bottom right (matches hero blob-2) */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -60,
            width: 440,
            height: 440,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'rgba(223, 192, 136, 0.30)',
          }}
        />

        {/* Small seafoam blob — top right accent */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 120,
            width: 160,
            height: 160,
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            background: 'rgba(45, 173, 134, 0.06)',
          }}
        />

        {/* Paw pattern dots */}
        {Array.from({ length: 11 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                left: col * 60,
                top: row * 60,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'rgba(45, 173, 134, 0.04)',
              }}
            />
          )),
        )}

        {/* Full logo — large */}
        <img
          src={logoDataUri}
          width={700}
          height={172}
          style={{ marginBottom: 28 }}
        />

        {/* Gold rule divider */}
        <div
          style={{
            width: 64,
            height: 3,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #d4a966, #c9a46c)',
            marginBottom: 22,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 500,
            color: '#208c6b',
            letterSpacing: '0.2em',
            textTransform: 'uppercase' as const,
          }}
        >
          Tucson Affordable Veterinarian
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: 'linear-gradient(90deg, #2dad86, #1a7058 50%, #c9a46c)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
