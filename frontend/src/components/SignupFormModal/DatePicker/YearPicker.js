export default function YearPicker() {
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    const [ yearSelected, setYearSelected ] = useState(null);
    const [ isDisabled, setIsDisabled ] = useState(true);

    const allYears = [];

    if (startYear <= endYear) {
        for (let i = startYear; i <= endYear; i++) {
            allYears.push(i);
        }
    }

    const handleSelection = (e) => {
        yearSelected(e.target.value);
        setIsDisabled(false);

    }

    return (
        <select
            className="Birthday-dropdown"
            required={true}
            disabled={isDisabled ? true : false}

        >
            {
                allYears.map((year, idx) => (
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
