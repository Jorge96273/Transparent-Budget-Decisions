import React from 'react';
import CalendarChart from '../components/CalendarChart';
import { SampleData } from '../SampleData'

export default function TestChart() {

    const sampleTitle = SampleData.map(item => item.transactionName);
    const sampleDate = SampleData.map(item => item.transactionDate);
    const sampleAmount = SampleData.map(item => item.transactionAmount);


    return (
        <>
            <h1>Calendar</h1>
            <div>
                <CalendarChart
                    sampleData={SampleData}
                    happensMonthly={true}
                />
            </div>
        </>
    );
}
