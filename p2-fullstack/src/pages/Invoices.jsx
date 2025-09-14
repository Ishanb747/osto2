import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";

const COMPANY_ID = 1;

const fetchInvoices = async () => {
  const res = await fetch(`https://osto22.onrender.com/companies/${COMPANY_ID}/invoices`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
};

const Invoices = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    refetchInterval: 10000,
  });
  const [payInvoiceId, setPayInvoiceId] = useState(null);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading invoices.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Invoices & Payments</h2>
        <div className="flex space-x-3 w-full sm:w-auto">
          <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2">
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Overdue</option>
            <option>Failed</option>
            <option>Processing</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modules</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{invoice.due_date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {invoice.modules?.map((module, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{module}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{invoice.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      invoice.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      invoice.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <a
                      href={`https://osto22.onrender.com/invoices/${invoice.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    {invoice.status === 'Unpaid' && (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        onClick={() => setPayInvoiceId(invoice.id)}
                      >Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Payment Modal can be added here if needed */}
    </div>
  );
};

export default Invoices;