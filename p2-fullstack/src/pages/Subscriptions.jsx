// src/Subscriptions.js
import React from 'react';
import { Plus, Pause, Settings } from 'lucide-react';

const Subscriptions = ({ mockData }) => {
  const { subscriptions, getStatusIcon, getStatusColor } = mockData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Active Subscriptions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          <span>Add Module</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => {
          const StatusIcon = getStatusIcon(subscription.status);
          const usagePercent = (subscription.usage.current / subscription.usage.limit) * 100;
          
          return (
            <div key={subscription.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <subscription.icon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{subscription.name}</h3>
                      <p className="text-sm text-gray-500">{subscription.plan} Plan</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(subscription.status)}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{subscription.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Usage</span>
                      <span>{subscription.usage.current}/{subscription.usage.limit} {subscription.usage.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${subscription.price}/mo</span>
                    <span className="text-sm text-gray-500">Next: {subscription.nextBilling}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {subscription.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded">{feature}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                      Manage
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      <Settings className="h-4 w-4" />
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