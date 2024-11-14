import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const EmotionalHealthGraph = () => {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const daysData = JSON.parse(localStorage.getItem("days")) || [];
    const weeksData = JSON.parse(localStorage.getItem("weeks")) || [];
    // Process daily data
    const processedDailyData = daysData
      .map((entry) => {
        const date = entry.date;
        const average = calculateOverallAverage(entry.data);
        return { date, average };
      })
      .reverse(); // Reverse to have oldest data first

    // Process weekly data
    const processedWeeklyData = weeksData
      .map((entry) => {
        const date = entry.week;
        const average = calculateOverallAverage(entry.data);
        return { date, average };
      })
      .reverse();

    setDailyData(processedDailyData);
    setWeeklyData(processedWeeklyData);
  }, []);

  // Function to calculate overall average from category data
  const calculateOverallAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    const average = total / data.length;
    return parseFloat(average.toFixed(2));
  };

  return (
    <Container>
      <Title>Your Emotional Health Over Time</Title>
      <GraphContainer>
        <GraphTitle>Last 7 Days</GraphTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </GraphContainer>

      <GraphContainer>
        <GraphTitle>Last 8 Weeks</GraphTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 2em;
`;

const GraphContainer = styled.div`
  margin-bottom: 50px;
`;

const GraphTitle = styled.h3`
  text-align: center;
  color: #555;
  margin-bottom: 20px;
  font-size: 1.5em;
`;

export default EmotionalHealthGraph;
