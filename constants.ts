
import { Trip, Seat } from './types';

export const CITIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Kampala', 'Dar es Salaam', 'Arusha', 'Kigali'
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'TRIP001',
    from: 'Nairobi',
    to: 'Mombasa',
    departureTime: '08:00 AM',
    arrivalTime: '04:00 PM',
    duration: '8h',
    availableSeats: 25,
    tripCode: 'NBO-MSA',
    price: { vip: 3000, normal: 2000 },
    boardingPoints: ['Nairobi Downtown', 'Westlands', 'Mlolongo'],
    droppingPoints: ['Mombasa CBD', 'Nyali', 'Bamburi'],
  },
  {
    id: 'TRIP002',
    from: 'Nairobi',
    to: 'Mombasa',
    departureTime: '10:00 PM',
    arrivalTime: '06:00 AM',
    duration: '8h',
    availableSeats: 15,
    tripCode: 'NBO-MSA',
    price: { vip: 3500, normal: 2500 },
    boardingPoints: ['Nairobi Downtown', 'Westlands', 'Mlolongo'],
    droppingPoints: ['Mombasa CBD', 'Nyali', 'Bamburi'],
  },
  {
    id: 'TRIP003',
    from: 'Mombasa',
    to: 'Nairobi',
    departureTime: '09:00 AM',
    arrivalTime: '05:00 PM',
    duration: '8h',
    availableSeats: 30,
    tripCode: 'MSA-NBO',
    price: { vip: 3000, normal: 2000 },
    boardingPoints: ['Mombasa CBD', 'Nyali', 'Bamburi'],
    droppingPoints: ['Nairobi Downtown', 'Westlands', 'Mlolongo'],
  },
  {
    id: 'TRIP004',
    from: 'Nairobi',
    to: 'Kampala',
    departureTime: '07:00 PM',
    arrivalTime: '07:00 AM',
    duration: '12h',
    availableSeats: 10,
    tripCode: 'NBO-KLA',
    price: { vip: 5000, normal: 4000 },
    boardingPoints: ['Nairobi Downtown', 'Westlands'],
    droppingPoints: ['Kampala Bus Terminal', 'Central Kampala'],
  },
];

export const generateBusLayout = (): Seat[] => {
  const seats: Seat[] = [];
  const totalSeats = 44;
  const unavailableCount = Math.floor(Math.random() * 10) + 5; // 5 to 14 unavailable seats
  const unavailableIndices = new Set<number>();

  while (unavailableIndices.size < unavailableCount) {
    unavailableIndices.add(Math.floor(Math.random() * totalSeats) + 1);
  }

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      id: `seat-${i}`,
      number: i,
      isAvailable: !unavailableIndices.has(i),
    });
  }
  return seats;
};

export const COUNTRIES = [
    { code: "+254", name: "Kenya" },
    { code: "+255", name: "Tanzania" },
    { code: "+256", name: "Uganda" },
    { code: "+250", name: "Rwanda" },
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
];
