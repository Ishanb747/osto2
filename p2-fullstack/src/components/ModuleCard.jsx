import React, { useState } from "react";
import UsageMeter from "./UsageMeter.jsx";
import BillingCalendar from "./BillingCalendar.jsx";

const statusColors = {
  Active: "bg-green-500",
  Grace: "bg-yellow-400",
  Expired: "bg-red-500",
  Failed: "bg-red-500",
  Suspended: "bg-gray-400",
};

/**
 * @param {{ subscription: {
 *   id: string|number,
 *   module: string,
 *   status: string,
 *   plan: string,
 *   price_currency: string,
 *   limit: number,
 *   usage: number,
 *   next_billing_date: string
 * }, refetch: () => void }} props
 */
const ModuleCard = ({ subscription, refetch }) => {
  const [actionLoading, setActionLoading] = useState(false);
  const statusColor = statusColors[subscription.status] || "bg-gray-300";

  /**
   * @param {string} action
   */
  const handleAction = async (action) => {
    setActionLoading(true);
    await fetch(`http://localhost:8080/subscriptions/${subscription.id}/${action}`, { method: "POST" });
    setActionLoading(false);
    refetch();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${statusColor}`} title={subscription.status}></div>
        <div className="font-bold text-lg">{subscription.module}</div>
        <span className="ml-auto px-2 py-1 rounded text-xs font-semibold bg-gray-100">{subscription.plan}</span>
      </div>
      <UsageMeter usage={subscription.usage} limit={subscription.limit} />
      <BillingCalendar date={subscription.next_billing_date} />
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" disabled={actionLoading} onClick={() => handleAction("upgrade")}>Upgrade</button>
        <button className="px-3 py-1 bg-yellow-500 text-white rounded" disabled={actionLoading} onClick={() => handleAction("downgrade")}>Downgrade</button>
        <button className="px-3 py-1 bg-gray-500 text-white rounded" disabled={actionLoading} onClick={() => handleAction("pause")}>Pause</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded" disabled={actionLoading} onClick={() => handleAction("cancel")}>Cancel</button>
      </div>
    </div>
  );
};

export default ModuleCard;
