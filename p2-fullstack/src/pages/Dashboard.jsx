// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { 
  CreditCard, Shield, Network, Cloud, FileCheck, Search, Bell, Settings, Download,
  Play, Pause, AlertTriangle, CheckCircle, XCircle, Clock, DollarSign, TrendingUp,
  Calendar, Mail, Building, User, Home, Receipt, History, AlertCircle, ChevronLeft,
  ChevronRight, Plus, Edit3, Trash2, Menu
} from "lucide-react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

// Mock data - consider moving this to a separate file like 'data/mockData.js'
const mockData = {
  subscriptions: [
    {
      id: 1, name: "Cloud Security", icon: Cloud, status: "active", plan: "Enterprise", price: 299, 
      usage: { current: 85, limit: 100, unit: "GB" }, nextBilling: "2024-10-15", 
      features: ["DDoS Protection", "WAF", "SSL Monitoring"]
    },
    {
      id: 2, name: "Endpoint Security", icon: Shield, status: "payment_failed", plan: "Professional", 
      price: 199, usage: { current: 45, limit: 50, unit: "devices" }, nextBilling: "2024-09-20", 
      features: ["Antivirus", "EDR", "Device Control"]
    },
    {
      id: 3, name: "Network Security", icon: Network, status: "active", plan: "Standard", 
      price: 149, usage: { current: 12, limit: 25, unit: "nodes" }, nextBilling: "2024-10-22", 
      features: ["Firewall", "IDS/IPS", "VPN"]
    },
    {
      id: 4, name: "Compliance", icon: FileCheck, status: "grace_period", plan: "Premium", 
      price: 399, usage: { current: 8, limit: 10, unit: "audits" }, nextBilling: "2024-09-18", 
      features: ["SOC 2", "ISO 27001", "GDPR"]
    },
    {
      id: 5, name: "VAPT Services", icon: Search, status: "expired", plan: "Professional", 
      price: 599, usage: { current: 2, limit: 5, unit: "scans" }, nextBilling: "2024-09-10", 
      features: ["Penetration Testing", "Vulnerability Assessment"]
    }
  ],
  invoices: [
    { id: "INV-2024-001", amount: 1245, status: "paid", date: "2024-08-15", modules: ["Cloud Security", "Network Security"] },
    { id: "INV-2024-002", amount: 599, status: "overdue", date: "2024-09-01", modules: ["VAPT Services"] },
    { id: "INV-2024-003", amount: 199, status: "failed", date: "2024-09-15", modules: ["Endpoint Security"] },
    { id: "INV-2024-004", amount: 399, status: "pending", date: "2024-09-18", modules: ["Compliance"] }
  ],
  paymentMethods: [
    { id: 1, type: "card", last4: "4242", brand: "Visa", expiry: "12/25", primary: true },
    { id: 2, type: "card", last4: "8888", brand: "Mastercard", expiry: "08/26", primary: false },
    { id: 3, type: "ach", last4: "3210", bank: "Wells Fargo", primary: false }
  ],
  sidebarItems: [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'subscriptions', label: 'Active Subscriptions', icon: Shield },
    { id: 'invoices', label: 'Invoices & Payments', icon: Receipt },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'billing-admin', label: 'Billing Administration', icon: Settings },
    { id: 'payment-history', label: 'Payment History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ],
  getStatusColor: (status) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "payment_failed": return "text-red-600 bg-red-100";
      case "expired": return "text-gray-600 bg-gray-100";
      case "grace_period": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  },
  getStatusIcon: (status) => {
    switch (status) {
      case "active": return CheckCircle;
      case "payment_failed": return XCircle;
      case "expired": return AlertTriangle;
      case "grace_period": return Clock;
      default: return AlertCircle;
    }
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarItems={mockData.sidebarItems}
      />
      <MainContent 
        activeTab={activeTab} 
        setIsSidebarOpen={setIsSidebarOpen}
        mockData={mockData}
      />
    </div>
  );
};

export default Dashboard;