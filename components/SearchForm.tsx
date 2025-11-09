
import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { CITIES } from '../constants';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import CalendarIcon from './icons/CalendarIcon';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [from, setFrom] = useState('Nairobi');
  const [to, setTo] = useState('Mombasa');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ tripType, from, to, departureDate });
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4 mb-6">
        <label className="flex items-center">
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
            className="form-radio h-5 w-5 text-red-600"
          />
          <span className="ml-2 text-gray-700">One Way</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={() => setTripType('round-trip')}
            className="form-radio h-5 w-5 text-red-600"
            disabled // Round trip is disabled for this demo
          />
          <span className="ml-2 text-gray-500">Round Trip (soon)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
          <LocationMarkerIcon className="absolute top-8 left-3 h-5 w-5 text-gray-400" />
          <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md shadow-sm">
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <button type="button" onClick={swapLocations} className="hidden lg:block mt-6 p-2 bg-gray-200 rounded-full hover:bg-orange-500 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>

        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
           <LocationMarkerIcon className="absolute top-8 left-3 h-5 w-5 text-gray-400" />
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className="mt-1 block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md shadow-sm">
            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <div className="relative md:col-span-2 lg:col-span-1">
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Departure Date</label>
          <CalendarIcon className="absolute top-8 left-3 h-5 w-5 text-gray-400" />
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md shadow-sm"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="text-center pt-4">
        <button type="submit" className="w-full md:w-auto bg-orange-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg">
          Search Buses
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
