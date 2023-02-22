const formatDate = (day) => {
    const date = `0${day.getDate()}`.slice(-2);
    const month = `0${day.getMonth() + 1}`.slice(-2);
    const year = day.getFullYear();

    // console.log("YYYY-MM-DD",`${year}-${month}-${date}`);
    return `${year}-${month}-${date}`;
}

module.exports = {
    formatDate
}
