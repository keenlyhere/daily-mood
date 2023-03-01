import { useState } from "react";

export default function YearPicker() {
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const [ yearSelected, setYearSelected ] = useState(null);
    // const [ isDisabled, setIsDisabled ] = useState(true);

    const allYears = [];

    if (startYear <= endYear) {
        for (let i = startYear; i <= endYear; i++) {
            allYears.push(i);
        }
    }

    const handleSelection = (e) => {
        setYearSelected(e.target.value);
    }

    return (
        <select
            className="Birthday-dropdown"
            required={true}
            onClick={handleSelection}
        >
            {
                allYears.reverse().map((year, idx) => (
                    <option
                        key={idx}
                        value={year}
                        className="Birthday-dropdown-options"
                    >
                        {year}
                    </option>
                ))
            }
        </select>
    )
}
