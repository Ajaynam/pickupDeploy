import React, { useState, useEffect } from "react";
import { Card } from "../../../components/ui";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { FaCheckCircle, FaClock, FaBox, FaTruck, FaShippingFast } from "react-icons/fa"; // Importing additional icons

const StatisticCard = ({
  count = 0,
  label,
  valuePrefix,
  startDate,
  endDate,
  icon // New prop to pass icon component
}) => {
  let labelColorClass = "text-black";
  let iconColor = "#000";
  let iconBorderColor = "rgba(0, 0, 0, 0.2)";
  if (label === "Total Quick Pending Orders" || label === "Total Pending Orders") {
    labelColorClass = "text-red-500";
    iconColor = "red";
    iconBorderColor = "rgba(255, 0, 0, 0.2)";
  } else if (label === "Total Picked Up Orders" || label === "Total Quick Picked Up Orders") {
    labelColorClass = "text-green-500";
    iconColor = "green";
    iconBorderColor = "rgba(0, 128, 0, 0.2)";
  } else if (label === "Total Quick Orders") {
    iconColor = "yellow"; // Set icon color to yellow for Total Quick Orders
    iconBorderColor = "rgba(0, 128, 0, 0.2)";
  }
  return (
    <Card>
  <div className="flex items-center justify-center">
    <div className="flex items-center justify-center rounded-full p-2 mr-4" style={{ backgroundColor: iconBorderColor }}>
      <span className={`text-4xl text-${iconColor}-700`} style={{ padding: '4px', borderRadius: '50%', fill: iconColor }}>{icon}</span> {/* Icon positioned before label */}
    </div>
    <div>
      <h6 className={`font-semibold text-lg ${labelColorClass}`}>{label}</h6> {/* Apply color based on label */}
    </div>
  </div>
  <div className="text-center mt-2">
    <h3 className="font-bold text-2xl"> {/* Increased font size for count */}
      <NumericFormat
        displayType="text"
        value={count}
        thousandSeparator
        prefix={valuePrefix}
      />
    </h3>
  </div>
</Card>

  );
};

const Statistic = () => {
  const startDate = useSelector(
    (state) => state.salesDashboard.state.startDate
  );
  const endDate = useSelector((state) => state.salesDashboard.state.endDate);

  // States to store counts
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalPickedUpOrders, setTotalPickedUpOrders] = useState(0);
  const [totalQuickOrders, setTotalQuickOrders] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total orders count
        const responseTotal = await fetch(
          "https://pickup-server-y10z.onrender.com/order/getTotalOrders"
        );
        const { totalOrders } = await responseTotal.json();
        setTotalOrders(totalOrders);

        // Fetch pending orders count
        const responsePending = await fetch(
          "https://pickup-server-y10z.onrender.com/order/getTotalPendingOrders"
        );
        const { totalPendingOrders } = await responsePending.json();
        setTotalPendingOrders(totalPendingOrders);

        // Fetch picked up orders count
        const responsePickedUp = await fetch(
          "https://pickup-server-y10z.onrender.com/order/getTotalPickedUpOrders"
        );
        const { totalPickedUpOrders } = await responsePickedUp.json();
        setTotalPickedUpOrders(totalPickedUpOrders);

        // Quick Orders

        // Fetch total quick orders count
        const responseQuickOrders = await fetch(
          "https://pickup-server-y10z.onrender.com/quickOrder/getTotalQuickOrder"
        );
        const { totalQuickOrders } = await responseQuickOrders.json();
        console.log("totalQuickOrders",responseQuickOrders)
        setTotalQuickOrders(totalQuickOrders);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, [startDate, endDate]);

  return (
    <>
      <div className="lg:flex gap-4">
        <div className="w-full lg:w-1/3">
          <StatisticCard
            count={totalOrders}
            label="Total Orders"
            valuePrefix=""
            startDate={startDate}
            endDate={endDate}
            icon={<FaBox size={24} />} // Larger icon size
          />
        </div>
        <div className="w-full lg:w-1/3">
          <StatisticCard
            count={totalPendingOrders}
            label="Total Pending Orders"
            valuePrefix=""
            startDate={startDate}
            endDate={endDate}
            icon={<FaClock size={24} />} // Larger icon size
          />
        </div>
        <div className="w-full lg:w-1/3">
          <StatisticCard
            count={totalPickedUpOrders}
            label="Total Picked Up Orders"
            valuePrefix=""
            startDate={startDate}
            endDate={endDate}
            icon={<FaTruck size={24} />} // Larger icon size
          />
        </div>
      </div>
      <div className="lg:flex gap-4">
      <div className="w-1/3 lg:w-1/4"> {/* Adjust width to w-1/3 or smaller */}
  <StatisticCard
    count={totalQuickOrders}
    label="Total Quick Orders"
    valuePrefix=""
    startDate={startDate}
    endDate={endDate}
    icon={<FaShippingFast size={24} />} // Smaller icon size
  />
</div>
      </div>
    </>
  );
};

export default Statistic;
