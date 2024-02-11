"use client";
import { PieChart } from "react-minimal-pie-chart";

export default function Chart({ correct, wrong }: any) {
  return (
    <>
      <PieChart
        data={[
          { title: "Right Answers", value: correct, color: "#E38627" },
          { title: "Wrong Answers", value: wrong, color: "#C13C37" },
        ]}
      />
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Correct
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Wrong
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {correct}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {wrong}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {Math.round((correct / (correct + wrong)) * 100)}%
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {Math.round((wrong / (correct + wrong)) * 100)}%
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center pt-5">
          <p className="text-sm">
            {(correct / (correct + wrong)) * 100 > 50
              ? "You are eligible for interview"
              : "You are not eligible for interview"}
          </p>
        </div>
      </div>
    </>
  );
}
