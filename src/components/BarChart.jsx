// import React from "react";
import { Chart } from "chart.js/auto";  // Ensures all features are available
import { CategoryScale } from "chart.js" // Needed for categorical data on the axes
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale);

export default function BarChart(category, xlabels, ydata) {
    return (
        <div>
            <div>
                <Bar     // Type of Graph
                    data={{
                        labels: xlabels,     // X Labels 
                        datasets: [
                            {
                                label: category,  // Labels
                                data: ydata,    // Y Axis
                                backgroundColor: 'rgba(106, 141, 146, 0.6)',
                                borderColor: 'rgba(6, 95, 105, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(6, 95, 105, 0.8)', 
                                hoverBorderColor: 'rgba(6, 95, 105, 1)'
                            }
                        ],
                        
                    }}
                    options={{
                        responsive: true,
                        animation: {
                            easing: 'easeInOutQuad',
                            duration: 2500
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#000', // Color of the legend text
                                    font: {
                                        size: 12, // Bigger font size for the legend to enhance visibility
                                    }
                                },
                                position: 'top', // Places the legend at the top of the chart where it's more visible
                            }
                        },
                        maintainAspectRatio: false, // If false. It will fill up its container.
                        // aspectRatio: 0   // Changes the default aspect ratio, MAR needs to be True.
                    }}
                />
            </div>
        </div>
    );
}

