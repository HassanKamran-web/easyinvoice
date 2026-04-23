import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-between hover:border-indigo-500 transition">

      <div>
        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <h3 className="text-2xl font-bold text-white mt-1">
          {value}
        </h3>
      </div>

      <div className="text-[#432DD7] text-2xl">
        {icon}
      </div>

    </div>
  );
};

export default StatCard;