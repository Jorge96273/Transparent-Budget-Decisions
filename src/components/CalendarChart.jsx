import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css'; //Calendar CSS
import { format as formatDate, addDays, subDays, isSameDay, getDaysInMonth } from 'date-fns'; //For date manipulation-----
import { format as formateTz} from 'date-fns-tz'; //For time manipulation----
import Modal from '@/components/Modal' //For the pop up when a date is clicked----



//objData  is a list of Objects 
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');


  const NegativeAdd = () => {
    events.forEach(event => {
      if (event.type.toLowerCase() === 'withdrawal') {
        event.amount = '-'.concat(event.amount);
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
    console.log(events); 
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

      return (
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index} style={{ color: event.type === 'withdrawal' ? 'red' : 'green' }}>
              {getEmoji(event.title)} {event.title}: ${event.amount}
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
          {`${event.title} - $${event.amount}`}
        </li>
      ));

      setModalContent(
        <div className='bg-orange-300 text-black rounded p-2'>
          <p className='bg-white text-black font-bold flex justify-center rounded p-2'>
            Events for {formatDate(clickedDate, 'MMMM dd, yyyy')}
          </p>
          <ul className='rounded pr-4 pt-4 pb-4'>
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
    NegativeAdd();
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
          <p className='p-2' >{modalContent}</p>
        </Modal>
      </div>
      </div>
      </>
  );
};




};



