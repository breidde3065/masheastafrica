
import React from 'react';
import { Seat } from '../types';
import SeatIcon from './icons/SeatIcon';

interface BusLayoutProps {
  layout: Seat[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

const BusLayout: React.FC<BusLayoutProps> = ({ layout, selectedSeats, onSeatSelect }) => {
  const isSelected = (seat: Seat) => selectedSeats.some(s => s.id === seat.id);

  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'text-gray-400 cursor-not-allowed';
    if (isSelected(seat)) return 'text-red-600';
    return 'text-gray-300 hover:text-orange-500';
  };
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-end mb-2">
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded flex items-center justify-center font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.789-2.75 9.566l-2.749-4.124A12.015 12.015 0 0112 11zm0 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-3.132 0-5.94-1.432-7.818-3.642" />
                </svg>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
            {layout.map((seat, index) => (
                <React.Fragment key={seat.id}>
                    { (index > 0 && index % 2 === 0 && index % 4 !== 0) && <div className="col-span-1"></div> }
                    <button
                        onClick={() => seat.isAvailable && onSeatSelect(seat)}
                        disabled={!seat.isAvailable}
                        className={`transition-colors duration-200 relative ${getSeatColor(seat)}`}
                        aria-label={`Seat ${seat.number}`}
                    >
                        <SeatIcon className="w-full h-auto" />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                            {seat.number}
                        </span>
                    </button>
                </React.Fragment>
            ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center"><SeatIcon className="w-4 h-4 text-gray-300 mr-1"/> Available</div>
            <div className="flex items-center"><SeatIcon className="w-4 h-4 text-red-600 mr-1"/> Selected</div>
            <div className="flex items-center"><SeatIcon className="w-4 h-4 text-gray-400 mr-1"/> Booked</div>
        </div>
    </div>
  );
};

export default BusLayout;
