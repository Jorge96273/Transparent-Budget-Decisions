import React from 'react';
import CalendarChart from '../components/CalendarChart';
import { useOutletContext } from "react-router-dom";

export default function TestChart() {

    const context = useOutletContext()
    console.log("FEOFUJ", context)

    return (
        <>
            <h1>Calendar</h1>
            <div>
                <CalendarChart
                    objData={accountList}
                />
            </div>
        </>
    );
}
