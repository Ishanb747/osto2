import React from "react";
import InvoiceRow from "./InvoiceRow";

const InvoiceTable = ({ invoices, onPay }) => (
  <table className="min-w-full bg-white border rounded shadow">
    <thead>
      <tr>
        <th className="px-4 py-2">Invoice ID</th>
        <th className="px-4 py-2">Amount</th>
        <th className="px-4 py-2">Currency</th>
        <th className="px-4 py-2">Due Date</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Modules</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {invoices?.map(inv => (
        <InvoiceRow key={inv.id} invoice={inv} onPay={onPay} />
      ))}
    </tbody>
  </table>
);

export default InvoiceTable;
