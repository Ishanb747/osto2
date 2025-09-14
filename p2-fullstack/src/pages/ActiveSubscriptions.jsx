import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const COMPANY_ID = 1;

const fetchSubscriptions = async () => {
  const res = await fetch(`https://osto22.onrender.com/companies/${COMPANY_ID}/subscriptions`);
  if (!res.ok) throw new Error("Failed to fetch subscriptions");
  return res.json();
};

const subscriptionAction = async ({ id, action, payload }) => {
  // Use /subscriptions/{id}/{action} for actions
  let url = `https://osto22.onrender.com/subscriptions/${id}/${action}`;
  let options = { method: "POST", headers: { "Content-Type": "application/json" } };
  if (payload) options.body = JSON.stringify(payload);
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Failed to ${action} subscription`);
  return res.json();
};

const fetchUsage = async (id) => {
  // Use /usage/{id} for usage
  const res = await fetch(`https://osto22.onrender.com:8080/usage/${id}`);
  if (!res.ok) throw new Error("Failed to fetch usage");
  return res.json();
};

const SubscriptionCard = ({ sub, refetch }) => {
  const queryClient = useQueryClient();
  const [showUsage, setShowUsage] = React.useState(false);
  const { data: usage, isLoading: usageLoading, error: usageError } = useQuery({
    queryKey: ["usage", sub.id],
    queryFn: () => fetchUsage(sub.id),
    enabled: showUsage,
  });

  const mutation = useMutation({
    mutationFn: async ({ action, payload }) => {
      if (action === "cancel") {
        // First cancel, then delete
        await subscriptionAction({ id: sub.id, action, payload });
        // Call DELETE /subscriptions/{id}
        const res = await fetch(`https://osto22.onrender.com/subscriptions/${sub.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete subscription");
        return true;
      } else {
        return subscriptionAction({ id: sub.id, action, payload });
      }
    },
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries(["usage", sub.id]);
    },
  });

  return (
    <div className="border rounded-lg p-6 shadow bg-white flex flex-col gap-2">
      <div className="font-bold text-lg">{sub.module_name || sub.module?.name || "Module"}</div>
      <div className="text-gray-600">Plan: {sub.plan_name || sub.plan?.name || "N/A"}</div>
      <div className="text-gray-500">Status: <span className="font-semibold">{sub.status}</span></div>
      <div className="text-gray-500">Start: {sub.start_date}</div>
      <div className="text-gray-500">End: {sub.end_date || "-"}</div>
      <div className="flex gap-2 mt-2 flex-wrap">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => mutation.mutate({ action: "upgrade" })}
          disabled={mutation.isLoading}
        >Upgrade</button>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => mutation.mutate({ action: "downgrade" })}
          disabled={mutation.isLoading}
        >Downgrade</button>
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => mutation.mutate({ action: "pause" })}
          disabled={mutation.isLoading}
        >Pause</button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => mutation.mutate({ action: "cancel" })}
          disabled={mutation.isLoading}
        >{mutation.isLoading ? "Cancelling..." : "Cancel"}</button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setShowUsage((v) => !v)}
        >{showUsage ? "Hide Usage" : "Show Usage"}</button>
      </div>
      {mutation.isError && <div className="text-red-600">{mutation.error.message}</div>}
      {showUsage && (
        <div className="mt-2">
          {usageLoading ? (
            <div>Loading usage...</div>
          ) : usageError ? (
            <div className="text-red-600">Error loading usage.</div>
          ) : usage ? (
            <div className="bg-gray-100 p-2 rounded">
              <div>Usage: {usage.usage_amount ?? usage.amount ?? "N/A"}</div>
              <div>Period: {usage.period_start} - {usage.period_end}</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

const createSubscription = async (payload) => {
  const res = await fetch(`http://localhost:8080/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add subscription");
  return res.json();
};

const AddModuleModal = ({ open, onClose, onSubmit, isLoading, error }) => {
  const [form, setForm] = useState({
    module_name: "",
    plan_name: "",
    start_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Add Module Subscription</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="module_name"
            placeholder="Module Name"
            value={form.module_name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="plan_name"
            placeholder="Plan Name"
            value={form.plan_name}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            name="start_date"
            placeholder="Start Date"
            value={form.start_date}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            disabled={isLoading}
          >{isLoading ? "Adding..." : "Add Subscription"}</button>
          {error && <div className="text-red-600 mt-2">{error.message}</div>}
        </form>
      </div>
    </div>
  );
};

const ActiveSubscriptions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
    refetchInterval: 60000,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      setModalOpen(false);
      refetch();
    },
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading subscriptions.</div>;

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Active Subscriptions</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >Add Module</button>
      </div>
      <AddModuleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={mutation.mutate}
        isLoading={mutation.isLoading}
        error={mutation.isError ? mutation.error : null}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.filter(sub => sub.status !== "Canceled").length === 0 && (
          <div className="col-span-2 text-center text-gray-500">No active subscriptions.</div>
        )}
        {data?.filter(sub => sub.status !== "Canceled").map((sub) => (
          <SubscriptionCard key={sub.id} sub={sub} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default ActiveSubscriptions;
