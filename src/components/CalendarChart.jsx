import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css'; //Calendar CSS
import { format as formatDate, addDays, addMonths } from 'date-fns'; //For date manipulation-----
import { format as formateTz} from 'date-fns-tz'; //For time manipulation----
import Modal from '@/components/Modal' //For the pop up when a date is clicked----
import { Button } from "@/components/ui/button";



//objData  is a list of Objects 
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [transactionType, setTransactionType] = useState('withdrawal'); 
  const [triggerEffect, setTriggerEffect] = useState(0);

  const ColorChanger = () => { 
    events.forEach(event => {
      if (event.type.toLowerCase() === 'withdrawal') {
        event.amount = '-'.concat(event.amount);
      }
    })};

  const DataChanger = () => {
    const filteredData = objData.filter((account) => {
      if (transactionType === 'both') {
        return ['withdrawal', 'deposit'].includes(account.newTransactionType.toLowerCase());
      } else {
        return account.newTransactionType.toLowerCase() === transactionType;
      }
    });
    if (filteredData.length > 0) {
      const eventData = filteredData.map((data) => ({
        title: data.newTransactionName,
        date: addDays(new Date(data.newTransactionDate), 1),
        amount: data.newTransactionAmount,
        monthly: data.monthlyExpense.toLowerCase() === 'yes',
        type: data.newTransactionType
      }));
      setEvents(eventData);
    } else {
      setEvents([]); 
  }}

  
  //For what appears in the calendar tiles------
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event =>{
        return event.monthly ? //Checks if it is a monthly event-------
        (date.getDate() === event.date.getDate()) :
        formatDate(event.date, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
    });
      const getEmoji = (title) => {
        if (title.includes("Birthday")) return "🎂";
        if (title.includes("Movie")) return "🎞️";
        if (title.includes("Dinner")) return "🍽️";
        if (title.includes("Car")) return "🚗";
        if (title.includes("Phone")) return "📞";
        if (title.includes("Mortgage")) return "🏡";
        if (title.includes("School")) return "📚";
        if (title.includes("Gym")) return "🏋️";
        if (title.includes("Cable")) return "🛜";
        if (title.includes("Paycheck")) return "💰";
        return "🎯"; 
      };
      return <ul>{dayEvents.map((event, index) => <li key={index} style={{ color: event.amount < 0 ? 'red' : 'green' }} >{getEmoji(event.title)}{event.title}: ${event.amount}</li>)}</ul>;
  };
  };

  //For whenever you click on a date -----
  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter(event => {
      return event.monthly ?  //Checks if it is a monthly event-------
      (clickedDate.getDate() === event.date.getDate()) :
      formatDate(event.date, 'yyyy-MM-dd') === formatDate(clickedDate, 'yyyy-MM-dd')
    });
    if (dayEvents.length > 0) {
      //ModalContent is for the pop up when a date is clicked-------
      setModalContent(`Events for ${formatDate(clickedDate, 'MMM dd')}: ` + dayEvents.map(event => `|| ${event.title}:  $${event.amount} `).join("\n"));
      setIsOpen(true)
    }
  };

  useEffect(() => {
    DataChanger();
  }, [objData, transactionType]);

  useEffect(() => {
    ColorChanger();
  }, [events]);

  return (
    <>
    <div className='flex flex-col items-center'>
      <Calendar
        onChange={setDate}
        value={date}
        calendarType="iso8601"
        className="calendar-style rounded "
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
        <div className='m-2 w-max'>
      <button className='dbutton' onClick={() => {
        setTransactionType('deposit');
        setTriggerEffect(prev => prev + 1);
        }}>Deposits</button>
      <button className='all-button' onClick={() => {
        setTransactionType('both');        
        setTriggerEffect(prev => prev + 1);
      }}> Both </button>
      <button className='wbutton' onClick={() => {
        setTransactionType('withdrawal');
        setTriggerEffect(prev => prev + 1);
      }}>Withdrawals</button>
      </div>
      </div>
      </>
  );
};



