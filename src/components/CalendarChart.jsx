import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../../src/CalendarChart.css"; //Calendar CSS
import { format as formatDate, addDays, addMonths } from "date-fns"; //For date manipulation-----
import { format as formateTz } from "date-fns-tz"; //For time manipulation----
import Modal from "@/components/Modal"; //For the pop up when a date is clicked----

//objData  is a list of Objects
export default function CalendarChart({ objData }) {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [simpObjData, setSimpObjData] = useState([]);
  const [transactionType, setTransactionType] = useState("withdrawal");

  // console.log("datacalchart",objData )

  useEffect(() => {
    const filteredData = objData.filter(
      (account) => account.newTransactionType.toLowerCase() === transactionType
    );
    // console.log(filteredData)
    setSimpObjData(filteredData);
  }, [objData, transactionType]);

  //Breaks down the object and grabs what I need------
  useEffect(() => {
    if (simpObjData.length > 0) {
      const breakDown = simpObjData.map((data) => ({
        title: data.newTransactionName,
        date: addDays(new Date(data.newTransactionDate), 1),
        amount: data.newTransactionAmount,
        monthly: data.monthlyExpense.toLowerCase() === "yes" ? true : false,
        type: data.newTransactionType,
      }));
      setEvents(breakDown);
    }
  }, [simpObjData]);

  //For what appears in the calendar tiles------
  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => {
        return event.monthly //Checks if it is a monthly event-------
          ? date.getDate() === event.date.getDate()
          : formatDate(event.date, "yyyy-MM-dd") ===
              formatDate(date, "yyyy-MM-dd");
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
            <li
              key={index}
              style={{
                color:
                  transactionType.toLowerCase() === "deposit" ? "green" : "red",
              }}
            >
              {getEmoji(event.title)}
              {event.title}: ${event.amount}
            </li>
          ))}
        </ul>
      );
    }
  };

  //For whenever you click on a date -----
  const handleDayClick = (clickedDate) => {
    const dayEvents = events.filter((event) => {
      return event.monthly //Checks if it is a monthly event-------
        ? clickedDate.getDate() === event.date.getDate()
        : formatDate(event.date, "yyyy-MM-dd") ===
            formatDate(clickedDate, "yyyy-MM-dd");
    });

    if (dayEvents.length > 0) {
      const eventsList = dayEvents.map((event, index) => (
        <li className="bg-white p-2  shadow rounded mr-4 mb-2" key={index}>
          {`${event.title} - $${event.amount}`}
        </li>
      ));

      setModalContent(
        <div className="bg-orange-300 text-black rounded p-2">
          <p className="bg-white text-black font-bold flex justify-center rounded p-2">
            Events for {formatDate(clickedDate, "MMMM dd, yyyy")}
          </p>
          <ul className="rounded pr-4 pt-4 pb-4">{eventsList}</ul>
        </div>
      );
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
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
            <p className="p-2">{modalContent}</p>
          </Modal>
        </div>
        <div className="m-2 w-max">
          <button
            className="dbutton"
            onClick={() => setTransactionType("deposit")}
          >
            Deposits
          </button>
          <button
            className="wbutton"
            onClick={() => setTransactionType("withdrawal")}
          >
            Withdrawals
          </button>
        </div>
      </div>
    </>
  );
}
