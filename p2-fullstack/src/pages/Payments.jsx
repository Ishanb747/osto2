import React from "react";
import { useQuery } from "@tanstack/react-query";

const COMPANY_ID = 1;

const fetchPayments = async () => {
  const res = await fetch(`http://localhost:8080/companies/${COMPANY_ID}/payments`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
};

const Payments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
    refetchInterval: 60000,
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading payments.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Payment ID</th>
            <th className="px-4 py-2">Invoice ID</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Currency</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(pay => (
            <tr key={pay.id} className="border-t">
              <td className="px-4 py-2">{pay.id}</td>
              <td className="px-4 py-2">{pay.invoice_id}</td>
              <td className="px-4 py-2">{pay.amount}</td>
              <td className="px-4 py-2">{pay.currency}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white ${pay.status === "Paid" ? "bg-green-500" : pay.status === "Failed" ? "bg-red-500" : "bg-blue-500"}`}>{pay.status}</span>
              </td>
              <td className="px-4 py-2">{new Date(pay.created_at).toLocaleString()}</td>
              <td className="px-4 py-2">
                {pay.receipt_url ? <a href={pay.receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Receipt</a> : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
