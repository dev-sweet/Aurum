import { Product, Collection, Review, MembershipTier, DeliveryMethod, EditorialStory } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Obsidian Chronograph',
    slug: 'obsidian-chronograph',
    price: 12400,
    category: 'watches',
    collection: 'The Obsidian Series',
    description: 'A masterwork of horological excellence, the Obsidian Chronograph embodies the pinnacle of Swiss craftsmanship. Each piece requires over 200 hours of meticulous hand-assembly by our master watchmakers in Geneva. The case, hewn from a single block of black ceramic, houses a self-winding movement with 72-hour power reserve. The dial features hand-applied gold indices and a date complication visible through the sapphire crystal caseback.',
    shortDescription: 'Swiss automatic chronograph with 72-hour power reserve. Black ceramic case with sapphire crystal.',
    materials: ['Black Ceramic', 'Sapphire Crystal', 'Swiss Movement', 'Alligator Leather'],
    tags: ['Limited Edition', 'Swiss Made', 'Chronograph'],
    images: ['/products/watch-1.jpg', '/products/watch-1.jpg', '/products/watch-1.jpg', '/products/watch-1.jpg'],
    thumbnail: '/products/watch-1.jpg',
    isNew: true,
    isLimited: true,
    isEditorChoice: true,
    stock: 3,
    rating: 4.9,
    reviewCount: 47,
    variants: [
      { id: 'v1', name: 'Strap', type: 'material', options: ['Alligator Black', 'Alligator Brown', 'Rubber Black'] }
    ],
    details: 'Case diameter: 42mm. Water resistance: 100m. Movement: Caliber AU.3250. Functions: Hours, minutes, seconds, chronograph, date.',
    careInstructions: 'Store in original presentation box. Service recommended every 3-5 years. Avoid exposure to extreme temperatures.',
    shippingInfo: 'Complimentary worldwide shipping via white-glove delivery. Includes certificate of authenticity and presentation box.'
  },
  {
    id: '2',
    name: 'Manteau Noir',
    slug: 'manteau-noir',
    price: 8900,
    category: 'clothing',
    collection: 'La Maison Capsule',
    description: 'The Manteau Noir represents the apex of outerwear craftsmanship. Cut from the finest Italian cashmere and wool blend, this coat features a tailored silhouette that transcends seasonal trends. The hand-stitched lapels and horn buttons speak to a level of detail found only in the most exclusive ateliers.',
    shortDescription: 'Italian cashmere-wool blend overcoat with horn buttons. Tailored silhouette.',
    materials: ['Italian Cashmere', 'Virgin Wool', 'Horn Buttons', 'Silk Lining'],
    tags: ['Made in Italy', 'Limited Edition'],
    images: ['/products/coat-1.jpg', '/products/coat-1.jpg', '/products/coat-1.jpg', '/products/coat-1.jpg'],
    thumbnail: '/products/coat-1.jpg',
    isLimited: true,
    stock: 8,
    rating: 4.8,
    reviewCount: 23,
    variants: [
      { id: 'v2', name: 'Size', type: 'size', options: ['46', '48', '50', '52', '54'] }
    ]
  },
  {
    id: '3',
    name: 'The Venetian Writing Desk',
    slug: 'venetian-writing-desk',
    price: 22500,
    category: 'home',
    collection: 'Aurum Home Objects',
    description: 'Commissioned from master furniture artisans in the Veneto region, this writing desk exemplifies the marriage of form and function. Hand-rubbed walnut burl veneer is accented with hand-forged brass hardware. Each desk requires six months to complete, making every piece truly unique.',
    shortDescription: 'Handcrafted walnut writing desk with brass hardware. Made to order.',
    materials: ['Walnut Burl', 'Hand-forged Brass', 'Leather Writing Surface'],
    tags: ['Made to Order', 'Artisan Crafted'],
    images: ['/products/desk-1.jpg', '/products/desk-1.jpg', '/products/desk-1.jpg'],
    thumbnail: '/products/desk-1.jpg',
    isNew: true,
    stock: 2,
    rating: 5.0,
    reviewCount: 8,
    details: 'Dimensions: 140cm x 70cm x 78cm. Lead time: 6 months from order. Includes leather desk pad.'
  },
  {
    id: '4',
    name: 'Côte d\'Azur Silk Shirt',
    slug: 'cote-dazur-silk-shirt',
    price: 2800,
    category: 'clothing',
    collection: 'La Maison Capsule',
    description: 'Woven from the finest mulberry silk in Como, Italy, this shirt captures the effortless elegance of the French Riviera. The relaxed fit and mother-of-pearl buttons create a garment that transitions seamlessly from yacht to dinner.',
    shortDescription: 'Pure mulberry silk shirt with mother-of-pearl buttons. Relaxed fit.',
    materials: ['Mulberry Silk', 'Mother-of-Pearl Buttons'],
    tags: ['Made in Italy'],
    images: ['/products/shirt-1.jpg', '/products/shirt-1.jpg', '/products/shirt-1.jpg'],
    thumbnail: '/products/shirt-1.jpg',
    stock: 15,
    rating: 4.7,
    reviewCount: 34,
    variants: [
      { id: 'v4', name: 'Size', type: 'size', options: ['S', 'M', 'L', 'XL'] }
    ]
  },
  {
    id: '5',
    name: 'The Evening Clutch No. 3',
    slug: 'evening-clutch-no-3',
    price: 4500,
    category: 'accessories',
    collection: 'The Archive',
    description: 'Part of our exclusive Archive collection, this evening clutch showcases the art of miniature leatherwork. Handcrafted from alligator skin with 24k gold-plated hardware, each piece is numbered and accompanied by a certificate of authenticity.',
    shortDescription: 'Alligator evening clutch with 24k gold hardware. Numbered edition.',
    materials: ['Alligator Skin', '24k Gold-plated Hardware', 'Silk Lining'],
    tags: ['Numbered Edition', 'Handcrafted'],
    images: ['/products/clutch-1.jpg', '/products/clutch-1.jpg', '/products/clutch-1.jpg'],
    thumbnail: '/products/clutch-1.jpg',
    isLimited: true,
    stock: 12,
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: '6',
    name: 'The Aurum Cufflinks',
    slug: 'aurum-cufflinks',
    price: 1800,
    category: 'accessories',
    collection: 'The Obsidian Series',
    description: 'Sculpted from solid 18k yellow gold, these cufflinks feature our signature obsidian inlay. The push-button mechanism ensures effortless wear while maintaining a sleek profile.',
    shortDescription: '18k yellow gold cufflinks with obsidian inlay. Push-button closure.',
    materials: ['18k Yellow Gold', 'Obsidian'],
    tags: ['Handcrafted'],
    images: ['/products/cufflinks-1.jpg', '/products/cufflinks-1-2.jpg'],
    thumbnail: '/products/cufflinks-1.jpg',
    stock: 25,
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: '7',
    name: 'Cashmere Travel Set',
    slug: 'cashmere-travel-set',
    price: 3600,
    category: 'accessories',
    collection: 'Aurum Home Objects',
    description: 'Designed for the discerning traveler, this set includes a cashmere blanket, eye mask, and neck pillow—all crafted from Grade-A Mongolian cashmere. Presented in a leather travel case.',
    shortDescription: 'Grade-A Mongolian cashmere travel set. Includes blanket, pillow, and eye mask.',
    materials: ['Mongolian Cashmere', 'Leather Case'],
    tags: ['Gift Set'],
    images: ['/products/travel-set-1.jpg', '/products/travel-set-1-2.jpg'],
    thumbnail: '/products/travel-set-1.jpg',
    isNew: true,
    stock: 18,
    rating: 4.6,
    reviewCount: 28
  },
  {
    id: '8',
    name: 'The Geneva Timepiece',
    slug: 'geneva-timepiece',
    price: 18500,
    category: 'watches',
    collection: 'The Obsidian Series',
    description: 'A dress watch of unparalleled refinement. The Geneva Timepiece features a platinum case, grand feu enamel dial, and hand-wound movement visible through the exhibition caseback. Water resistant to 30 meters.',
    shortDescription: 'Platinum dress watch with enamel dial. Hand-wound movement.',
    materials: ['Platinum', 'Enamel Dial', 'Sapphire Crystal', 'Alligator Strap'],
    tags: ['Swiss Made', 'Platinum'],
    images: ['/products/watch-2.jpg', '/products/watch-2.jpg', '/products/watch-2.jpg'],
    thumbnail: '/products/watch-2.jpg',
    isLimited: true,
    stock: 5,
    rating: 5.0,
    reviewCount: 12
  },
  {
    id: '9',
    name: 'The Artisan Belt',
    slug: 'artisan-belt',
    price: 1200,
    category: 'leather',
    collection: 'The Archive',
    description: 'Hand-braided from Italian calfskin with a solid brass buckle finished in 18k gold. Each belt is cut from a single hide, ensuring consistent grain and color throughout.',
    shortDescription: 'Hand-braided Italian calfskin belt with 18k gold-finished buckle.',
    materials: ['Italian Calfskin', 'Solid Brass', '18k Gold Finish'],
    tags: ['Hand-braided'],
    images: ['/products/belt-1.jpg', '/products/belt-1-2.jpg'],
    thumbnail: '/products/belt-1.jpg',
    stock: 30,
    rating: 4.7,
    reviewCount: 56,
    variants: [
      { id: 'v9', name: 'Size', type: 'size', options: ['32', '34', '36', '38', '40'] }
    ]
  },
  {
    id: '10',
    name: 'The Monogram Robe',
    slug: 'monogram-robe',
    price: 2400,
    category: 'clothing',
    collection: 'Aurum Home Objects',
    description: 'Woven from Turkish cotton of exceptional quality, this robe features a shawl collar and patch pockets. Each piece can be monogrammed with up to three initials.',
    shortDescription: 'Turkish cotton robe with optional monogramming. Shawl collar.',
    materials: ['Turkish Cotton'],
    tags: ['Monogram Available'],
    images: ['/products/robe-1.jpg', '/products/robe-1-2.jpg'],
    thumbnail: '/products/robe-1.jpg',
    stock: 22,
    rating: 4.5,
    reviewCount: 31
  },
  {
    id: '11',
    name: 'The Vault Watch Box',
    slug: 'vault-watch-box',
    price: 4200,
    category: 'home',
    collection: 'Aurum Home Objects',
    description: 'Designed to house six timepieces, The Vault features a carbon fiber exterior and suede-lined interior. A built-in humidifier maintains optimal conditions for mechanical movements.',
    shortDescription: 'Carbon fiber watch box with built-in humidifier. Holds six timepieces.',
    materials: ['Carbon Fiber', 'Alcantara', 'Suede'],
    tags: ['Collector\'s Item'],
    images: ['/products/watch-box-1.jpg', '/products/watch-box-1-2.jpg'],
    thumbnail: '/products/watch-box-1.jpg',
    stock: 10,
    rating: 4.8,
    reviewCount: 14
  },
  {
    id: '12',
    name: 'The Travel Trunk',
    slug: 'travel-trunk',
    price: 15800,
    category: 'leather',
    collection: 'The Archive',
    description: 'Inspired by the golden age of travel, this trunk is handcrafted from coated canvas and leather trim. Interior compartments can be customized to your specifications. Includes numbered lock and key set.',
    shortDescription: 'Coated canvas trunk with leather trim. Customizable interior.',
    materials: ['Coated Canvas', 'Vachetta Leather', 'Brass Hardware'],
    tags: ['Made to Order'],
    images: ['/products/trunk-1.jpg', '/products/trunk-1.jpg', '/products/trunk-1.jpg'],
    thumbnail: '/products/trunk-1.jpg',
    isLimited: true,
    stock: 4,
    rating: 4.9,
    reviewCount: 7
  },
   {
    id: '13',
    name: 'The Travel Trunk',
    slug: 'travel-trunk',
    price: 15800,
    category: 'leather',
    collection: 'La Maison Capsule',
    description: 'Inspired by the golden age of travel, this trunk is handcrafted from coated canvas and leather trim. Interior compartments can be customized to your specifications. Includes numbered lock and key set.',
    shortDescription: 'Coated canvas trunk with leather trim. Customizable interior.',
    materials: ['Coated Canvas', 'Vachetta Leather', 'Brass Hardware'],
    tags: ['Made to Order'],
    images: ['/products/trunk-1.jpg', '/products/trunk-1.jpg', '/products/trunk-1.jpg'],
    thumbnail: '/products/coat-2.jpg',
    isLimited: true,
    stock: 4,
    rating: 4.9,
    reviewCount: 7
  },
  {
  id: '14',
  name: 'Portofino Leather Loafers',
  slug: 'portofino-leather-loafers',
  price: 4500,
  category: 'home',
  collection: 'Aurum Home Objects',
  description: 'Hand-stitched in Tuscany, the Portofino Loafer uses ultra-soft pebbled calfskin leather that molds to your foot over time. The lightweight rubber sole provides traction on cobblestone streets, while the minimalist profile ensures they pair perfectly with silk or linen.',
  shortDescription: 'Hand-stitched calfskin loafers with a flexible sole.',
  materials: ['Pebbled Calfskin', 'Natural Rubber Sole'],
  tags: ['Handmade', 'Made in Italy'],
  images: ['/products/loafers-1.jpg', '/products/loafers-2.jpg', '/products/loafers-3.jpg'],
  thumbnail: '/products/home-1.jpg',
  stock: 8,
  rating: 4.8,
  reviewCount: 52,
},
{
  id: '14',
  name: 'Mediterranean Linen Trousers',
  slug: 'mediterranean-linen-trousers',
  price: 1950,
  category: 'home',
  collection: 'Aurum Home Objects',
  description: 'Crafted from sustainably sourced Belgian flax, these wide-leg trousers offer unparalleled breathability. Featuring a tailored high-waist and discreet side pockets, they are designed for the modern traveler who refuses to compromise on comfort or structure.',
  shortDescription: 'High-waisted Belgian linen trousers with a wide-leg silhouette.',
  materials: ['100% Belgian Linen', 'Recycled Cotton Lining'],
  tags: ['Sustainable', 'Breathable'],
  images: ['/products/trousers-1.jpg', '/products/trousers-2.jpg'],
  thumbnail: '/products/home-2.jpg',
  stock: 22,
  rating: 4.9,
  reviewCount: 18,
}
];

