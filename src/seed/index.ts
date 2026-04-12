import type { Payload, CollectionSlug } from 'payload'

const servicesData = [
  {
    title: 'Wellness Exams',
    slug: 'low-cost-wellness-exams',
    description: 'Comprehensive nose-to-tail checkups to keep your pet healthy and catch issues early.',
    longDescription: 'Our wellness exams are the foundation of preventive care. Each visit includes a thorough physical examination, weight assessment, and discussion of your pet\'s diet, behavior, and lifestyle. We take the time to really get to know your pet so we can catch potential health issues before they become serious problems.',
    startingPrice: 35,
    competitorPrice: 65,
    icon: 'heart' as const,

    features: [
      { feature: 'Complete Physical Examination', description: 'A thorough nose-to-tail check covering eyes, ears, heart, lungs, joints, skin, and abdomen to catch any potential issues early.' },
      { feature: 'Weight & Body Condition', description: 'We assess your pet\'s weight and body condition score, and provide guidance if any adjustments to diet or exercise are needed.' },
      { feature: 'Heart & Lung Check', description: 'Careful auscultation of the heart and lungs to detect murmurs, arrhythmias, or respiratory concerns before they become serious.' },
      { feature: 'Dental Health Review', description: 'We examine teeth and gums for signs of periodontal disease, which affects over 80% of pets by age three.' },
      { feature: 'Skin & Coat Evaluation', description: 'A close look at your pet\'s skin and coat for signs of allergies, parasites, infections, or nutritional deficiencies.' },
      { feature: 'Nutrition & Lifestyle Guidance', description: 'Personalized recommendations on diet, exercise, and preventive care tailored to your pet\'s breed, age, and lifestyle.' },
    ],
  },
  {
    title: 'Vaccinations',
    slug: 'low-cost-vaccinations',
    description: 'Core and lifestyle vaccines to protect your pet from preventable diseases. We follow AAHA guidelines.',
    longDescription: 'We follow AAHA (American Animal Hospital Association) vaccination guidelines to ensure your pet receives the right vaccines at the right time. We\'ll work with you to create a personalized vaccination schedule based on your pet\'s age, lifestyle, and risk factors.',
    startingPrice: 20,
    competitorPrice: 45,
    icon: 'syringe' as const,

    features: [
      { feature: 'Core Vaccines', description: 'Rabies, distemper, parvo, and other essential vaccines that every dog and cat needs for basic protection.' },
      { feature: 'Lifestyle Vaccines', description: 'Additional vaccines like Bordetella, Leptospirosis, or FeLV based on your pet\'s specific risk factors and lifestyle.' },
      { feature: 'Personalized Schedule', description: 'We create a vaccination timeline tailored to your pet\'s age, health history, and exposure risk — no one-size-fits-all approach.' },
      { feature: 'Puppy & Kitten Series', description: 'A carefully timed series of vaccinations for young pets to build strong immunity during their most vulnerable months.' },
      { feature: 'Booster Reminders', description: 'We\'ll send you reminders when your pet is due for annual or tri-annual boosters so nothing falls through the cracks.' },
      { feature: 'Vaccine Records', description: 'Complete documentation of all vaccines administered, available anytime you need it for boarding, travel, or licensing.' },
    ],
  },
  {
    title: 'Dental Cleaning',
    slug: 'low-cost-dental-cleaning',
    description: 'Professional cleanings and dental care to prevent painful oral disease and keep tails wagging.',
    longDescription: 'Dental disease affects over 80% of pets by age 3. Our professional dental cleanings include full oral examination, ultrasonic scaling, polishing, and fluoride treatment — all performed under safe anesthesia with continuous monitoring. We\'ll help keep your pet\'s mouth healthy and pain-free.',
    startingPrice: 150,
    competitorPrice: 350,
    icon: 'smile' as const,

    features: [
      { feature: 'Pre-Anesthetic Blood Work', description: 'We run a blood panel before any procedure to make sure your pet is healthy enough for anesthesia — safety always comes first.' },
      { feature: 'Full Oral Examination', description: 'A comprehensive exam of every tooth, the gums, tongue, and oral cavity to identify disease, fractures, or abnormalities.' },
      { feature: 'Ultrasonic Scaling & Polishing', description: 'Professional-grade ultrasonic tools remove plaque and tartar above and below the gumline, followed by polishing to smooth enamel.' },
      { feature: 'Dental X-Rays', description: 'Digital dental radiographs when needed to see what\'s happening beneath the gumline — where most dental disease hides.' },
      { feature: 'Fluoride Treatment', description: 'A protective fluoride application after cleaning to strengthen enamel and help prevent future tartar buildup.' },
      { feature: 'Home Care Plan', description: 'Personalized recommendations for at-home dental care including brushing techniques, dental chews, and water additives.' },
    ],
  },
  {
    title: 'Spay & Neuter',
    slug: 'low-cost-spay-neuter',
    description: 'Safe, affordable spay and neuter procedures with attentive post-op care.',
    longDescription: 'Spaying and neutering is one of the most important decisions you can make for your pet\'s long-term health. Our experienced surgical team performs these procedures daily with meticulous attention to safety and comfort. Every surgery includes pre-operative assessment, safe anesthesia, pain management, and detailed post-op care instructions.',
    startingPrice: 100,
    competitorPrice: 250,
    icon: 'scissors' as const,
    features: [
      { feature: 'Pre-Surgical Assessment', description: 'A complete health evaluation before surgery to ensure your pet is a safe candidate for the procedure.' },
      { feature: 'Safe, Monitored Anesthesia', description: 'We use modern anesthetic protocols with continuous monitoring of heart rate, oxygen, and blood pressure throughout.' },
      { feature: 'Experienced Surgical Team', description: 'Our veterinarians perform spay and neuter procedures daily — your pet is in skilled, practiced hands.' },
      { feature: 'Pain Management Included', description: 'Multi-modal pain relief is standard with every surgery so your pet stays comfortable during recovery.' },
      { feature: 'Post-Op Care Instructions', description: 'Clear, detailed take-home instructions so you know exactly how to care for your pet after surgery.' },
      { feature: 'Follow-Up Check Included', description: 'A complimentary post-operative check-up to make sure everything is healing properly — included in the price.' },
    ],
  },
  {
    title: 'Diagnostics & Lab',
    slug: 'low-cost-diagnostics-lab',
    description: 'In-house blood work, urinalysis, and digital X-rays with quick turnaround times.',
    longDescription: 'When your pet isn\'t feeling well, waiting for answers is stressful. Our in-house diagnostic laboratory delivers results fast — often within minutes. From routine blood panels to digital X-rays, we have the tools to diagnose and treat your pet quickly and accurately.',
    startingPrice: 45,
    competitorPrice: 85,
    icon: 'monitor' as const,
    features: [
      { feature: 'Complete Blood Count (CBC)', description: 'Measures red and white blood cells and platelets to detect infection, anemia, clotting issues, and more.' },
      { feature: 'Chemistry Panels', description: 'Evaluates organ function including liver, kidneys, and pancreas — essential for diagnosing internal issues.' },
      { feature: 'Urinalysis', description: 'Analyzes your pet\'s urine for signs of infection, kidney disease, diabetes, and other metabolic conditions.' },
      { feature: 'Digital X-Rays', description: 'High-quality digital radiographs available within minutes to evaluate bones, joints, chest, and abdomen.' },
      { feature: 'Parasite Screening', description: 'Fecal and blood tests to check for heartworm, intestinal parasites, and tick-borne diseases.' },
      { feature: 'Same-Day Results', description: 'Most in-house tests return results the same day so we can start treatment fast — no anxious waiting.' },
    ],
  },
  {
    title: 'Microchip',
    slug: 'low-cost-microchip',
    description: 'Quick, affordable microchipping to help reunite you with your pet if they ever get lost.',
    longDescription: 'A microchip is a tiny device (about the size of a grain of rice) placed under your pet\'s skin that contains a unique ID number. If your pet is ever lost and brought to a shelter or vet, they can scan the chip and contact you. It\'s a quick, one-time procedure that gives you peace of mind for life.',
    startingPrice: 25,
    competitorPrice: 50,
    icon: 'chip' as const,
    features: [
      { feature: 'Quick & Painless', description: 'The microchip is injected with a needle — similar to a routine vaccination. No anesthesia needed, takes seconds.' },
      { feature: 'Lifetime Identification', description: 'Unlike collars and tags that can fall off, a microchip provides permanent identification for your pet\'s entire life.' },
      { feature: 'National Registry', description: 'We register your chip with a national database so shelters and vets anywhere in the country can identify your pet.' },
      { feature: 'Any Visit Works', description: 'Microchipping can be done during any regular visit — no separate appointment needed.' },
      { feature: 'ISO-Compliant Chip', description: 'We use internationally standardized chips that can be read by any universal scanner worldwide.' },
      { feature: 'Free Registration Help', description: 'We walk you through the registration process and make sure your contact information is properly linked to your pet\'s chip.' },
    ],
  },
]

