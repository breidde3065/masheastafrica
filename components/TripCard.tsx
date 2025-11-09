
import React from 'react';
import { Trip } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onSelectTrip }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
        <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-gray-800">{trip.departureTime}</span>
                        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-lg font-bold text-gray-800">{trip.arrivalTime}</span>
                        <span className="text-sm text-gray-500 ml-2">({trip.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <span>{trip.from}</span>
                        <span>-</span>
                        <span>{trip.to}</span>
                    </div>
                     <div className="mt-2 text-sm text-gray-500">
                        Trip Code: <span className="font-semibold text-gray-700">{trip.tripCode}</span> | Seats Left: <span className="font-semibold text-red-600">{trip.availableSeats}</span>
                    </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6 md:text-right space-y-2">
                    <div className="flex justify-between md:justify-end items-center md:space-x-4">
                        <span className="font-semibold text-gray-700">Normal:</span>
                        <span className="text-lg font-bold text-orange-600">KES {trip.price.normal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between md:justify-end items-center md:space-x-4">
                         <span className="font-semibold text-gray-700">VIP:</span>
                         <span className="text-lg font-bold text-red-700">KES {trip.price.vip.toLocaleString()}</span>
                    </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
                     <button 
                        onClick={() => onSelectTrip(trip)}
                        className="w-full bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md">
                        View Seats
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TripCard;
