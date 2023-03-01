import { useState } from "react";
import { monthsObj } from "../../../utils/dateFormating";

export default function MonthPicker({ chosenYear }) {
    const [ monthSelected, setMonthSelected ] = useState(null);
    const today = new Date();
    const currentYear = new Date().getFullYear();
    const allMonths = [];

    for (let i = 0; i <= 11; i++) {
        allMonths.push(monthsObj[i].substring(0, 3));
    }

    const handleSelection = (e) => {
        setMonthSelected(e.target.value);
    }

    console.log("monthSelected ===>", monthSelected);

    return (
        <select
            className="Birthday-dropdown"
            onChange={handleSelection}
            placeholder="Month"
            required
        >
            <option
                value=""
                className="Birthday-dropdown-options"
                disabled
                selected
                hidden
            >
                Month
            </option>
            {
                allMonths.map((month, idx) => (
                    <option
                        key={idx}
                        value={month}
                        className="Birthday-dropdown-options"
                    >
                        {month}
                    </option>
                ))
            }
        </select>
    )
}
