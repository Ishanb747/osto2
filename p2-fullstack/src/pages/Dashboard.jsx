import React, { useState, useEffect } from "react";
import { 
  CreditCard, 
  Shield, 
  Network, 
  Cloud, 
  FileCheck, 
  Search,
  Bell,
  Settings,
  Download,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Building,
  User,
  Home,
  Receipt,
  History,
  AlertCircle,
  ChevronRight,
  Plus,
  Edit3,
  Trash2
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      console.log('No auth token found');
    }
  }, []);

  // Mock data - replace with real API calls
  const subscriptions = [
    {
      id: 1,
      name: "Cloud Security",
      icon: Cloud,
      status: "active",
      plan: "Enterprise",
      price: 299,
      usage: { current: 85, limit: 100, unit: "GB" },
      nextBilling: "2024-10-15",
      features: ["DDoS Protection", "WAF", "SSL Monitoring"]
    },
    {
      id: 2,
      name: "Endpoint Security",
      icon: Shield,
      status: "payment_failed",
      plan: "Professional",
      price: 199,
      usage: { current: 45, limit: 50, unit: "devices" },
      nextBilling: "2024-09-20",
      features: ["Antivirus", "EDR", "Device Control"]
    },
    {
      id: 3,
      name: "Network Security",
      icon: Network,
      status: "active",
      plan: "Standard",
      price: 149,
      usage: { current: 12, limit: 25, unit: "nodes" },
      nextBilling: "2024-10-22",
      features: ["Firewall", "IDS/IPS", "VPN"]
    },
    {
      id: 4,
      name: "Compliance",
      icon: FileCheck,
      status: "grace_period",
      plan: "Premium",
      price: 399,
      usage: { current: 8, limit: 10, unit: "audits" },
      nextBilling: "2024-09-18",
      features: ["SOC 2", "ISO 27001", "GDPR"]
    },
    {
      id: 5,
      name: "VAPT Services",
      icon: Search,
      status: "expired",
      plan: "Professional",
      price: 599,
      usage: { current: 2, limit: 5, unit: "scans" },
      nextBilling: "2024-09-10",
      features: ["Penetration Testing", "Vulnerability Assessment"]
    }
  ];

  const invoices = [
    { id: "INV-2024-001", amount: 1245, status: "paid", date: "2024-08-15", modules: ["Cloud Security", "Network Security"] },
    { id: "INV-2024-002", amount: 599, status: "overdue", date: "2024-09-01", modules: ["VAPT Services"] },
    { id: "INV-2024-003", amount: 199, status: "failed", date: "2024-09-15", modules: ["Endpoint Security"] },
    { id: "INV-2024-004", amount: 399, status: "pending", date: "2024-09-18", modules: ["Compliance"] }
  ];

  const paymentMethods = [
    { id: 1, type: "card", last4: "4242", brand: "Visa", expiry: "12/25", primary: true },
    { id: 2, type: "card", last4: "8888", brand: "Mastercard", expiry: "08/26", primary: false },
    { id: 3, type: "ach", last4: "3210", bank: "Wells Fargo", primary: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "payment_failed": return "text-red-600 bg-red-100";
      case "expired": return "text-gray-600 bg-gray-100";
      case "grace_period": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return CheckCircle;
      case "payment_failed": return XCircle;
      case "expired": return AlertTriangle;
      case "grace_period": return Clock;
      default: return AlertCircle;
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'subscriptions', label: 'Active Subscriptions', icon: Shield },
    { id: 'invoices', label: 'Invoices & Payments', icon: Receipt },
    { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'billing-admin', label: 'Billing Administration', icon: Settings },
    { id: 'payment-history', label: 'Payment History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

  const renderSubscriptions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Subscriptions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
                    <span>{subscription.status.replace('_', ' ')}</span>
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

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoices & Payments</h2>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
            <option>Failed</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Download All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modules</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {invoice.modules.map((module, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{module}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">${invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      invoice.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Download className="h-4 w-4" />
                    </button>
                    {(invoice.status === 'pending' || invoice.status === 'overdue' || invoice.status === 'failed') && (
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
              <button className="flex-1 text-blue-600 border border-blue-600 py-2 rounded hover:bg-blue-50 text-sm">
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

  const renderBillingAdmin = () => (
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
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Invoice reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Payment confirmations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm">Usage alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span className="text-sm">Service updates</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Alert Thresholds</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-700">Usage warning at</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>80%</option>
                  <option>85%</option>
                  <option>90%</option>
                  <option>95%</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Payment retry days</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'subscriptions': return renderSubscriptions();
      case 'invoices': return renderInvoices();
      case 'payment-methods': return renderPaymentMethods();
      case 'billing-admin': return renderBillingAdmin();
      case 'payment-history': return <div className="p-8 text-center text-gray-500">Payment History - Coming Soon</div>;
      case 'notifications': return <div className="p-8 text-center text-gray-500">Notifications - Coming Soon</div>;
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-700">Osto.one</h1>
          <p className="text-sm text-gray-500">Billing Dashboard</p>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t mt-auto">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-800">Need Help?</p>
            <p className="text-xs text-blue-600 mt-1">Contact our billing support team</p>
            <button className="text-xs text-blue-700 underline mt-2">Get Support</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;