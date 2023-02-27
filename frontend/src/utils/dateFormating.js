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
