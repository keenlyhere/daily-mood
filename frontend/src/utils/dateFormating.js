export const formatDate = (day) => {
    const date = `0${day.getDate()}`.slice(-2);
    const month = `0${day.getMonth() + 1}`.slice(-2);
    const year = day.getFullYear();

    // console.log("YYYY-MM-DD",`${year}-${month}-${date}`);
    return `${year}-${month}-${date}`;
}

export const formatDateHeader = (day) => {
    const today = {};
    today.date = `0${day.getDate()}`.slice(-2);
    today.month = day.toLocaleDateString("default", { month: "long" });
    today.year = day.getFullYear();

    return today;
}

export const monthsObj = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
}

export const monthToNum = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
};
