// import React from "react";
import { Chart } from "chart.js/auto"; // Ensures all features are available
import { CategoryScale } from "chart.js"; // Needed for categorical data on the axes
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function LineChart(category, xlabels, ydata) {
  return (
    <div>
      <div>
        <Line
          data={{
            labels: xlabels,
            datasets: [
              {
                label: category,
                data: ydata,
                fill: false,
                borderColor: "#6A8D92",
                backgroundColor: "#6F1D1B",
                pointBorderColor: "#6F1D1B",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#F4A261",
                pointHoverBorderColor: "#6F1D1B",
                pointHoverBorderWidth: 20,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#000",
                  font: {
                    size: 12,
                  },
                },
                position: "top",
              },
            },
            animation: {
              tension: {
                duration: 2500,
                easing: "linear",
                from: 1,
                to: 0,
                loop: false,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