const testimonialsData = [
  {
    quote: 'We switched from a big-name vet and saved hundreds. But the best part? They actually take time with our dog. No rush, no pressure to buy extras.',
    authorName: 'Maria R.',
    authorDescription: 'Dog mom to Biscuit',
    authorInitials: 'MR',
    rating: 5,
  },
  {
    quote: 'My cat needed emergency dental work and I was dreading the bill. Pet Care was literally half the price of the other quotes I got, and the care was excellent.',
    authorName: 'Tyler K.',
    authorDescription: 'Cat dad to Mochi',
    authorInitials: 'TK',
    rating: 5,
  },
  {
    quote: "As a first-time pet owner, they were so patient explaining everything. I never felt judged for asking questions. This is what vet care should be.",
    authorName: 'Ashley P.',
    authorDescription: 'Puppy mom to Nugget',
    authorInitials: 'AP',
    rating: 5,
  },
]

async function upsertCollection(
  payload: Payload,
  collection: CollectionSlug,
  items: Record<string, unknown>[],
  matchField: string,
) {
  const ids: string[] = []

  for (const item of items) {
    const existing = await payload.find({
      collection,
      where: { [matchField]: { equals: item[matchField] } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection,
        id: existing.docs[0].id,
        data: item,
      })
      ids.push(String(existing.docs[0].id))
    } else {
      const doc = await payload.create({
        collection,
        data: item,
      })
      ids.push(String(doc.id))
    }
  }

  return ids
}

