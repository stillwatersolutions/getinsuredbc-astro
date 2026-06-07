export interface Product {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  what: string[];
  benefits: { title: string; description: string }[];
  whoIntro: string;
  who: string[];
}

export const products: Product[] = [
  {
    slug: 'term-life-insurance',
    name: 'Term Life Insurance',
    title: 'Term Life Insurance in BC',
    subtitle: 'Simple, affordable protection for your family during your most critical years.',
    metaDescription:
      'Affordable term life insurance for British Columbia families. Fixed rates, flexible coverage, and a fast, simple application. Get your free quote.',
    what: [
      'Term life insurance provides coverage for a specific period of time — typically 10, 15, 20, or 30 years. It is designed to protect your family financially during the years when they need it most.',
      'If you pass away during the term, your beneficiaries receive a tax-free lump sum that can help cover mortgage payments, education costs, daily expenses, and other financial obligations.',
      'Term life is the most affordable type of life insurance, making it an excellent choice for young families, new homeowners, or anyone on a budget who wants to ensure their loved ones are protected.',
    ],
    benefits: [
      { title: 'Affordable premiums', description: 'Substantial coverage for less than the cost of your weekly coffee run.' },
      { title: 'Fixed rates', description: 'Your premium stays the same throughout the entire term — no surprises.' },
      { title: 'Flexible coverage', description: 'Choose coverage from $100,000 to $5 million or more based on your needs.' },
      { title: 'Simple application', description: 'Quick approval, often with no medical exam for healthy applicants.' },
      { title: 'Tax-free benefit', description: 'Your beneficiaries receive the full death benefit tax-free.' },
      { title: 'Convertible options', description: 'Many policies convert to permanent insurance without a new medical exam.' },
    ],
    whoIntro: 'Term life insurance is ideal if you:',
    who: [
      'Have young children or dependents who rely on your income',
      'Have a mortgage or other significant debts',
      'Want your family to maintain their lifestyle if something happens to you',
      'Need affordable coverage during your working years',
      'Want to cover future education expenses for your children',
    ],
  },
  {
    slug: 'whole-life-insurance',
    name: 'Whole Life Insurance',
    title: 'Whole Life Insurance in BC',
    subtitle: 'Lifelong protection that also builds cash value you can use.',
    metaDescription:
      'Whole life insurance for British Columbians: permanent coverage, guaranteed payout, and tax-advantaged cash value. Compare your options and get a quote.',
    what: [
      'Whole life insurance covers you for your entire life, as long as premiums are paid. Unlike term insurance, it never expires.',
      'It also includes a cash value component that grows over time on a tax-advantaged basis. You can borrow against it or, in some cases, withdraw from it during your lifetime.',
      'Because it is permanent and builds value, whole life costs more than term — but it offers certainty, estate-planning benefits, and a guaranteed payout for your beneficiaries.',
    ],
    benefits: [
      { title: 'Lifelong coverage', description: 'Protection that never expires as long as premiums are paid.' },
      { title: 'Builds cash value', description: 'A portion of every premium grows on a tax-advantaged basis.' },
      { title: 'Fixed premiums', description: 'Your rate is locked in and never increases with age.' },
      { title: 'Guaranteed payout', description: 'Your beneficiaries receive a tax-free benefit, whenever that day comes.' },
      { title: 'Estate planning', description: 'A powerful tool for transferring wealth and covering final costs.' },
      { title: 'Access to value', description: 'Borrow against your accumulated cash value when you need it.' },
    ],
    whoIntro: 'Whole life insurance is a strong fit if you:',
    who: [
      'Want permanent coverage that lasts your whole life',
      'Are focused on estate planning or leaving an inheritance',
      'Support a dependent with lifelong needs',
      'Have maxed out other tax-advantaged savings and want more',
      'Own a business and are planning for succession',
    ],
  },
  {
    slug: 'critical-illness-insurance',
    name: 'Critical Illness Insurance',
    title: 'Critical Illness Insurance in BC',
    subtitle: 'A tax-free lump sum if you are diagnosed with a covered serious illness.',
    metaDescription:
      'Critical illness insurance for British Columbians. Receive a tax-free lump sum on diagnosis of cancer, heart attack, stroke and more. Get a free quote.',
    what: [
      'Critical illness insurance pays you a tax-free lump sum if you are diagnosed with one of the serious conditions your policy covers — commonly cancer, heart attack, and stroke.',
      'The money is yours to use however you need: covering treatment costs, replacing lost income, paying the mortgage, or simply taking time off to recover without financial stress.',
      'It fills a gap that life insurance and disability insurance do not: cash in hand when a major health event hits, even if you survive and eventually return to work.',
    ],
    benefits: [
      { title: 'Lump-sum payout', description: 'Receive a tax-free cash benefit on diagnosis of a covered condition.' },
      { title: 'Use it any way', description: 'Spend the money on treatment, bills, income, or recovery — your choice.' },
      { title: 'Covers major conditions', description: 'Cancer, heart attack, stroke and many other serious illnesses.' },
      { title: 'Protects your savings', description: 'Avoid draining retirement or emergency funds during recovery.' },
      { title: 'Complements life insurance', description: 'Provides protection while you are living, not only after.' },
      { title: 'Return-of-premium options', description: 'Some plans refund your premiums if you never make a claim.' },
    ],
    whoIntro: 'Critical illness coverage makes sense if you:',
    who: [
      'Have a family history of cancer, heart disease, or stroke',
      'Are the primary earner for your household',
      'Are self-employed without paid sick leave',
      'Want to protect your savings and retirement from a health shock',
      'Carry a mortgage or other major financial commitments',
    ],
  },
  {
    slug: 'disability-insurance',
    name: 'Disability Insurance',
    title: 'Disability Insurance in BC',
    subtitle: 'Replace your income if illness or injury stops you from working.',
    metaDescription:
      'Disability insurance for British Columbians. Replace a portion of your income if you cannot work due to illness or injury. Protect your paycheque — get a quote.',
    what: [
      'Disability insurance replaces a portion of your income if you become unable to work due to illness or injury. For most people, their ability to earn an income is their single biggest financial asset.',
      'Benefits are typically paid monthly and, when you pay the premiums personally, are usually received tax-free. You choose the waiting period and benefit period that fit your situation.',
      'Group coverage through work is often limited and disappears if you change jobs. A personal policy stays with you and can be tailored to your occupation and income.',
    ],
    benefits: [
      { title: 'Income replacement', description: 'Receive monthly benefits to cover your essential expenses.' },
      { title: 'Illness and injury', description: 'Covers conditions that keep you from working, not just accidents.' },
      { title: 'Tax-free benefits', description: 'When you pay premiums personally, benefits are typically tax-free.' },
      { title: 'Customizable terms', description: 'Choose your waiting period and how long benefits last.' },
      { title: 'Own-occupation options', description: 'Get paid if you cannot work in your specific profession.' },
      { title: 'Stays with you', description: 'Unlike group coverage, a personal policy follows you between jobs.' },
    ],
    whoIntro: 'Disability insurance is especially important if you:',
    who: [
      'Are self-employed or earn commission income',
      'Have little or no disability coverage through work',
      'Are the primary earner for your household',
      'Work in a physically demanding occupation',
      'Could not cover your bills for long if your income stopped',
    ],
  },
];
