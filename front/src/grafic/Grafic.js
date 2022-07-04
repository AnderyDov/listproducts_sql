import React from "react";
import "./grafic.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Grafic({ listSort }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Диаграмма трат по датам/категориям/товарам",
      },
    },
    inflateAmount: 0,
    borderWidth: 2,
    hoverBorderWidth: 0,
  };

  let labels = [];
  let sums = [];
  let sumAll = 0;

  for (let i of listSort) {
    labels.push(`${i.date}-${i.cat}-${i.prod}`);
    sums.push(i.count * i.cost);
    sumAll += i.count * i.cost;
  }

  let data = {
    labels,
    datasets: [
      {
        label: `Суммрано потрачено: ${sumAll}$`,
        data: sums,
        backgroundColor: "rgb(32, 192, 0)",
      },
    ],
  };

  let out = (
    <div className="grafic">
      <Bar options={options} data={data} />
    </div>
  );

  return out;
}
