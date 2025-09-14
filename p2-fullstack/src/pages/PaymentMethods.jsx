// src/PaymentMethods.js
import React from 'react';
import { CreditCard, Plus, Edit3, Trash2 } from 'lucide-react';

const PaymentMethods = ({ mockData }) => {
  const { paymentMethods } = mockData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className={`bg-white rounded-lg shadow-sm border p-6 ${method.primary ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-8 w-8 text-gray-600" />
                <div>
                  <p className="font-medium">
                    {method.type === 'card' ? method.brand : method.bank}
                  </p>
                  <p className="text-sm text-gray-500">•••• {method.last4}</p>
                </div>
              </div>
              {method.primary && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Primary</span>
              )}
            </div>
            
            {method.type === 'card' && (
              <p className="text-sm text-gray-500 mb-4">Expires {method.expiry}</p>
            )}
            
            <div className="flex space-x-2">
              <button className={`flex-1 py-2 rounded text-sm ${method.primary ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'text-blue-600 border border-blue-600 hover:bg-blue-50'}`}>
                {method.primary ? 'Primary' : 'Make Primary'}
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Edit3 className="h-4 w-4" />
              </button>
              <button className="px-3 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;