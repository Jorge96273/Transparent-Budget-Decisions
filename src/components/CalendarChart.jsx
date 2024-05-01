import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../../src/CalendarChart.css";
import { format as formatDate, addDays, addMonths } from "date-fns";
import { format as formateTz } from "date-fns-tz";
import Modal from "@/components/Modal";

export default function CalendarChart({ sampleData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const breakDown = sampleData.map((data) => ({
      title: data.transactionName,
      date: addDays(new Date(data.transactionDate), 1),
      amount: data.transactionAmount,
    }));
    setEvents(breakDown);
  }, [sampleData]);

  console.log("eevee", events);

  const renderTileContent = ({ date, view }) => {
    console.log("renderTileContent");
    console.log("BEFORE RENDER", events);
    if (view === "month") {
      const dayEvents = events.filter(
        (event) =>
          formatDate(event.date, "yyyy-MM-dd") ===
          formatDate(date, "yyyy-MM-dd")
      );
      console.log("AFTER RENDER", events);
      return (
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul>
      );
    }
  };

  const handleDayClick = (clickedDate) => {
    console.log("handleDayClick");
    const dayEvents = events.filter(
      (event) =>
        formatDate(event.date, "yyyy-MM-dd") ===
        formatDate(clickedDate, "yyyy-MM-dd")
    );
    if (dayEvents.length > 0) {
      setModalContent(
        `Events for ${formatDate(clickedDate, "MMM dd")}: \n\n` +
          dayEvents.map((event) => event.title).join("\n")
      );
      setIsOpen(true);
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
}

// const handleAddEvent = (e) => {
//   e.preventDefault();
//   const eventDateObject = new Date(eventDate + 'T00:00:00');
//   const estDate = new Date(eventDateObject.getTime() + (11 * 60 * 60 * 1000))
//   const newEvent = {
//     id: new Date().getTime(),
//     title: eventTitle,
//     date: new Date(estDate).toDateString(),
//     isMonthly: isMonthly
//   };
//   console.log(newEvent)
//   setEvents([...events, newEvent]);
//   setEventTitle('');
//   setEventDate('');
//   setIsMonthly(false);
// };

// const isEventToday = () => {
//   events.forEach(eve => {
//     const eventDate = new Date(eve.date);
//     eventDate.setHours(0, 0, 0, 0);

//     if (eventDate.getTime() === today.getTime()) {
//       alert(`You have an event today: ${eve.title}`);
//     }

//   });
// }

// <form onSubmit={handleAddEvent} style={{ marginTop: '20px' }}>
//         <input
//           className='title'
//           type="text"
//           placeholder="Event Title"
//           value={eventTitle}
//           onChange={(e) => setEventTitle(e.target.value)}
//           required
//         />
//         <input
//         className='title'
//           type="date"
//           value={eventDate}
//           onChange={(e) => setEventDate(e.target.value)}
//           required
//         />
//         <label>
//           <input
//           className='title'
//           type= "checkbox"
//           checked={isMonthly}
//           onChange={e => setIsMonthly(e.target.checked)}
//           />
//           Happens Monthly?
//         </label>
//         <button className='button' type="submit">Add Event</button>
//       </form>
//       <button onClick={isEventToday} className="button" type="submit">Alerts for today</button>
