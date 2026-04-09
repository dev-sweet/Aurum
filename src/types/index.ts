export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'watches' | 'clothing' | 'accessories' | 'home' | 'leather';
  collection: string;
  description: string;
  shortDescription: string;
  materials: string[];
  tags: string[];
  images: string[];
  thumbnail: string;
  isNew?: boolean;
  isLimited?: boolean;
  isEditorChoice?: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  details?: string;
  careInstructions?: string;
  shippingInfo?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'material';
  options: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: { type: string; value: string };
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface EditorialStory {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  tier: 'select' | 'private' | 'black';
  price: number;
  priceText: string;
  description: string;
  features: string[];
  isInvitationOnly?: boolean;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  materials: string[];
  inStockOnly: boolean;
  sortBy: SortOption;
}

export interface CheckoutStep {
  id: number;
  name: string;
  isComplete: boolean;
  isActive: boolean;
}

export interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface DeliveryMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}
