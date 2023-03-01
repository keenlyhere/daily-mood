// import { useState } from "react";

export default function DayPicker({ chosenYear, chosenMonth }) {
    let days = chosenMonth ? getDaysInMonth(chosenYear, chosenMonth) : 31;

    const today = new Date();

    
}
