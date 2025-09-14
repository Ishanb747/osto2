const BillingCalendar = ({ date }) => {
  return (
    <div className="text-sm text-gray-600 mt-2">
      Next billing: <span className="font-semibold">{date}</span>
    </div>
  );
};

export default BillingCalendar;
