
import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TripResults from './components/TripResults';
import SeatSelectionModal from './components/SeatSelectionModal';
import Ticket from './components/Ticket';
import { Trip, SearchCriteria, Seat, PassengerInfo } from './types';
import { MOCK_TRIPS } from './constants';

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    trip: Trip;
    seats: Seat[];
    passenger: PassengerInfo;
    ticketType: 'VIP' | 'Normal';
    totalFare: number;
    boarding: string;
    dropping: string;
  } | null>(null);


  const handleSearch = (criteria: SearchCriteria) => {
    // In a real app, this would be an API call
    const results = MOCK_TRIPS.filter(trip => 
      trip.from.toLowerCase() === criteria.from.toLowerCase() &&
      trip.to.toLowerCase() === criteria.to.toLowerCase()
    );
    setSearchResults(results);
    setBookingDetails(null); // Clear previous booking
  };

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowSeatModal(true);
  };

  const handleBookingComplete = (details: {
    trip: Trip;
    seats: Seat[];
    passenger: PassengerInfo;
    ticketType: 'VIP' | 'Normal';
    totalFare: number;
    boarding: string;
    dropping: string;
  }) => {
    setBookingDetails(details);
    setShowSeatModal(false);
    setSelectedTrip(null);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!bookingDetails ? (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Book Your Bus Ticket</h1>
                <p className="text-gray-600 mb-6">Travel across East Africa with comfort and style.</p>
                <SearchForm onSearch={handleSearch} />
            </div>
            {searchResults.length > 0 && <TripResults trips={searchResults} onSelectTrip={handleSelectTrip} />}
          </>
        ) : (
          <Ticket bookingDetails={bookingDetails} onNewBooking={() => setBookingDetails(null)} />
        )}
      </main>

      {showSeatModal && selectedTrip && (
        <SeatSelectionModal
          trip={selectedTrip}
          onClose={() => setShowSeatModal(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}
       <footer className="text-center p-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mash East Africa. All rights reserved.
        </footer>
    </div>
  );
};

export default App;
