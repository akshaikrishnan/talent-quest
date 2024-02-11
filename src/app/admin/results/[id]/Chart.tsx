"use client";
import { PieChart } from "react-minimal-pie-chart";

export default function Chart({ correct, wrong }: any) {
  return (
    <PieChart
      data={[
        { title: "Right Answers", value: correct, color: "#E38627" },
        { title: "Wrong Answers", value: wrong, color: "#C13C37" },
      ]}
    />
  );
}
