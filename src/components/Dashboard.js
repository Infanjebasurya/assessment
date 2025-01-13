import React, { useState, useEffect } from "react";
import SummaryCard from "./SummaryCard";
import Chart from "./Chart";
import data from "../data/ev_data.json";

const Dashboard = () => {
  const [totalEVs, setTotalEVs] = useState(0);
  const [popularMake, setPopularMake] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Calculate total EVs
    const total = data.reduce((sum, ev) => sum + ev.count, 0);
    setTotalEVs(total);

    // Find the most popular make
    const makeCounts = data.reduce((acc, ev) => {
      acc[ev.make] = (acc[ev.make] || 0) + ev.count;
      return acc;
    }, {});
    const mostPopular = Object.keys(makeCounts).reduce((a, b) =>
      makeCounts[a] > makeCounts[b] ? a : b
    );
    setPopularMake(mostPopular);

    // Prepare chart data
    const chart = data.reduce((acc, ev) => {
      const yearData = acc.find((item) => item.year === ev.year);
      if (yearData) {
        yearData.count += ev.count;
      } else {
        acc.push({ year: ev.year, count: ev.count });
      }
      return acc;
    }, []);
    setChartData(chart);
  }, []);

  return (
    <div>
      <div className="summary">
        <SummaryCard title="Total EVs" value={totalEVs} />
        <SummaryCard title="Most Popular Make" value={popularMake} />
      </div>
      <Chart data={chartData} />
    </div>
  );
};

export default Dashboard;
