"use client"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const navItems = [
  { title: "Services", href: "/#services" },
  { title: "About", href: "/#about" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Reviews", href: "/#reviews" },
]

export default function Header({ bookingUrl }: { bookingUrl?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-seafoam-100/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image
            src="/petcare-logo.svg"
            alt="Pet Care"
            width={260}
            height={100}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-seafoam-800/70 hover:text-seafoam-700 transition-colors"
            >
              {item.title}
            </a>
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-seafoam-50 transition-colors"
              aria-label="Open main menu"
            >
              <svg className="w-5 h-5 text-seafoam-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0 md:hidden [&>button]:hidden">
            <div className="h-full flex flex-col py-6">
              <div className="px-6 mb-4 flex justify-end">
                <SheetClose asChild>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-seafoam-50 transition-colors"
                    aria-label="Close main menu"
                  >
                    <svg className="h-5 w-5 text-seafoam-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </SheetClose>
              </div>

              <nav className="flex-1 overflow-y-auto px-6">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="py-3 text-base font-medium text-seafoam-800 hover:text-seafoam-600 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-seafoam-100">
                  {bookingUrl ? (
                    <a
                      href={bookingUrl}
                      className="inline-flex items-center justify-center gap-2 w-full bg-seafoam-500 hover:bg-seafoam-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      Book a Visit
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2 w-full bg-seafoam-100 text-seafoam-700 px-6 py-3 rounded-full text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Opening in May
                    </span>
                  )}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
