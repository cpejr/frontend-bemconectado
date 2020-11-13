const date = new Date();

function getSundays(month) {
    let currentmonth = month;
    if (typeof (month) === "undefined") {
        currentmonth = date.getMonth();
    }
    let currentyear = date.getFullYear();
    if (month > date.getMonth()) {
        currentyear -= 1;
    }

    var d = new Date(currentyear, currentmonth, 17, 0, 0, 0, 0);
    month = d.getMonth()
    let sundays = [];

    d.setDate(1);

    // Get the first Sunday in the month
    while (d.getDay() !== 0) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Sundays in the month
    while (d.getMonth() === month) {
        sundays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return sundays;
}

function getSundaysUntilToday(month, year) {
    let currentmonth = month;
    if (typeof (month) === "undefined") {
        currentmonth = date.getMonth();
    }

    let currentyear = year;

    if (typeof (year) === "undefined") {
        currentyear = date.getFullYear();
    }

    var d = new Date(currentyear, currentmonth, 17, 0, 0, 0, 0);
    month = d.getMonth()
    let sundays = [];

    d.setDate(1);

    // Get the first Sunday in the month
    while (d.getDay() !== 0) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Sundays in the month
    while (d.getTime() < date.getTime()) {
        sundays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }
    return sundays;
}

export { getSundays, getSundaysUntilToday }