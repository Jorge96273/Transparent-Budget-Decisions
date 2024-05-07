import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css'; //Calendar CSS
import { format as formatDate, addDays, subDays, isSameDay, getDaysInMonth } from 'date-fns'; //For date manipulation-----
import { format as formateTz } from 'date-fns-tz'; //For time manipulation----
import Modal from '@/components/Modal' //For the pop up when a date is clicked----



//objData  is a list of Objects 
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');


  const AddSign = () => {
    events.forEach(event => {
      if (event.type.toLowerCase() === 'withdrawal') {
        event.amount = '-$'.concat(event.amount);
      }
      else if(event.type.toLowerCase() === 'deposit'){
        event.amount = '+$'.concat(event.amount);
      }
    })
  }

  const DataChanger = () => {
    const eventData = objData.map((data) => ({
      title: data.newTransactionName,
      date: addDays(new Date(data.newTransactionDate), 1),
      amount: data.newTransactionAmount,
      monthly: data.monthlyExpense.toLowerCase() === 'yes',
      type: data.newTransactionType.toLowerCase()
    }));
    setEvents(eventData);
  }

  //For what appears in the calendar tiles------
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event => {
        // Handles Dates that are out of range of the Calendar-----------
        if (event.monthly) {
          const eventDate = new Date(event.date);
          const eventDayOfMonth = eventDate.getDate();
          const daysInMonth = getDaysInMonth(new Date(date.getFullYear(), date.getMonth()));
          const adjustedDay = eventDayOfMonth > daysInMonth ? daysInMonth : eventDayOfMonth;
          return isSameDay(date, new Date(date.getFullYear(), date.getMonth(), adjustedDay));
        } else {
          return isSameDay(date, new Date(event.date));
        }
      });

      const getEmoji = (type) => {
        if (type === 'deposit') {
          return "💲"; 
        } else if (type === 'withdrawal') {
          return "🔻";
        } else {
          return ''; 
        }
      };

      return (
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index} style={{ color: event.type === 'withdrawal' ? 'red' : 'green' }}>
              {getEmoji(event.type)} {event.title}: {event.amount}
            </li>
          ))}
        </ul>
      );
    }
  };

  //For whenever you click on a date -----
  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter(event => {
      if (event.monthly) {
        const daysInMonth = getDaysInMonth(new Date(clickedDate.getFullYear(), clickedDate.getMonth()));
        const eventDayOfMonth = new Date(event.date).getDate();
        const adjustedDay = eventDayOfMonth > daysInMonth ? daysInMonth : eventDayOfMonth;
        const adjustedDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), adjustedDay);
        return isSameDay(clickedDate, adjustedDate);
      } else {
        return isSameDay(clickedDate, new Date(event.date));
      }
    });

    if (dayEvents.length > 0) {
      const eventsList = dayEvents.map((event, index) => (
        <li className='bg-white p-2 shadow rounded mr-4 mb-2' key={index}>
          {`${event.title}: ${event.amount}`}
        </li>
      ));

      setModalContent(
        <div className='bg-blue-400 text-black rounded-lg p-4 shadow-xl'>
          <p className='bg-blue-500 text-white font-bold text-center rounded-lg py-3 px-4 shadow'>
            Events for {formatDate(clickedDate, 'MMMM dd, yyyy')}
          </p>
          <ul className='bg-blue-500 rounded-lg shadow-md p-4 mt-4  '>
            {eventsList}
          </ul>
        </div>
      );
      setIsOpen(true);
    }
  };

  useEffect(() => {
    DataChanger();
  }, [objData]);

  useEffect(() => {
    AddSign();
  }, [events]);

  return (
    <>
      <div className='flex flex-col items-center'>
        <Calendar
          onChange={setDate}
          value={date}
          calendarType="iso8601"
          className="full-react-calendar"
          view="month"
          onClickDay={handleDayClick}
          tileContent={renderTileContent}
        />
        <div>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <p className='p-2' >{modalContent}</p>
          </Modal>
        </div>
      </div>
    </>
  );
};





