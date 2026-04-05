export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'dumpster-rental-cost',
    title: 'Dumpster Rental Cost: Complete Pricing Guide',
    excerpt:
      'Everything you need to know about dumpster rental pricing — size options, weight limits, rental periods, and tips for getting the best value on your project.',
    category: 'Tips & Guides',
    image: '/images/gallery/01.jpg',
    date: '2026-03-23',
    readTime: '8 min read',
  },
  {
    slug: 'yard-waste-disposal',
    title: 'Yard Waste Disposal: Rules & Best Options',
    excerpt:
      'Learn the rules for yard waste disposal in California — what counts as green waste, recycling options, and how a dumpster makes large cleanups easy.',
    category: 'Yard Waste',
    image: '/images/gallery/02.jpg',
    date: '2026-03-22',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-rent-a-dumpster',
    title: 'How to Rent a Dumpster: Step-by-Step Guide',
    excerpt:
      'First time renting a dumpster? Our complete step-by-step guide covers everything from choosing the right size to scheduling pickup.',
    category: 'Tips & Guides',
    image: '/images/gallery/03.jpg',
    date: '2026-03-21',
    readTime: '7 min read',
  },
  {
    slug: 'construction-debris-disposal',
    title: 'Construction Debris Disposal: What You Need to Know',
    excerpt:
      'A contractor\'s guide to disposing of construction debris — regulations, materials accepted, and how roll-off dumpsters simplify job site cleanup.',
    category: 'Construction',
    image: '/images/gallery/04.jpg',
    date: '2026-03-20',
    readTime: '8 min read',
  },
  {
    slug: 'what-size-dumpster-do-i-need',
    title: 'What Size Dumpster Do I Need?',
    excerpt:
      'Not sure which dumpster size is right? Compare 10, 20, and 30 yard options with real project examples to find the perfect fit.',
    category: 'Tips & Guides',
    image: '/images/gallery/05.jpg',
    date: '2026-03-19',
    readTime: '6 min read',
  },
  {
    slug: 'demolition-debris-removal',
    title: 'Demolition Debris Removal: Complete Guide',
    excerpt:
      'Planning a demolition project? Learn about debris types, disposal regulations, and how to efficiently manage waste removal with roll-off dumpsters.',
    category: 'Construction',
    image: '/images/gallery/06.jpg',
    date: '2026-03-18',
    readTime: '9 min read',
  },
  {
    slug: 'home-renovation-dumpster',
    title: 'Home Renovation Dumpster: Planning Your Project',
    excerpt:
      'Renovating your home? Find out how to plan waste removal for kitchen remodels, bathroom renovations, and whole-house projects.',
    category: 'Home Projects',
    image: '/images/gallery/07.png',
    date: '2026-03-17',
    readTime: '7 min read',
  },
  {
    slug: 'what-can-go-in-a-dumpster',
    title: 'What Can (and Can\'t) Go in a Dumpster',
    excerpt:
      'Avoid extra fees and violations — learn exactly what materials are accepted in a roll-off dumpster and what items are prohibited.',
    category: 'Tips & Guides',
    image: '/images/gallery/08.jpg',
    date: '2026-03-16',
    readTime: '5 min read',
  },
];
