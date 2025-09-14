// src/BillingAdmin.js
import React from 'react';
import { Mail, Building, Bell } from 'lucide-react';

const BillingAdmin = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Billing Administration</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Management</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Billing Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="billing@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="finance@company.com" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Update Emails
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Billing Address</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="Acme Corporation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="123 Business St" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="10001" />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Update Address
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notification Preferences</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">Email Notifications</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm">Invoice reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm">Payment confirmations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm">Usage alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="text-sm">Service updates</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Alert Thresholds</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-700">Usage warning at</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1">
                  <option>80%</option>
                  <option>85%</option>
                  <option>90%</option>
                  <option>95%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Payment retry days</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1">
                  <option>3 days</option>
                  <option>5 days</option>
                  <option>7 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAdmin;