// import React from "react";
import { Chart } from "chart.js/auto";  // Ensures all features are available
import { CategoryScale } from "chart.js" // Needed for categorical data on the axes
import { Pie } from "react-chartjs-2"

Chart.register(CategoryScale);

export default function PieChart(category, description, data ) {
    return (
        <div>
            <div>
                <Pie     // Type of Graph
                    data={{
                        labels: description,     // X Axis 
                        datasets: [
                            {
                                label: category,  //
                                data: data,    // Y Axis
                                backgroundColor: [
                                    '#789262', // Olive green
                                    '#6A8D92', // Steel blue
                                    '#D75C5C', // Salmon red
                                    '#E2C044', // Golden rod
                                    '#F4A261', // Sandy brown
                                    '#6F1D1B'  // Barn red
                                ],
                                hoverOffset: 20,
                                hoverBorderColor: '#ffffff', // White border on hover
                                hoverBorderWidth: 2,
                            }
                        ],
                    }}
                    options={{
                        responsive: true,
                        animation: {
                            duration: 2500,
                            animateRotate: true,
                            animateScale: true, // Scale up and rotate animations
                        },
                        maintainAspectRatio: false, // If false. It will fill up its container.
                        // aspectRatio: 0   // Changes the default aspect ratio, MAR needs to be True.
                    }}
                />
            </div>
        </div>
    );
}

