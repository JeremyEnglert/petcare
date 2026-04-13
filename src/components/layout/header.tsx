"use client"

import type { Menu } from "@/payload-types"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header({
  bookingUrl,
  menuItems,
}: {
  bookingUrl?: string | null
  menuItems?: Menu['items']
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 bg-seafoam-950 z-40 flex flex-col px-8 pb-8 pt-28 transition-[clip-path] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open
            ? '[clip-path:circle(150%_at_calc(100%-2.25rem)_2.5rem)]'
            : '[clip-path:circle(0%_at_calc(100%-2.25rem)_2.5rem)]'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1">
          {menuItems?.map((item, i) => (
            <Link
              key={item.id}
              href={item.url}
              className={`flex items-center gap-3 py-3 border-b border-white/[0.08] font-display text-2xl text-seafoam-100 transition-all duration-400 ${
                open
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className={`mt-8 transition-all duration-400 ${
            open
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: open ? `${150 + (menuItems?.length ?? 0) * 70 + 70}ms` : '0ms' }}
        >
          {bookingUrl ? (
            <a
              href={bookingUrl}
              className="flex items-center justify-center w-full bg-seafoam-500 hover:bg-seafoam-400 text-white px-6 py-3.5 rounded-full text-base font-semibold transition-colors"
              onClick={() => setOpen(false)}
            >
              Book a Visit
            </a>
          ) : (
            <span className="flex items-center justify-center gap-2 w-full bg-seafoam-800 text-seafoam-200 px-6 py-3.5 rounded-full text-base font-semibold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Opening in May
            </span>
          )}
        </div>
      </div>

      {/* Header bar */}
      <div className={`relative z-50 border-b transition-colors duration-300 ${
        open
          ? 'bg-transparent border-transparent'
          : 'bg-cream/80 backdrop-blur-lg border-seafoam-100/50'
      }`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-seafoam-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/petcare-logo.svg"
              alt="Pet Care"
              width={260}
              height={100}
              className={`w-[180px] md:w-[260px] h-auto transition-all duration-300 ${
                open ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems?.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-sm font-medium text-seafoam-800/70 hover:text-seafoam-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {bookingUrl ? (
              <a
                href={bookingUrl}
                className="inline-flex items-center gap-2 bg-seafoam-500 hover:bg-seafoam-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-seafoam-500/20 transition-all hover:scale-105"
              >
                Book a Visit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-seafoam-100 text-seafoam-700 px-6 py-2.5 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Opening in May
              </span>
            )}
          </div>

          {/* Botanical hamburger — asymmetric lines morph to X */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-seafoam-50/10"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close main menu" : "Open main menu"}
            aria-expanded={open}
          >
            <div className="w-[26px] h-[20px] relative flex flex-col justify-between">
              <span className={`block h-[2.5px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                open
                  ? 'bg-white w-full rotate-45 translate-y-[8.75px]'
                  : 'bg-seafoam-800 w-full'
              }`} />
              <span className={`block h-[2.5px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open
                  ? 'bg-white opacity-0 -translate-x-2.5 w-[70%]'
                  : 'bg-seafoam-800 opacity-100 w-[70%]'
              }`} />
              <span className={`block h-[2.5px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
                open
                  ? 'bg-white w-full -rotate-45 -translate-y-[8.75px]'
                  : 'bg-seafoam-800 w-[85%]'
              }`} />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
