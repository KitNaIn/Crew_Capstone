function getCalendarDays(date: Date): (Date | null)[][] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendarDays: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
        week.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(year, month, day);
        week.push(currentDate);

        if (week.length === 7) {
            calendarDays.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        calendarDays.push(week);
    }

    return calendarDays;
}

export default getCalendarDays;