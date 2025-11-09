
import React, { useState, useMemo } from 'react';
import { Trip, Seat, PassengerInfo } from '../types';
import { generateBusLayout } from '../constants';
import BusLayout from './BusLayout';
import CheckoutForm from './CheckoutForm';

interface SeatSelectionModalProps {
  trip: Trip;
  onClose: () => void;
  onBookingComplete: (details: {
    trip: Trip;
    seats: Seat[];
    passenger: PassengerInfo;
    ticketType: 'VIP' | 'Normal';
    totalFare: number;
    boarding: string;
    dropping: string;
  }) => void;
}

const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({ trip, onClose, onBookingComplete }) => {
  const [step, setStep] = useState(1); // 1: Seat Selection, 2: Checkout
  const [ticketType, setTicketType] = useState<'VIP' | 'Normal'>('Normal');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [boarding, setBoarding] = useState(trip.boardingPoints[0]);
  const [dropping, setDropping] = useState(trip.droppingPoints[0]);
  
  const busLayout = useMemo(() => generateBusLayout(), [trip.id]);

  const pricePerSeat = ticketType === 'VIP' ? trip.price.vip : trip.price.normal;
  const totalFare = selectedSeats.length * pricePerSeat;

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats(prev =>
      prev.find(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    );
  };
  
  const handleProceedToCheckout = () => {
    if (selectedSeats.length > 0) {
      setStep(2);
    } else {
      alert("Please select at least one seat.");
    }
  };

  const handleCheckout = (passenger: PassengerInfo) => {
    onBookingComplete({ trip, seats: selectedSeats, passenger, ticketType, totalFare, boarding, dropping });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {step === 1 ? `Select Seats for ${trip.from} to ${trip.to}` : 'Checkout'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600">&times;</button>
        </div>

        <div className="overflow-y-auto p-6 flex-grow">
          {step === 1 && (
             <>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <p className="font-semibold mb-2">Choose your class:</p>
                     <div className="flex space-x-4 mb-4">
                        <button onClick={() => setTicketType('Normal')} className={`px-4 py-2 rounded-lg border-2 ${ticketType === 'Normal' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300'}`}>
                            Normal - KES {trip.price.normal}
                        </button>
                        <button onClick={() => setTicketType('VIP')} className={`px-4 py-2 rounded-lg border-2 ${ticketType === 'VIP' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                            VIP - KES {trip.price.vip}
                        </button>
                    </div>
                  <BusLayout layout={busLayout} selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
                </div>

                <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 border-b pb-2">Booking Summary</h3>
                    <div className="space-y-3">
                        <div>
                          <label htmlFor="boarding" className="block text-sm font-medium text-gray-700">Boarding Point</label>
                          <select id="boarding" value={boarding} onChange={e => setBoarding(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                            {trip.boardingPoints.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                         <div>
                          <label htmlFor="dropping" className="block text-sm font-medium text-gray-700">Dropping Point</label>
                          <select id="dropping" value={dropping} onChange={e => setDropping(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                            {trip.droppingPoints.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div>
                            <p>Selected Seats: <span className="font-bold text-red-600">{selectedSeats.map(s => s.number).join(', ') || 'None'}</span></p>
                            <p>Number of Seats: <span className="font-bold text-red-600">{selectedSeats.length}</span></p>
                        </div>
                        <div className="text-xl font-bold pt-2 border-t">
                            Total: <span className="text-orange-600">KES {totalFare.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
              </div>
             </>
          )}

          {step === 2 && (
            <CheckoutForm onSubmit={handleCheckout} onBack={() => setStep(1)} />
          )}
        </div>

        {step === 1 && (
        <div className="p-4 bg-gray-50 border-t flex justify-end">
            <button 
              onClick={handleProceedToCheckout}
              disabled={selectedSeats.length === 0}
              className="bg-orange-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionModal;
