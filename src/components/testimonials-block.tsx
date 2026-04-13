import type { Testimonial } from '@/payload-types'

export type TestimonialsBlockProps = {
  eyebrow?: string | null
  heading?: string | null
  testimonials?: (Testimonial | string)[] | null
}

export function TestimonialsBlock({ eyebrow, heading, testimonials }: TestimonialsBlockProps) {
  const resolved = testimonials?.filter(
    (t): t is Testimonial => typeof t !== 'string',
  )

  return (
    <div id="reviews" className="py-20 lg:py-24 bg-seafoam-800 text-white relative overflow-hidden noise-overlay">
      <div className="absolute top-0 right-0 w-96 h-96 bg-seafoam-700/50 blob-1 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-500/10 blob-2 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {eyebrow && (
            <p className="text-sm font-semibold text-gold-400 uppercase tracking-[0.15em] mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-display text-4xl sm:text-5xl">{heading}</h2>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resolved?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              {testimonial.rating && (
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <p className="text-white/85 text-sm leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-seafoam-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {testimonial.authorInitials || testimonial.authorName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.authorName}</p>
                  {testimonial.authorDescription && (
                    <p className="text-xs text-white/60">{testimonial.authorDescription}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
