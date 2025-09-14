import React from "react";

const PaymentModal = ({ invoiceId, onClose, refetch }) => {
  if (!invoiceId) return null;

  const handlePay = async () => {
    // Initiate payment (mock or Stripe checkout)
    await fetch(`https://osto22.onrender.com/invoices/${invoiceId}/pay`, { method: "POST" });
    refetch();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Pay Invoice</h2>
        <p className="mb-4">Proceed to pay invoice <span className="font-mono">{invoiceId}</span>?</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handlePay}
        >Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentModal;
