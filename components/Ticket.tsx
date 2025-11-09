
import React from 'react';
import { Trip, Seat, PassengerInfo } from '../types';
import ElephantIcon from './icons/ElephantIcon';

interface TicketProps {
  bookingDetails: {
    trip: Trip;
    seats: Seat[];
    passenger: PassengerInfo;
    ticketType: 'VIP' | 'Normal';
    totalFare: number;
    boarding: string;
    dropping: string;
  };
  onNewBooking: () => void;
}

const Barcode: React.FC = () => (
    <svg viewBox="0 0 120 40" className="w-full h-16 object-contain">
        <rect x="0" y="0" width="2" height="40" fill="#000"/>
        <rect x="4" y="0" width="1" height="40" fill="#000"/>
        <rect x="7" y="0" width="3" height="40" fill="#000"/>
        <rect x="12" y="0" width="1" height="40" fill="#000"/>
        <rect x="15" y="0" width="2" height="40" fill="#000"/>
        <rect x="19" y="0" width="1" height="40" fill="#000"/>
        <rect x="22" y="0" width="1" height="40" fill="#000"/>
        <rect x="25" y="0" width="3" height="40" fill="#000"/>
        <rect x="30" y="0" width="2" height="40" fill="#000"/>
        <rect x="34" y="0" width="1" height="40" fill="#000"/>
        <rect x="37" y="0" width="2" height="40" fill="#000"/>
        <rect x="41" y="0" width="1" height="40" fill="#000"/>
        <rect x="44" y="0" width="3" height="40" fill="#000"/>
        <rect x="49" y="0" width="1" height="40" fill="#000"/>
        <rect x="52" y="0" width="2" height="40" fill="#000"/>
        <rect x="56" y="0" width="1" height="40" fill="#000"/>
        <rect x="59" y="0" width="3" height="40" fill="#000"/>
        <rect x="64" y="0" width="2" height="40" fill="#000"/>
        <rect x="68" y="0" width="1" height="40" fill="#000"/>
        <rect x="71" y="0" width="2" height="40" fill="#000"/>
        <rect x="75" y="0" width="1" height="40" fill="#000"/>
        <rect x="78" y="0" width="3" height="40" fill="#000"/>
        <rect x="83" y="0" width="1" height="40" fill="#000"/>
        <rect x="86" y="0" width="2" height="40" fill="#000"/>
        <rect x="90" y="0" width="1" height="40" fill="#000"/>
        <rect x="93" y="0" width="2" height="40" fill="#000"/>
        <rect x="97" y="0" width="3" height="40" fill="#000"/>
        <rect x="102" y="0" width="1" height="40" fill="#000"/>
        <rect x="105" y="0" width="2" height="40" fill="#000"/>
        <rect x="109" y="0" width="1" height="40" fill="#000"/>
        <rect x="112" y="0" width="3" height="40" fill="#000"/>
        <rect x="117" y="0" width="2" height="40" fill="#000"/>
    </svg>
);


const Ticket: React.FC<TicketProps> = ({ bookingDetails, onNewBooking }) => {
  const { trip, seats, passenger, ticketType, totalFare, boarding, dropping } = bookingDetails;
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6" role="alert">
          <p className="font-bold">Booking Confirmed!</p>
          <p>Your ticket has been generated. Please save it for your trip.</p>
      </div>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-red-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ElephantIcon className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">Mash East Africa</span>
            </div>
            <span className="text-white font-semibold">{ticketType} Class</span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <p className="text-sm text-gray-500">Passenger</p>
                    <p className="font-bold text-gray-800">{passenger.name}</p>
                </div>
                <div className="md:col-span-1">
                    <p className="text-sm text-gray-500">Seat(s)</p>
                    <p className="font-bold text-gray-800">{seats.map(s => s.number).join(', ')}</p>
                </div>
                 <div className="md:col-span-1">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-bold text-gray-800">{new Date().toDateString()}</p>
                </div>
                <div className="col-span-2 md:col-span-3 border-t my-2"></div>
                <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-bold text-lg text-gray-800">{trip.from}</p>
                </div>
                 <div className="text-center">
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-bold text-lg text-red-600">{trip.departureTime}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-bold text-lg text-gray-800">{trip.to}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Boarding</p>
                    <p className="font-bold text-gray-800">{boarding}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Dropping</p>
                    <p className="font-bold text-gray-800">{dropping}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Fare</p>
                    <p className="font-bold text-lg text-orange-600">KES {totalFare.toLocaleString()}</p>
                </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t border-dashed">
             <Barcode />
             <p className="text-center text-xs text-gray-500 mt-2">PNR: {trip.tripCode}-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button onClick={onNewBooking} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
            Book Another Ticket
          </button>
        </div>
    </div>
  );
};

export default Ticket;
