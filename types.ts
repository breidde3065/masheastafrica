
export interface SearchCriteria {
  tripType: 'one-way' | 'round-trip';
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
}

export interface Trip {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  availableSeats: number;
  tripCode: string;
  price: {
    vip: number;
    normal: number;
  };
  boardingPoints: string[];
  droppingPoints: string[];
}

export interface Seat {
  id: string;
  number: number;
  isAvailable: boolean;
}

export interface PassengerInfo {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  idPassport: string;
  email: string;
  nationality: string;
  phone: string;
  countryCode: string;
}
