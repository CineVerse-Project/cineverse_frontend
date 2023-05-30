export function getFirstAndLastDayOfMonth() {
    let today = new Date();
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
        firstDay: formatDate(firstDayOfMonth),
        lastDay: formatDate(lastDayOfMonth),
    };
}

export function getLastMonthFirstAndLastDay() {
    let today = new Date();
    let lastMonth;
    if (today.getMonth() === 0) {
        lastMonth = new Date(today.getFullYear() - 1, 11, 1);
    } else {
        lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    }
    let lastDayOfLastMonth = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
    );

    return {
        firstDay: formatDate(lastMonth),
        lastDay: formatDate(lastDayOfLastMonth),
    };
}

export function getCurrentDate() {
    const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const currentDate = `${year}-${month}-${day}`;
        return currentDate;
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
