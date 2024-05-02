import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css'; //Calendar CSS
import { format as formatDate, addDays, addMonths } from 'date-fns'; //For date manipulation
import { format as formateTz} from 'date-fns-tz'; //For time manipulation
import Modal from '@/components/Modal' //For the pop up when a date is clicked

//objData  is a list of Objects 
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [simpObjData, setSimpObjData] = useState([]);

  console.log("datacalchart",objData )

  //For filtering if any
  useEffect(() => {
    const filteredData = objData.filter(
      (account) => account.monthlyExpense.toLowerCase() === "no" || "yes"
    );
    setSimpObjData(filteredData)
  },[objData])

  //Breaks down the object and grabs what I need
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

  //For what appears in the calendar tiles
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event =>{
        return event.monthly ? //Checks if it is a monthly event
        (date.getDate() === event.date.getDate()) :
        formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
    });
      const getEmoji = (title) => {
        if (title.includes("Birthday")) return "🎂";
        if (title.includes("Meeting")) return "📅";
        if (title.includes("Dinner")) return "🍽️";
        if (title.includes("Car")) return "🚗";
        if (title.includes("Call")) return "📞";
        return "🎯"; // Default emoji
      };
      return <ul>{dayEvents.map((event, index) => <li key={index}>{getEmoji(event.title)}{event.title}: ${event.amount}</li>)}</ul>;
  };
  };

  //For whenever you click on a date
  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter(event => {
      return event.monthly ?  //Checks if it is a monthly event
      (clickedDate.getDate() === event.date.getDate()) :
      formatDate(event.date, 'yyyy-MM-dd') === formatDate(clickedDate, 'yyyy-MM-dd')
    });
    if (dayEvents.length > 0) {
      //ModalContent is for the pop up when a date is clicked
      setModalContent(`Events for ${formatDate(clickedDate, 'MMM dd')}: ` + dayEvents.map(event => `|| ${event.title} - $${event.amount} `).join("\n"));
      setIsOpen(true)
    }
  };

  return (
    <div className='full-react-calendar'>
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

