"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

// const chartData = [
//   { initials: "D.C.", base_salary: 1400000 },
//   { initials: "C.S.", base_salary: 2000000 },
// ];

const chartConfig = {
  desktop: {
    label: "Salary",
    color: "hsl(var(--chart-1))",
  },
};

export function BarChartComponent({chartData}) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-foreground">
        Salarios
      </h3>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="initials"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis label={{ value: "", angle: -90, position: "insideLeft" }} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="base_salary" fill="hsl(var(--chart-1))" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default BarChartComponent;