export const collections: Collection[] = [
  {
    id: 'c1',
    name: 'The Obsidian Series',
    slug: 'obsidian-series',
    category: 'Watches',
    description: 'Timepieces that transcend time. Each watch in this collection represents the pinnacle of horological achievement.',
    image: '/products/watch-1.jpg',
    itemCount: 14
  },
  {
    id: 'c2',
    name: 'La Maison Capsule',
    slug: 'maison-capsule',
    category: 'Clothing',
    description: 'Exceptional garments for exceptional moments. Limited production, unlimited refinement.',
    image: '/products/coat-1.jpg',
    itemCount: 8
  },
  {
    id: 'c3',
    name: 'Aurum Home Objects',
    slug: 'home-objects',
    category: 'Lifestyle',
    description: 'Objects that transform spaces into sanctuaries. Each piece designed for those who appreciate the art of living.',
    image: '/products/desk-1.jpg',
    itemCount: 12
  },
  {
    id: 'c4',
    name: 'The Archive',
    slug: 'archive',
    category: 'Rare Pieces',
    description: 'Limited editions, discontinued styles, and one-of-a-kind pieces. Once gone, they are gone forever.',
    image: '/products/trunk-1.jpg',
    itemCount: 6
  },
  
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'James H.',
    rating: 5,
    title: 'Exceptional Craftsmanship',
    content: 'The Obsidian Chronograph exceeded every expectation. The weight, the finish, the movement—everything speaks to true craftsmanship. This is not a watch; it is an heirloom.',
    date: 'December 2024',
    verified: true
  },
  {
    id: 'r2',
    author: 'Victoria L.',
    rating: 5,
    title: 'Worth Every Moment of the Wait',
    content: 'I ordered the Venetian Writing Desk and waited six months. It arrived yesterday and I can confidently say it was worth every day. The attention to detail is extraordinary.',
    date: 'November 2024',
    verified: true
  },
  {
    id: 'r3',
    author: 'Alexander M.',
    rating: 5,
    title: 'Quiet Luxury at Its Finest',
    content: 'The Manteau Noir is exactly what I was searching for—no logos, no flash, just impeccable tailoring and the finest materials. This is how luxury should be.',
    date: 'October 2024',
    verified: true
  }
];

