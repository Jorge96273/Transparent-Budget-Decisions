import React from 'react';
import ReactDOM from 'react-dom/client';
import CalendarChart from '../components/CalendarChart';


export default function TestChart() {
    return (
        <>
        <h1>Calendar</h1>
        <div>
            {CalendarChart()}
        </div>
        </>
    );
}




// import React from "react";
// import LineChart from "./LineChart.jsx";
// import BarChart from "./BarChart.jsx";
// import PieChart from "./PieChart.jsx";
// import { SampleData } from "@/SampleData";


// export default function TestChart() {

//     let filler = SampleData.filter(item => item.category === "Income")

//     const ids = filler.map(item => item.id);
//     console.log(ids);
//     const amounts = filler.map(item => item.amount)
//     console.log(amounts)
//     const description = filler.map(item=> item.description) 
//     console.log(description)
//     const category = filler.map(item => item.category)[0]
//     console.log(category)
//     const year = filler.map(item => item.year)
//     console.log(year)

//     return (
//         <div>
//             {BarChart(category, description, amounts)}
//             {LineChart(category, year, amounts)}
//             {PieChart(category, description, amounts)} 
//         </div>
//     )
// }


