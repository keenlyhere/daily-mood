import { useState } from "react";
import { getDaysInMonth, monthToNum } from "../../../utils/dateFormating";

export default function DayPicker({ chosenYear, chosenMonth, onChange }) {
    const [ daySelected, setDaySelected ] = useState(null)
    let days = chosenMonth ? getDaysInMonth(chosenYear, monthToNum[chosenMonth]) : 31;

    const today = new Date();

    const daysInMonth = [];

    for (let i = 1; i <= days; i++) {
        daysInMonth.push(i);
    }

    const handleSelection = (e) => {
        setDaySelected(e.target.value);
        onChange(e.target.value);
    }

    return (
        <select
            className="Birthday-dropdown"
            onChange={handleSelection}
            placeholder="Day"
            defaultValue="Day"
            required
        >
            <option
                value="Day"
                className="Birthday-dropdown-options"
                disabled
                hidden
            >
                Day
            </option>
            {
                daysInMonth.map((day) => (
                    <option
                        key={day}
                        value={day}
                        className="Birthday-dropdown-options"
                    >
                        {day}
                    </option>
                ))
            }
        </select>
    )

}
