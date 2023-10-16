"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

const Chart = ({
  data
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={14}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="2022"  fill="#82ca9d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
        
      </BarChart>
    </ResponsiveContainer>
  )
};

export default Chart