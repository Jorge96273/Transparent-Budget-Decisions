import { useState } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css'; 

export default function CalendarChart() {
    const [value, setValue] = useState(new Date()); // Initialize state with the current date

    return (
        <div>
            <Calendar onChange={setValue} value={value} />
        </div>
    );
}


