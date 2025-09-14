// src/PaymentMethods.js
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreditCard, Plus, Edit3, Trash2 } from 'lucide-react';

const COMPANY_ID = 1;

const fetchPaymentMethods = async () => {
  const res = await fetch(`http://localhost:8080/companies/${COMPANY_ID}/payment_methods`);
  if (!res.ok) throw new Error('Failed to fetch payment methods');
  return res.json();
};

const addPaymentMethod = async (payload) => {
  const res = await fetch(`http://localhost:8080/companies/${COMPANY_ID}/payment_methods`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to add payment method');
  return res.json();
};

const deletePaymentMethod = async (id) => {
  const res = await fetch(`http://localhost:8080/payment_methods/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete payment method');
  return res.json();
};

const makePrimary = async (id) => {
  const res = await fetch(`http://localhost:8080/payment_methods/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ primary: true }),
  });
  if (!res.ok) throw new Error('Failed to make primary');
  return res.json();
};

const AddPaymentModal = ({ open, onClose, onSubmit, isLoading, error }) => {
  const [form, setForm] = useState({
    type: 'card',
    brand: '',
    last4: '',
    expiry: '',
    bank: '',
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Add Payment Method</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="flex flex-col gap-3"
        >
          <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2">
            <option value="card">Card</option>
            <option value="bank">Bank</option>
          </select>
          {form.type === 'card' ? (
            <>
              <input type="text" name="brand" placeholder="Card Brand" value={form.brand} onChange={handleChange} className="border rounded px-3 py-2" required />
              <input type="text" name="last4" placeholder="Last 4 Digits" value={form.last4} onChange={handleChange} className="border rounded px-3 py-2" required />
              <input type="text" name="expiry" placeholder="Expiry MM/YY" value={form.expiry} onChange={handleChange} className="border rounded px-3 py-2" required />
            </>
          ) : (
            <input type="text" name="bank" placeholder="Bank Name" value={form.bank} onChange={handleChange} className="border rounded px-3 py-2" required />
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Payment Method'}
          </button>
          {error && <div className="text-red-600 mt-2">{error.message}</div>}
        </form>
      </div>
    </div>
  );
};

const PaymentMethods = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: fetchPaymentMethods,
    refetchInterval: 60000,
  });
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const addMutation = useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      setModalOpen(false);
      refetch();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: refetch,
  });
  const primaryMutation = useMutation({
    mutationFn: makePrimary,
    onSuccess: refetch,
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading payment methods.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 w-full sm:w-auto justify-center" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          <span>Add Payment Method</span>
        </button>
      </div>
      <AddPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addMutation.mutate} isLoading={addMutation.isLoading} error={addMutation.isError ? addMutation.error : null} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((method) => (
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
              <button
                key={`primary-${method.id}`}
                className={`flex-1 py-2 rounded text-sm ${method.primary ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
                onClick={() => !method.primary && primaryMutation.mutate(method.id)}
                disabled={method.primary || primaryMutation.isLoading}
              >{method.primary ? 'Primary' : 'Make Primary'}</button>
              <button key={`edit-${method.id}`} className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                key={`delete-${method.id}`}
                className="px-3 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
                onClick={() => deleteMutation.mutate(method.id)}
                disabled={deleteMutation.isLoading}
              >
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