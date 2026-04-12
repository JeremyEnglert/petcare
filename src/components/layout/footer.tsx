import type { ClinicInfo } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer({ clinicInfo }: { clinicInfo: ClinicInfo }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-seafoam-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/petcare-logo.svg"
                alt="Pet Care"
                width={200}
                height={77}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-seafoam-300/60 text-sm leading-relaxed max-w-xs">
              Locally owned veterinary clinic providing affordable, compassionate care for your pets.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-seafoam-300/70">
              {clinicInfo.hours?.map((entry, i) => (
                <li key={i} className="flex justify-between">
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-seafoam-300/70">
              <li>
                <a href="/#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-white transition-colors">Pricing</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-seafoam-300/70">
              {clinicInfo.phone && <li>{clinicInfo.phone}</li>}
              {clinicInfo.email && <li>{clinicInfo.email}</li>}
              {clinicInfo.address?.street && (
                <li>
                  {clinicInfo.address.street}
                  <br />
                  {clinicInfo.address.city}, {clinicInfo.address.state} {clinicInfo.address.zip}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-seafoam-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-seafoam-400/50">
            &copy; {currentYear} Pet Care Veterinary Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 bg-seafoam-800 rounded-xl flex items-center justify-center hover:bg-seafoam-700 transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 bg-seafoam-800 rounded-xl flex items-center justify-center hover:bg-seafoam-700 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 bg-seafoam-800 rounded-xl flex items-center justify-center hover:bg-seafoam-700 transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 text-seafoam-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
