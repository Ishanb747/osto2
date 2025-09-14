
import React, { useEffect, useState } from 'react';
import { Plus, Pause, Settings } from 'lucide-react';

const COMPANY_ID = 1;
const statusColors = {
  Active: 'bg-green-500',
  Grace: 'bg-yellow-400',
  Expired: 'bg-red-500',
  Failed: 'bg-red-500',
  Suspended: 'bg-gray-400',
};

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    module_id: '',
    plan_id: '',
    status: 'Active',
    next_billing_date: new Date().toISOString().slice(0, 10)
  });

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://osto22.onrender.com/companies/${COMPANY_ID}/subscriptions`);
      const data = await res.json();
      setSubscriptions(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch subscriptions');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
    const interval = setInterval(fetchSubscriptions, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (id, action) => {
    await fetch(`https://osto22.onrender.com/subscriptions/${id}/${action}`, { method: 'POST' });
    fetchSubscriptions();
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Active Subscriptions</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 w-full sm:w-auto justify-center"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Module</span>
        </button>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setModalOpen(false)}>×</button>
            <h2 className="text-xl font-bold mb-4">Add Module Subscription</h2>
            <form
              onSubmit={async e => {
                e.preventDefault();
                await fetch(`https://osto22.onrender.com/subscriptions`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    company_id: COMPANY_ID,
                    plan_id: form.plan_id,
                    module_id: form.module_id,
                    status: form.status,
                    next_billing_date: form.next_billing_date
                  })
                });
                setModalOpen(false);
                setForm({ module_id: '', plan_id: '', status: 'Active', next_billing_date: new Date().toISOString().slice(0, 10) });
                fetchSubscriptions();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                name="module_id"
                placeholder="Module ID"
                value={form.module_id}
                onChange={e => setForm({ ...form, module_id: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="plan_id"
                placeholder="Plan ID"
                value={form.plan_id}
                onChange={e => setForm({ ...form, plan_id: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <select
                name="status"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="border rounded px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Grace">Grace</option>
                <option value="Suspended">Suspended</option>
                <option value="Expired">Expired</option>
              </select>
              <input
                type="date"
                name="next_billing_date"
                value={form.next_billing_date}
                onChange={e => setForm({ ...form, next_billing_date: e.target.value })}
                className="border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >Add Subscription</button>
            </form>
          </div>
        </div>
      )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {subscriptions.map((sub) => {
          const usagePercent = (sub.usage / sub.limit) * 100;
          return (
            <div key={sub.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Replace with actual module icon if available */}
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">{sub.module[0]}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{sub.module}</h3>
                      <p className="text-sm text-gray-500">{sub.plan} Plan</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[sub.status]}`}>
                    <span className="capitalize">{sub.status}</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Usage</span>
                      <span>{sub.usage}/{sub.limit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{sub.price_currency === 'USD' ? `$` : ''}{sub.limit}/mo</span>
                    <span className="text-sm text-gray-500">Next: {sub.next_billing_date}</span>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t">
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                      onClick={async () => {
                        const res = await fetch(`https://osto22.onrender.com/subscriptions/${sub.id}`);
                        const details = await res.json();
                        alert(JSON.stringify(details, null, 2));
                      }}
                    >
                      Manage
                    </button>
                    <button className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 text-sm" onClick={() => handleAction(sub.id, 'downgrade')}>
                      Downgrade
                    </button>
                    <button className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 text-sm" onClick={() => handleAction(sub.id, 'pause')}>
                      Pause
                    </button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm" onClick={() => handleAction(sub.id, 'cancel')}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscriptions;