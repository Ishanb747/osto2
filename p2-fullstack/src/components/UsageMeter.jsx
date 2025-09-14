const UsageMeter = ({ usage, limit }) => {
  const percent = Math.min(100, Math.round((usage / limit) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>Usage: {usage}</span>
        <span>Limit: {limit}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-3 rounded bg-blue-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UsageMeter;
