// src/Overview.js
import React from 'react';
import { DollarSign, Shield, AlertTriangle, Calendar } from 'lucide-react';

const Overview = ({ mockData }) => {
  const { subscriptions, invoices, getStatusIcon, getStatusColor } = mockData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Monthly</p>
              <p className="text-2xl font-bold text-gray-900">$1,545</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Modules</p>
              <p className="text-2xl font-bold text-gray-900">3/5</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-red-600">$998</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Billing</p>
              <p className="text-2xl font-bold text-gray-900">Oct 15</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Invoices</h3>
          </div>
          <div className="p-6 space-y-4">
            {invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${invoice.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Service Status</h3>
          </div>
          <div className="p-6 space-y-4">
            {subscriptions.slice(0, 3).map((sub) => {
              const StatusIcon = getStatusIcon(sub.status);
              return (
                <div key={sub.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <sub.icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{sub.name}</span>
                  </div>
                  <StatusIcon className={`h-5 w-5 ${getStatusColor(sub.status).split(' ')[0]}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;