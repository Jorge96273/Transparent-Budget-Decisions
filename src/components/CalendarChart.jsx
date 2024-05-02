import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css';
import { format as formatDate, addDays, addMonths } from 'date-fns'; 
import { format as formateTz} from 'date-fns-tz';
import Modal from '@/components/Modal'

//sampleData is a list of Objects  //happensMonthly is a boolean
export default function CalendarChart({ sampleData, happensMonthly }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  console.log("datacalchart",sampleData)

  useEffect(() => {
    const breakDown = sampleData.map((data) => ({
      title: data.transactionName,
      date: addDays(new Date (data.transactionDate), 1),
      amount: data.transactionAmount,
    }))
    setEvents(breakDown);
  }, [sampleData]);


  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event =>{
        return happensMonthly ?
        (date.getDate() === event.date.getDate()) :
        formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
    });
      return <ul>{dayEvents.map((event, index) => <li key={index}>🎯{event.title}: ${event.amount}</li>)}</ul>;
  };
  };

  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter(event => {
      return happensMonthly ? 
      (clickedDate.getDate() === event.date.getDate()) :
      formatDate(event.date, 'yyyy-MM-dd') === formatDate(clickedDate, 'yyyy-MM-dd')
    });
    if (dayEvents.length > 0) {
      setModalContent(`Events for ${formatDate(clickedDate, 'MMM dd')}:   ` + dayEvents.map(event => `${event.title} - $${event.amount}` ).join("\n"));
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

