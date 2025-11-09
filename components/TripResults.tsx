
import React from 'react';
import { Trip } from '../types';
import TripCard from './TripCard';

interface TripResultsProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
}

const TripResults: React.FC<TripResultsProps> = ({ trips, onSelectTrip }) => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Available Trips ({trips.length})</h2>
      {trips.length > 0 ? (
        trips.map(trip => (
          <TripCard key={trip.id} trip={trip} onSelectTrip={onSelectTrip} />
        ))
      ) : (
        <p className="text-center text-gray-500 py-8">No trips found for the selected route.</p>
      )}
    </div>
  );
};

export default TripResults;
