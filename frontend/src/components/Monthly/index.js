import { useState } from "react";
import {monthsObj} from "../../utils/dateFormating";

export default function Monthly() {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(today);

    const getAllDatesInMonth = () => {
        const numDaysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        console.log("daysInMonth ===>", numDaysInMonth);

        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        console.log("firstDayOfMonth ===>", firstDayOfMonth);

        const daysInMonth = [];

        for (let i = 1; i <= numDaysInMonth; i++) {
            daysInMonth.push(i);
        }

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysInMonth.unshift(null);
        }

        console.log("daysInMonth ===>", daysInMonth);

        return daysInMonth;
    };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const dates = getAllDatesInMonth();

  console.log("DATES ===> \n", dates)

  return (
    <div>
      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <div>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
        {dates.map((date, idx) => (
          <div key={idx} className={date ? 'day' : 'empty'}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};
