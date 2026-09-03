export interface ResortImage {
  id: string;
  url: string;
  title: string;
  category: 'all' | 'scenery' | 'rooms' | 'pool' | 'dining' | 'activities';
  description: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface RoomPackage {
  id: string;
  name: string;
  kannadaName?: string;
  tagline: string;
  pricePerNight: number;
  originalPrice: number;
  capacity: string;
  bedType: string;
  image: string;
  gallery: string[];
  features: string[];
  cancellation: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface GuestReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  tripType: string;
  comment: string;
  helpfulCount: number;
  verified: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface PriceProvider {
  name: string;
  logo: string;
  price: number;
  cancellationText: string;
  badge?: string;
  isDirect?: boolean;
}

export interface BookingState {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  includeCampfire: boolean;
  includeFoodPackage: boolean;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  notes: string;
}
