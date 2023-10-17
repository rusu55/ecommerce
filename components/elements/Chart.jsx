"use client"
import {format, subYears, parseISO} from 'date-fns';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"


const Chart = ({
  data, year
}) => {
  
  const date = subYears(parseISO(year), 1);
  
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
        <Bar dataKey="prev"  fill="#82ca9d" name={format(new Date(date), 'yyyy')} radius={[4, 4, 0, 0]} />
        <Bar dataKey="now" fill="#3498db" name={year} radius={[4, 4, 0, 0]} />
        
      </BarChart>
    </ResponsiveContainer>
  )
};

export default Chart