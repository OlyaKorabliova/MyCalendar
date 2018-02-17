import React from "react";
import {render} from "react-dom";
import {splitEvery} from "ramda";

class MyCalendar extends React.Component {
    constructor() {
        super();
        this.today = new Date();
        this.state = {
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            date: this.today.getDate(),         // will change
            todayDate: this.today.getDate(),

            month: this.today.getMonth(),       // will change
            todayMonth: this.today.getMonth(),

            year: this.today.getFullYear(),     // will change
            todayYear: this.today.getFullYear(),
        };
    }

    viewToday(e) {
        e.preventDefault();
        const {todayYear, todayMonth, todayDate} = this.state;
        this.setState({year: todayYear, month: todayMonth, date: todayDate})
    }

    renderDayNames() {
        const {dayNames} = this.state;
        return <div>{dayNames.map(day => <span className={"Calendar__day"}>{day}</span>)}</div>

    }

    renderCalendarHeader() {
        const {months, month, year} = this.state;
        return (
            <form className="Calendar__header">
                <button
                    onClick={this.clickBack.bind(this)}
                    className="Calendar__button Calendar__button_back"
                >
                    left
                </button>
                <span>{months[month]} {year}</span>
                <button
                    onClick={this.clickNext.bind(this)}
                    className="Calendar__button Calendar__button_next"
                >
                    right
                </button>
            </form>
        );
    }

    clickBack(e) {
        e.preventDefault();
        const {month, year} = this.state;
        if (month !== 0) {
            this.setState({
                month: month - 1
            });
        } else {
            this.setState({month: 11, year: year - 1});
        }
    }

    clickNext(e) {
        e.preventDefault();
        const {month, year} = this.state;
        if (month !== 11) {
            this.setState({
                month: month + 1
            });
        } else {
            this.setState({month: 0, year: year + 1});
        }
    }

    calendarModel(startDay = 0) {
        const DAYS_AT_THE_WEEK = 7;
        const {year, month} = this.state;
        const numberOfDays = new Date(year, month + 1, 0).getDate();
        let weekday = (DAYS_AT_THE_WEEK - (startDay - new Date(year, month, startDay).getDay())) % DAYS_AT_THE_WEEK;
        return splitEvery(DAYS_AT_THE_WEEK)([
            ...Array(weekday).fill(),
            ...Array(numberOfDays)
                .fill()
                .map((el, i) => i + 1)
        ]);
    }

    renderCalendar(calendar) {
        const {todayYear, todayMonth, todayDate, month, year} = this.state;
        const firstDayCurMonth = new Date(year, month, 1);   // 1st day of current month
        const lastDayPrevMonth = new Date(year, month, 0);  // last day of previous month
        let firstDayIndex = firstDayCurMonth.getDay();      // index of 1st day in month (0 - 6: Mon - Sun)

        (firstDayIndex === 0) ? firstDayIndex = 6 : firstDayIndex--;

        const lastDate = lastDayPrevMonth.getDate() - firstDayIndex + 1;    // dates of last days in previous month that are visible in calendar view
        let i = -1;

        return calendar.map(row => (
            <div className="Calendar__week">
                {row.map(d => {
                    if (d) {
                        if (todayMonth === month && todayYear === year && d === todayDate) {
                            return <span className="Calendar__date Calendar__date_today">{d}</span>
                        }
                        else {
                            return <span className="Calendar__date">{d}</span>
                        }
                    }
                    else {
                        i++;
                        return <span className={"Calendar__date Calendar__date_disabled"}>{lastDate + i}</span>;
                    }
                })}

            </div>
        ));
    }


    render() {
        const calendarMonth = this.calendarModel();
        return (
            <div className="Calendar">
                {this.renderCalendarHeader()}
                {this.renderDayNames()}
                {this.renderCalendar(calendarMonth)}
                <button className={"Calendar__today"} onClick={this.viewToday.bind(this)}>Today</button>
            </div>
        )
    }
}

render(<MyCalendar/>, document.getElementById("root"));
