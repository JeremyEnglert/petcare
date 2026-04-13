import type { ClinicInfo } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { getDisplayHours } from '@/utilities/format-hours'

export default function Footer({ clinicInfo }: { clinicInfo: ClinicInfo }) {
  const displayHours = getDisplayHours(clinicInfo.hours)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-seafoam-900 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 paw-pattern opacity-60 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5 lg:border-r lg:border-white/[0.06] lg:pr-10">
            <Link href="/" className="inline-block -mb-1">
              <Image
                src="/petcare-logo.svg"
                alt="Pet Care"
                width={400}
                height={150}
                className="brightness-0 invert h-24 w-auto"
              />
            </Link>
            <p className="text-seafoam-300 text-sm leading-relaxed mt-4">
              Locally owned veterinary clinic providing affordable, compassionate care for your pets.
            </p>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] text-gold-400 mb-5 gold-rule">Hours</h4>
            <ul className="space-y-2.5 text-sm text-seafoam-300">
              {displayHours.map((entry, i) => (
                <li key={i} className="flex justify-between">
                  <span>{entry.days}</span>
                  <span className="text-seafoam-200/80">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] text-gold-400 mb-5 gold-rule">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-seafoam-300">
              {clinicInfo.address?.street && (
                <li className="leading-relaxed">
                  {clinicInfo.address.street}
                  <br />
                  {clinicInfo.address.city}, {clinicInfo.address.state} {clinicInfo.address.zip}
                </li>
              )}
              {clinicInfo.phone && <li>{clinicInfo.phone}</li>}
              {clinicInfo.email && <li>{clinicInfo.email}</li>}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-seafoam-400">
            &copy; {currentYear} Pet Care Veterinary Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              {clinicInfo.socialMedia?.facebook && (
                <a href={clinicInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" aria-label="Facebook">
                  <svg className="w-3.5 h-3.5 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}
              {clinicInfo.socialMedia?.instagram && (
                <a href={clinicInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" aria-label="Instagram">
                  <svg className="w-3.5 h-3.5 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {clinicInfo.socialMedia?.tiktok && (
                <a href={clinicInfo.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all" aria-label="TikTok">
                  <svg className="w-3.5 h-3.5 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48c1.7-1.71 2.65-4.01 2.65-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1.83-.84z" />
                  </svg>
                </a>
              )}
            </div>
            {clinicInfo.bookingUrl && (
              <>
                <span className="w-px h-4 bg-white/10" />
                <a href={clinicInfo.bookingUrl} className="group inline-flex items-center gap-2 text-sm text-gold-400/80 font-medium hover:text-gold-300 transition-colors">
                  Book an appointment
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
