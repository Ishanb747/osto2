// src/MainContent.js
import React from 'react';
import Overview from './Overview';
import Subscriptions from './Subscriptions';
import Invoices from './Invoices';
import PaymentMethods from './PaymentMethods';
import BillingAdmin from './BillingAdmin';

const MainContent = ({ activeTab, setIsSidebarOpen, mockData }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview mockData={mockData} />;
      case 'subscriptions': return <Subscriptions mockData={mockData} />;
      case 'invoices': return <Invoices mockData={mockData} />;
      case 'payment-methods': return <PaymentMethods mockData={mockData} />;
      case 'billing-admin': return <BillingAdmin />;
      case 'payment-history': return <div className="p-8 text-center text-gray-500">Payment History - Coming Soon</div>;
      case 'notifications': return <div className="p-8 text-center text-gray-500">Notifications - Coming Soon</div>;
      default: return <Overview mockData={mockData} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <main className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainContent;