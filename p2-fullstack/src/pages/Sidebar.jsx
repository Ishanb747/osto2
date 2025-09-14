// src/Sidebar.js
import React from 'react';
import { Menu, ChevronLeft } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, sidebarItems }) => {
  return (
    <>
      <div className={`fixed inset-y-0 left-0 bg-white shadow-sm border-r z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:w-20'}`}>
        <div className={`flex items-center justify-between p-4 border-b h-16 ${isSidebarOpen ? 'px-6' : 'px-4'}`}>
          {isSidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-blue-700">Osto.one</h1>
              <p className="text-xs text-gray-500">Billing Dashboard</p>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className={`transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                } ${!isSidebarOpen && 'justify-center'}`}
                title={item.label}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        <div className={`p-4 border-t absolute bottom-0 w-full ${!isSidebarOpen && 'hidden'}`}>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-800">Need Help?</p>
            <p className="text-xs text-blue-600 mt-1">Contact our support team</p>
            <button className="text-xs text-blue-700 underline mt-2">Get Support</button>
          </div>
        </div>
      </div>

      <header className="md:hidden sticky top-0 bg-white shadow-sm border-b p-4 flex justify-between items-center z-10 h-16">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu />
        </button>
        <h1 className="text-lg font-bold text-blue-700">Osto.one</h1>
        <div className="w-6"></div>
      </header>
    </>
  );
};

export default Sidebar;