export const membershipTiers: MembershipTier[] = [
  {
    id: 'm1',
    name: 'AURUM SELECT',
    tier: 'select',
    price: 0,
    priceText: 'Complimentary',
    description: 'Your entry into the world of AURUM.',
    features: [
      'Early access to new collections',
      'Complimentary standard shipping',
      'Digital lookbooks',
      'Birthday recognition'
    ]
  },
  {
    id: 'm2',
    name: 'AURUM PRIVATE',
    tier: 'private',
    price: 500,
    priceText: '$500 / Year',
    description: 'For those who demand more.',
    features: [
      'All SELECT benefits',
      'Dedicated personal stylist',
      'Access to exclusive pieces',
      'Private shopping events',
      'Complimentary alterations',
      'Priority customer service'
    ]
  },
  {
    id: 'm3',
    name: 'AURUM BLACK',
    tier: 'black',
    price: 0,
    priceText: 'Invitation Only',
    description: 'The highest echelon of privilege.',
    features: [
      'All PRIVATE benefits',
      'Bespoke commissions',
      'First access to archive sales',
      'Global concierge service',
      'Private atelier appointments',
      'Annual gift selection'
    ],
    isInvitationOnly: true
  }
];

export const deliveryMethods: DeliveryMethod[] = [
  {
    id: 'd1',
    name: 'Standard White-Glove',
    description: 'Signature required. Presented in our signature packaging.',
    price: 0,
    estimatedDays: '5–7 business days'
  },
  {
    id: 'd2',
    name: 'Express White-Glove',
    description: 'Priority handling with dedicated courier.',
    price: 85,
    estimatedDays: '2–3 business days'
  },
  {
    id: 'd3',
    name: 'Private Courier',
    description: 'Next-day delivery with personal handover.',
    price: 250,
    estimatedDays: 'Next business day'
  }
];

export const editorialStories: EditorialStory[] = [
  {
    id: 'e1',
    title: 'The Obsidian Winter — A Study in Restraint',
    slug: 'obsidian-winter',
    excerpt: 'Exploring the intersection of darkness and light through the lens of our Autumn/Winter collection.',
    image: '/products/coat-1.jpg',
    date: 'November 2024'
  },
  {
    id: 'e2',
    title: 'The Art of Time',
    slug: 'art-of-time',
    excerpt: 'A meditation on horology and the artisans who keep the ancient traditions alive.',
    image: '/products/watch-1.jpg',
    date: 'October 2024'
  },
  {
    id: 'e3',
    title: 'Venetian Dreams',
    slug: 'venetian-dreams',
    excerpt: 'Journey through the workshops of the Veneto, where furniture becomes art.',
    image: '/products/desk-1.jpg',
    date: 'September 2024'
  }
];

export const materials = [
  { id: 'gold', name: 'Gold', label: '18k Yellow Gold' },
  { id: 'platinum', name: 'Platinum', label: 'Platinum' },
  { id: 'leather', name: 'Leather', label: 'Italian Leather' },
  { id: 'silk', name: 'Silk', label: 'Pure Silk' },
  { id: 'cashmere', name: 'Cashmere', label: 'Cashmere' },
  { id: 'ceramic', name: 'Ceramic', label: 'High-tech Ceramic' }
];
