import React from "react";

const statusColor = {
  Paid: "bg-green-500",
  Unpaid: "bg-red-500",
  Overdue: "bg-yellow-500",
  Processing: "bg-blue-500"
};

const InvoiceRow = ({ invoice, onPay }) => (
  <tr className="border-t">
    <td className="px-4 py-2">{invoice.id}</td>
    <td className="px-4 py-2">{invoice.amount}</td>
    <td className="px-4 py-2">{invoice.currency}</td>
    <td className="px-4 py-2">{invoice.due_date}</td>
    <td className="px-4 py-2">
      <span className={`px-2 py-1 rounded text-white ${statusColor[invoice.status] || "bg-gray-400"}`}>{invoice.status}</span>
    </td>
    <td className="px-4 py-2">{invoice.modules?.join(", ")}</td>
    <td className="px-4 py-2 flex gap-2">
      <a
        href={`http://localhost:8080/invoices/${invoice.id}/pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >Download PDF</a>
      {invoice.status === "Unpaid" && (
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => onPay(invoice.id)}
        >Pay Now</button>
      )}
    </td>
  </tr>
);

export default InvoiceRow;
