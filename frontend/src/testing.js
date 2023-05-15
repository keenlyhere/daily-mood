// import { useState } from "react";
// import DayPicker from "./components/SignupFormModal/DatePicker/DayPicker";
// import MonthPicker from "./components/SignupFormModal/DatePicker/MonthPicker";
// import YearPicker from "./components/SignupFormModal/DatePicker/YearPicker";
// import { monthToNum } from "./utils/dateFormating";

// export default function Testing() {
//     // const [ chosenYear, setChosenYear ] = useState(null);
//     // const [ chosenMonth, setChosenMonth ] = useState(null);
//     // const [ chosenDay, setChosenDay ] = useState(null);
//     const [year, setYear] = useState("");
//     const [month, setMonth] = useState("");
//     const [day, setDay] = useState("");

//     const handleYearChange = (selectedYear) => {
//         setYear(selectedYear);
//         // setChosenYear(selectedYear);
//     };

//     const handleMonthChange = (selectedMonth) => {
//         setMonth(selectedMonth);
//         // setChosenMonth(selectedMonth);
//     };

//     const handleDayChange = (selectedDay) => {
//         setDay(selectedDay);
//         // setChosenDay(selectedDay);
//     };

//     "selectedYear ==>", year;
//     // console.log("selectedMonth ==>", month);
//     // console.log("selectedDay ==>", day);
//     // console.log("FULL DAY ==>", new Date(year, monthToNum[month] - 1, day));

//     return (
//         <div className="Testing-container">
//             <YearPicker chosenYear={year} onChange={handleYearChange} />
//             <MonthPicker chosenMonth={month} chosenYear={year} onChange={handleMonthChange} />
//             <DayPicker chosenDay={day} chosenYear={year} chosenMonth={month} onChange={handleDayChange} />
//         </div>
//     );
// }
