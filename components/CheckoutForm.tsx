
import React, { useState } from 'react';
import { PassengerInfo } from '../types';
import { COUNTRIES } from '../constants';
import UserIcon from './icons/UserIcon';

interface CheckoutFormProps {
  onSubmit: (passenger: PassengerInfo) => void;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const [passenger, setPassenger] = useState<PassengerInfo>({
    name: '', age: '', gender: 'Male', idPassport: '', email: '', nationality: 'Kenyan', phone: '', countryCode: '+254',
  });
  const [isPaid, setIsPaid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };
  
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (Object.values(passenger).some(val => val === '')) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit(passenger);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <form onSubmit={handleConfirm} className="w-full md:w-2/3 space-y-4">
        <h3 className="text-lg font-bold">Passenger Information</h3>
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={passenger.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input type="number" name="age" value={passenger.age} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={passenger.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">ID / Passport No.</label>
              <input type="text" name="idPassport" value={passenger.idPassport} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={passenger.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input type="text" name="nationality" value={passenger.nationality} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex mt-1">
                <select name="countryCode" value={passenger.countryCode} onChange={handleChange} className="rounded-l-md border-gray-300 shadow-sm">
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
                </select>
                <input type="tel" name="phone" value={passenger.phone} onChange={handleChange} className="block w-full rounded-r-md border-gray-300 shadow-sm" required />
            </div>
          </div>
        </div>
         <div className="flex justify-between pt-4">
            <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
            <button type="submit" disabled={!isPaid} className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Confirm Trip</button>
        </div>
      </form>
      <div className="w-full md:w-1/3 bg-orange-50 p-4 rounded-lg border border-orange-200">
        <h3 className="text-lg font-bold mb-2">Payment Instructions</h3>
        <p className="text-sm text-gray-700 mb-4">Please make your payment to the details below to confirm your trip.</p>
        <div className="bg-white p-3 rounded-md shadow-sm">
          <p className="font-semibold">Paybill Number:</p>
          <p className="text-2xl font-bold text-red-600">123456</p>
          <p className="font-semibold mt-2">Account Number:</p>
          <p className="text-lg font-bold text-gray-800">Your Phone No.</p>
        </div>
        <div className="mt-4 text-center">
            {isPaid ? (
                <p className="text-green-600 font-semibold">Payment Received! Please confirm your trip.</p>
            ): (
                <>
                <p className="text-sm text-yellow-700 mb-2">Waiting for payment confirmation...</p>
                <button onClick={() => setIsPaid(true)} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                    I Have Paid
                </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
