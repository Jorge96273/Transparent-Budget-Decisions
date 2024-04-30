import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../src/CalendarChart.css';

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
  const [message, setMessage] = useState([]);

  const today = new Date()
  today.setHours(0,0,0,0);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventDateObject = new Date(eventDate + 'T00:00:00');
    const estDate = new Date(eventDateObject.getTime() + (11 * 60 * 60 * 1000))
    const newEvent = {
      date: new Date(estDate).toDateString(),
      title: eventTitle
    };
    console.log(newEvent)
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDate('');
  };

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
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

  useEffect(() => {
    isEventToday()
  }, [message]);

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        maxDate={getAdjustedDate(365 * 6)} 
        minDate={getAdjustedDate(-30)} 
        calendarType="iso8601"
        className='calendar-style'
        defaultView='month'
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
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
      <button class="button" type="submit">Click for alerts for today</button>

    </div>
  );
}