const spacing = { spacingTop: '0' as const, spacingBottom: '0' as const }

export async function seed(payload: Payload) {
  console.log('Seeding clinic info...')
  await payload.updateGlobal({
    slug: 'clinic-info',
    data: {
      phone: '(555) 012-3456',
      email: 'hello@petcarevet.com',
      bookingUrl: '/contact',
      address: {
        street: '4501 E Speedway Blvd',
        city: 'Tucson',
        state: 'AZ',
        zip: '85712',
      },
      hours: [
        { days: 'Mon–Fri', hours: '8am – 6pm' },
        { days: 'Saturday', hours: '9am – 3pm' },
        { days: 'Sunday', hours: 'Closed' },
      ],
    },
  })
  console.log('Seeded clinic info')

  console.log('Seeding services...')
  const serviceIds = await upsertCollection(payload, 'services', servicesData, 'title')
  console.log(`Seeded ${serviceIds.length} services`)

  console.log('Seeding testimonials...')
  const testimonialIds = await upsertCollection(payload, 'testimonials', testimonialsData, 'authorName')
  console.log(`Seeded ${testimonialIds.length} testimonials`)

  console.log('Seeding home page...')
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const pageData = {
    title: 'Home',
    slug: 'home',
    _status: 'published' as const,
    content: [
      {
        blockType: 'hero' as const,
        badge: 'Locally owned \u00B7 Affordable care',
        title: 'Your pet deserves {{gentle, honest}} veterinary care.',
        subtitle: "We\u2019re locally owned \u2014 no franchise fees, no corporate markup. Just quality vet care at prices that won\u2019t make you wince.",
        showPriceBadge: true,
        priceBadgeLabel: 'Exams from',
        priceBadgePrice: '$35',
        trustSignalText: '500+ happy pet families',
        blockSettings: spacing,
      },
      {
        blockType: 'service-marquee' as const,
        blockSettings: spacing,
      },
      {
        blockType: 'services' as const,
        eyebrow: 'What We Offer',
        heading: 'Compassionate care, honest prices.',
        description: 'We keep things simple \u2014 great veterinary care without the corporate overhead. No upselling, no hidden fees.',
        services: serviceIds,
        showCtaCard: true,
        ctaHeading: 'Not sure what your pet needs?',
        ctaDescription: "Give us a call or walk in \u2014 we'll figure it out together. No appointment necessary.",
        ctaButtonLabel: 'Contact Us',
        ctaButtonLink: '/contact',
        blockSettings: spacing,
      },
      {
        blockType: 'about' as const,
        eyebrow: 'Our Story',
        heading: "We opened because vet care shouldn't break the bank.",
        body: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Pet Care was founded by a team of veterinary professionals who saw too many families forced to choose between their budget and their pet's health. That didn't sit right with us.",
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "We built a clinic with lower overhead, no corporate franchise fees, and a focus on what actually matters \u2014 your pet's wellbeing. We pass those savings directly to you.",
                  },
                ],
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            version: 1,
          },
        },
        stats: [
          { value: '8+', label: 'Years serving our community' },
          { value: '5k+', label: 'Pets treated and counting' },
          { value: '40%', label: 'Less than avg vet clinic costs' },
        ],
        blockSettings: spacing,
      },
      {
        blockType: 'pricing' as const,
        eyebrow: 'Transparent Pricing',
        heading: 'No surprises. Just fair prices.',
        description: "Here's what you'll actually pay. No hidden fees, no upselling.",
        services: serviceIds,
        blockSettings: spacing,
      },
      {
        blockType: 'testimonials' as const,
        eyebrow: 'Kind Words',
        heading: 'Loved by pets (and their humans).',
        testimonials: testimonialIds,
        blockSettings: spacing,
      },
      {
        blockType: 'cta' as const,
        heading: 'Ready to give your pet the care they deserve?',
        description: "Walk-ins are always welcome, or book ahead to guarantee your spot. We can't wait to meet your furry family member.",
        buttons: [
          { label: 'Book Appointment', link: '/contact', variant: 'default' as const },
          { label: 'Call (555) 012-3456', link: 'tel:5550123456', variant: 'outline' as const },
        ],
        blockSettings: spacing,
      },
    ],
  }

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData,
    })
    console.log('Updated home page')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData,
    })
    console.log('Created home page')
  }

  console.log('Seed complete!')
}
