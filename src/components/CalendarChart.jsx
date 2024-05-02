import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css';
import { format as formatDate, addDays, addMonths } from 'date-fns'; 
import { format as formateTz} from 'date-fns-tz';
import Modal from '@/components/Modal'

//objData  is a list of Objects  //happensMonthly is a boolean
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [simpObjData, setSimpObjData] = useState([]);

  console.log("datacalchart",objData )

  useEffect(() => {
    const filteredData = objData.filter(
      (account) => account.monthlyExpense.toLowerCase() === "no" || "yes"
    );
    setSimpObjData(filteredData)
  },[objData])

  useEffect(() => {
    if (simpObjData.length > 0) {
      const breakDown = simpObjData.map((data) => ({
        title: data.newTransactionName,
        date: addDays(new Date (data.newTransactionDate), 1),
        amount: data.newTransactionAmount,
        monthly: data.monthlyExpense.toLowerCase() === 'yes' ? true : false
    }))
    console.log("AAAAAA",breakDown)
    setEvents(breakDown);
    }
  }, [simpObjData]);


  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event =>{
      console.log(event.monthly);
        return event.monthly ?
        (date.getDate() === event.date.getDate()) :
        formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
    });
      return <ul>{dayEvents.map((event, index) => <li key={index}>🎯{event.title}: ${event.amount}</li>)}</ul>;
  };
  };

  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter(event => {
    console.log(event.monthly);
      return event.monthly ? 
      (clickedDate.getDate() === event.date.getDate()) :
      formatDate(event.date, 'yyyy-MM-dd') === formatDate(clickedDate, 'yyyy-MM-dd')
    });
    if (dayEvents.length > 0) {
      setModalContent(`Events for ${formatDate(clickedDate, 'MMM dd')}: ` + dayEvents.map(event => `|| ${event.title} - $${event.amount} `).join("\n"));
      setIsOpen(true)
    }
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        calendarType="iso8601"
        className="calendar-style"
        view="month"
        onClickDay={handleDayClick}
        tileContent={renderTileContent}
      />
      <div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h1 style={{ color: "white" }}>Event Details</h1>
          <p style={{ color: "white" }}>{modalContent}</p>
        </Modal>
      </div>
    </div>
  );
};

