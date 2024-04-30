import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns'; // For date manipulation
import { useOutletContext } from "react-router-dom";

const getAdjustedDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export default function CalendarChart() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const[isMonthly, setIsMonthly] = useState(false);

  const {
    triggerFetch,
    setTriggerFetch,
    accountList,
    setAccountList,
    budgetList,
    setBudgetList,
    budgetTriggerFetch,
    setBudgetTriggerFetch,
  } = useOutletContext();

  const today = new Date()
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    console.log(`Account list: ${accountList}`)
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    console.log(`Budget list: ${budgetList}`)
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventDateObject = new Date(eventDate + 'T00:00:00');
    const estDate = new Date(eventDateObject.getTime() + (11 * 60 * 60 * 1000))
    const newEvent = {
      id: new Date().getTime(),
      title: eventTitle,
      date: new Date(estDate).toDateString(),
      isMonthly: isMonthly
    };
    console.log(newEvent)
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDate('');
    setIsMonthly(false);
  };


  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      events.filter(event => {
        if (event.isMonthly) {
          return new Date(event.date).getDate() === date; 
        }
      })

      const dayEvents = events.filter(event => event.date === date.toDateString());
      return <ul>{dayEvents.map((event, index) => <li key={index}>{event.title}</li>)}</ul>;
    }
  };

  const isEventToday = () => {
    events.forEach(eve => {
      const eventDate = new Date(eve.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        alert(`You have an event today: ${eve.title}`);
      }
      
    });
  }


  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        maxDate={getAdjustedDate(365 * 6)}
        minDate={getAdjustedDate(-30)}
        calendarType="iso8601"
        className='calendar-style'
        view='month'
        onClickDay={(clickedDate) => {
          const dayEvents = events.filter(event => new Date(event.date).toDateString() === clickedDate.toDateString());
          if (dayEvents.length > 0) {
            alert(dayEvents.map(event => event.title).join("\n"));
          }
        }}
        tileContent={renderTileContent}
      />
      <form onSubmit={handleAddEvent} style={{ marginTop: '20px' }}>
        <input
          className='title'
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />
        <input
        className='title'
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <label>
          <input
          className='title'
          type= "checkbox"
          checked={isMonthly}
          onChange={e => setIsMonthly(e.target.checked)}
          />
          Happens Monthly?
        </label> 
        <button className='button' type="submit">Add Event</button>
      </form>
      <button onClick={isEventToday} className="button" type="submit">Alerts for today</button>

    </div>
  );
}