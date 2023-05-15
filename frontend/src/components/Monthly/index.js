import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMonthlyMoods, loadSpecificMoods } from "../../store/dayentries";
import "./Monthly.css";
import cow_ecstatic from "../../assets/cow_ecstatic.png";
import cow_happy from "../../assets/cow_happy.png";
import cow_content from "../../assets/cow_content.png";
import cow_meh from "../../assets/cow_meh.png";
import cow_sad from "../../assets/cow_sad.png";
import { useHistory } from "react-router-dom";

export default function Monthly() {
    const dispatch = useDispatch();
    const history = useHistory();
    const today = new Date();
    const todaysDate = today.getDate();
    const todaysMonth = today.getMonth();
    const todaysYear = today.getFullYear();
    // console.log("todaysMonth ===>", todaysMonth);

    const moodImages = {
        "Meh": cow_meh,
        "Sad": cow_sad,
        "Content": cow_content,
        "Happy": cow_happy,
        "Ecstatic": cow_ecstatic
    }

    const [currentDate, setCurrentDate] = useState(today);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const userMoods = useSelector(state => state.day.monthlyMoods);
    const [ filter, setFilter ] = useState(null);

    // console.log("currentDate", currentDate);

    useEffect(() => {
        // console.log("filter ===>", filter)
        dispatch(loadMonthlyMoods(currentDate.getFullYear(), currentDate.getMonth(), filter))
            .then(() => setIsLoaded(true));
    }, [dispatch, currentDate, filter])

    const getAllDatesInMonth = () => {
        const numDaysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        // console.log("numDaysInMonth ===>", numDaysInMonth);

        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        // the day of the week that the month starts on
        // i.e. march 1st is on wednesday
        // console.log("firstDayOfMonth ===>", firstDayOfMonth);

        const daysInMonth = [];

        // sun - mon is part of feb, so put null at the beginning of the month to account for that
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysInMonth.push(null);
        }

        for (let i = 1; i <= numDaysInMonth; i++) {
            daysInMonth.push(i);
        }

        // console.log("daysInMonth ===>", daysInMonth);

        return daysInMonth;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleFilter = (queriedMood) => {
        // dispatch(loadSpecificMoods(currentDate.getFullYear(), currentDate.getMonth(), queriedMood));
        setFilter(queriedMood);
    }

    const isDateInPast = (date) => {
        const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);

        if (day.getFullYear() === today.getFullYear()
            && day.getMonth() === today.getMonth()
            && day.getDate() === today.getDate()
        ) return false;
        return day.getTime() < today.getTime();
    }

    const isDateInFuture = (date) => {
        const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);

        if (day.getFullYear() === today.getFullYear()
            && day.getMonth() === today.getMonth()
            && day.getDate() === today.getDate()
        ) return false;
        return day.getTime() > today.getTime();
    }

  const dates = getAllDatesInMonth();

    if (isLoaded) {
        return (
            <div className="Monthly-container">
                <div className="Monthly-calendar-container">
                    <div className="Monthly-calendar-month-header">
                        <button
                            className="Monthly-button-change"
                            onClick={handlePrevMonth}
                        >
                            <i class="fa-solid fa-angle-left"></i>
                        </button>
                        <h1 className="Monthly-calendar-month" data-content={`${currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}>{currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</h1>
                        <button
                            className="Monthly-button-change"
                            onClick={handleNextMonth}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                    <div className="Monthly-calendar-main-container">
                        { ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                        <div
                            key={idx}
                            className="Monthly-calendar-day-name"
                        >
                            {day}
                        </div>
                        )) }
                        { dates.map((date, idx) => (
                            <div key={idx} className={date ? 'day' : 'empty'}>
                                <div className={`Date-container ${todaysDate === date && todaysMonth === currentDate.getMonth() && todaysYear === currentDate.getFullYear() ? "todaysDate" : "" }`}>
                                    {date}
                                </div>
                                {
                                    userMoods[date] ? (
                                        <img
                                            src={moodImages[userMoods[date].entryData]}
                                            className="Mood-image clickable"
                                            onClick={() => history.push(`/day/${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`)}
                                            alt="User mood image"
                                        />
                                    ) : (
                                        <button
                                            className={`
                                                Mood-container
                                                ${isDateInPast(date) ? "pastDate clickable" : "" }
                                                ${isDateInFuture(date) ? "futureDate" : "" }
                                                ${todaysDate === date && todaysMonth === currentDate.getMonth() && todaysYear === currentDate.getFullYear() ? "pastDate clickable" : ""}
                                                ${date === null ? "empty" : "" }
                                            `}
                                            onClick={() => history.push(`/day/${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${date}`)}
                                            disabled={isDateInFuture(date) ? true : false}
                                        >

                                        </button>

                                    )
                                }
                            </div>
                        )) }
                    </div>
                    <div className="Monthly-calendar-filter-container">
                        <div className="Monthly-calendar-filter-header">
                            When did I record...
                        </div>
                        <div className="Monthly-calendar-filter-moods">
                            <img src={cow_ecstatic} className="Mood-image clickable" alt="Ecstatic mood" onClick={() => handleFilter("Ecstatic")} />
                            <img src={cow_happy} className="Mood-image clickable" alt="Happy mood" onClick={() => handleFilter("Happy")} />
                            <img src={cow_content} className="Mood-image clickable" alt="Content mood" onClick={() => handleFilter("Content")} />
                            <img src={cow_meh} className="Mood-image clickable" alt="Meh mood" onClick={() => handleFilter("Meh")} />
                            <img src={cow_sad} className="Mood-image clickable" alt="Sad mood" onClick={() => handleFilter("Sad")} />
                        </div>
                        <button className="Monthly-calendar-filter-reset" onClick={() => handleFilter(null)}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="App-container">
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                    Moo-ving towards a better mood...
            </div>
        )
    }

};
