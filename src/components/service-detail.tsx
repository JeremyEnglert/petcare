import Link from 'next/link'
import type { Service, ClinicInfo } from '@/payload-types'
import { ServiceIcon } from '@/components/service-icons'
import { Heart, ChevronRight, Calendar, Phone, CircleCheck, ArrowRight, MapPin, Clock, Star } from 'lucide-react'

type Props = {
  service: Service
  features: { feature: string; description?: string | null; id?: string }[]
  otherServices: Service[]
  clinicInfo: ClinicInfo
}

function formatPhoneForTel(phone: string): string {
  return 'tel:' + phone.replace(/\D/g, '')
}

export function ServiceDetailContent({ service, features, otherServices, clinicInfo }: Props) {
  const bookingUrl = clinicInfo.bookingUrl
  const phone = clinicInfo.phone
  return (
    <article className="pt-20">

      {/* ── HERO — clean, editorial, SEO-rich ────────────────────── */}
      <section className="relative overflow-hidden bg-cream">
        <div className="absolute inset-0 paw-pattern opacity-40" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-seafoam-100/60 blob-1 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-gold-100/40 blob-2 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pb-28">
          {/* Breadcrumb */}
          <nav className="fade-up fade-up-1 flex items-center gap-2 text-seafoam-600 text-sm mb-16">
            <Link href="/" className="hover:text-seafoam-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#services" className="hover:text-seafoam-700 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-seafoam-800">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: headline + copy — 7 cols */}
            <div className="lg:col-span-7">
              <p className="fade-up fade-up-1 text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-4">
                Affordable Tucson Vet
              </p>

              <h1 className="fade-up fade-up-2 font-display text-5xl sm:text-6xl lg:text-[4.25rem] text-seafoam-900 leading-[1.08] mb-8">
                Low Cost {service.title} <span className="text-seafoam-500">in Tucson</span>
              </h1>

              <p className="fade-up fade-up-3 text-lg text-seafoam-700 leading-relaxed max-w-xl mb-10">
                {service.longDescription || service.description}
              </p>

              <div className="fade-up fade-up-4 flex flex-wrap gap-4 mb-12">
                {bookingUrl && (
                  <a href={bookingUrl} className="btn-pill inline-flex items-center gap-3 bg-seafoam-600 hover:bg-seafoam-700 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25">
                    <Calendar className="w-5 h-5" />
                    Schedule Appointment
                  </a>
                )}
                {phone && (
                  <a href={formatPhoneForTel(phone)} className="btn-pill inline-flex items-center gap-3 bg-white hover:bg-seafoam-50 text-seafoam-700 px-8 py-4 rounded-full text-base font-semibold border-2 border-seafoam-200">
                    <Phone className="w-5 h-5" />
                    {phone}
                  </a>
                )}
              </div>

              {/* Trust row */}
              <div className="fade-up fade-up-5 flex flex-wrap items-center gap-6 text-sm text-seafoam-700">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-seafoam-500" />
                  Tucson
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-seafoam-500" />
                  Walk-ins Welcome
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold-500" />
                  500+ Happy Families
                </span>
              </div>
            </div>

            {/* Right: pricing card — 5 cols */}
            <div className="fade-up fade-up-5 lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-seafoam-900/[0.04] border border-seafoam-100">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-seafoam-100">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-seafoam-700">Now Accepting Patients</span>
                </div>

                <p className="text-sm text-seafoam-600 font-medium uppercase tracking-wide mb-2">Starting at</p>
                <p className="font-display text-6xl text-seafoam-900 mb-2">
                  ${service.priceTiers && service.priceTiers.length > 0
                    ? Math.min(...service.priceTiers.map((t) => t.price))
                    : service.startingPrice || 35}
                </p>
                <p className="text-sm text-seafoam-600 mb-4">Affordable pricing — 40% less than the average Tucson vet</p>

                {service.priceTiers && service.priceTiers.length > 0 && (
                  <div className="border-t border-seafoam-100 pt-4 mb-4 space-y-2">
                    {service.priceTiers.map((tier) => (
                      <div key={tier.id ?? tier.label} className="flex items-center justify-between text-sm">
                        <span className="text-seafoam-700">{tier.label}</span>
                        <span className="border-b border-dotted border-seafoam-200 flex-1 mx-3" />
                        <span className="font-semibold text-seafoam-800">${tier.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 mb-8">
                  {['No hidden fees or surprise charges', 'Transparent, upfront pricing', 'Locally owned — not a corporate chain'].map((text) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-seafoam-700/70">
                      <CircleCheck className="w-5 h-5 text-seafoam-500 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                {bookingUrl && (
                  <a href={bookingUrl} className="btn-pill w-full inline-flex items-center justify-center gap-2 bg-seafoam-600 hover:bg-seafoam-700 text-white py-4 rounded-full font-semibold shadow-lg shadow-seafoam-600/25 mb-3">
                    Book This Service
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
                {phone && (
                  <a href={formatPhoneForTel(phone)} className="w-full inline-flex items-center justify-center gap-2 text-seafoam-600 py-3 rounded-full font-medium text-sm hover:text-seafoam-800 transition-colors">
                    <Phone className="w-4 h-4" />
                    Or call {phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
              <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
                <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">What&apos;s Included</p>
                <h2 className="font-display text-3xl sm:text-4xl text-seafoam-900 leading-tight mb-6">
                  What to expect with your <span className="text-seafoam-500">low cost {service.title.toLowerCase()}</span>
                </h2>
                <p className="text-seafoam-600 text-sm leading-relaxed">Every {service.title.toLowerCase()} at Pet Care includes a comprehensive set of checks — no cutting corners, no hidden extras.</p>
              </div>

              <div className="lg:col-span-3">
                {features.map((item, i) => (
                  <div key={item.id ?? i} className={`flex gap-5 py-7 ${i > 0 ? 'border-t border-seafoam-100' : ''}`}>
                    <div className="w-10 h-10 bg-seafoam-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <CircleCheck className="w-5 h-5 text-seafoam-600" />
                    </div>
                    <div>
                      <h3 className="text-seafoam-900 font-semibold mb-1">{item.feature}</h3>
                      {item.description && (
                        <p className="text-seafoam-700 text-[15px] leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHY PET CARE — text-forward, SEO-rich ────────────────── */}
      <section className="py-20 lg:py-28 bg-seafoam-50/40 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-200/20 blob-1 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3 text-center">
              Why Tucson Families Choose Us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-seafoam-900 mb-10 leading-tight text-center">
              Affordable veterinary care <br className="hidden sm:block" />
              <span className="text-seafoam-500">without cutting corners.</span>
            </h2>

            <div className="space-y-6 text-seafoam-800/70 text-lg leading-relaxed mb-14">
              <p>
                Pet Care was founded by Tucson veterinary professionals who believe every pet deserves quality {service.title.toLowerCase()} — regardless of budget. Too many families are forced to choose between their finances and their pet&apos;s health. We built our clinic to change that.
              </p>
              <p>
                By keeping overhead low and cutting out corporate franchise fees, we offer the same standard of care you&apos;d find at any Tucson vet — at prices that are roughly 40% lower. No upselling, no surprise bills, just honest veterinary medicine from a team that genuinely cares about your pet.
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: '$35', label: 'Exam starting price' },
                { value: '40%', label: 'Below avg vet cost' },
                { value: '5,000+', label: 'Pets treated' },
                { value: '8+', label: 'Years in Tucson' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 text-center border border-seafoam-100">
                  <p className="font-display text-2xl sm:text-3xl text-seafoam-700 mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-seafoam-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ───────────────────────────────────────── */}
      {otherServices.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-[0.15em] mb-3">More Low Cost Services</p>
              <h2 className="font-display text-3xl sm:text-4xl text-seafoam-900">
                Affordable vet care for every need.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((s) => (
                <Link key={s.id} href={`/services/${s.slug || s.id}`} className="card-lift bg-white rounded-3xl p-8 border border-seafoam-100 group block">
                  <div className="w-12 h-12 bg-seafoam-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-seafoam-100 transition-colors">
                    <ServiceIcon icon={s.icon} className="w-6 h-6 text-seafoam-600" />
                  </div>
                  <h3 className="font-display text-xl text-seafoam-900 mb-2">{s.title}</h3>
                  {s.description && <p className="text-seafoam-700 text-sm leading-relaxed mb-4">{s.description}</p>}
                  {(s.startingPrice || (s.priceTiers && s.priceTiers.length > 0)) && (
                    <div className="flex items-center justify-between">
                      <span className="text-gold-600 font-semibold text-sm">From ${s.priceTiers && s.priceTiers.length > 0 ? Math.min(...s.priceTiers.map((t) => t.price)) : s.startingPrice}</span>
                      <span className="inline-flex items-center gap-1 text-seafoam-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 paw-pattern" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-seafoam-50 to-gold-50 rounded-[2rem] p-12 lg:p-16 border border-seafoam-100 shadow-xl shadow-seafoam-200/20">
            <div className="w-14 h-14 bg-seafoam-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-6">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-seafoam-900 mb-4">
              Ready to book affordable<br />{service.title.toLowerCase()} in Tucson?
            </h2>
            <p className="text-seafoam-700 text-lg mb-10 max-w-xl mx-auto">
              Walk-ins are always welcome, or book ahead to guarantee your spot. We can&apos;t wait to meet your furry family member.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {bookingUrl && (
                <a href={bookingUrl} className="btn-pill inline-flex items-center gap-3 bg-seafoam-600 hover:bg-seafoam-700 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-seafoam-600/25">
                  Book Appointment
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}
              {phone && (
                <a href={formatPhoneForTel(phone)} className="btn-pill inline-flex items-center gap-3 bg-white hover:bg-cream text-seafoam-700 px-8 py-4 rounded-full text-base font-semibold border-2 border-seafoam-200">
                  Call {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
