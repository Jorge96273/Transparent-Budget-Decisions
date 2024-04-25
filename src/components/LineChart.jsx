// import React from "react";
import { Chart } from "chart.js/auto";  // Ensures all features are available
import { CategoryScale } from "chart.js" // Needed for categorical data on the axes
import { Line } from "react-chartjs-2"

Chart.register(CategoryScale);

export default function LineChart(category,xlabels,ydata) {
    return (
        <div>
            <div>
                <Line     // Type of Graph
                    data={{
                        labels: xlabels,     // X Axis 
                        datasets: [
                            {
                                label: category,  //
                                data: ydata,    // Y Axis
                                fill: false,
                                borderColor: '#6A8D92', // Use a color that fits the theme
                                backgroundColor: '#6F1D1B', // Background color of points
                                pointBorderColor: '#6F1D1B',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 2,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: '#F4A261',
                                pointHoverBorderColor: '#6F1D1B',
                                pointHoverBorderWidth: 20,
                            }
                        ],
                    }}
                    options={{
                        responsive: true,
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
                        animation: {
                            tension: {
                                duration: 2500,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: false
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

