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

    render() {
        const calendarMonth = this.calendar();
        return (
            <div className="Calendar">
                {this.renderCalendarHeader()}
                {this.renderDays()}
                {this.renderCalendar(calendarMonth)}
            </div>
        )
    }

    renderDays() {
        const {dayNames} = this.state;
        return <div>
            {dayNames.map(day => <span className={"Calendar__day"}>{day}</span>)}
        </div>

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

    calendar(startDay = 0) {
        const DAYS_AT_THE_WEEK = 7;
        const {year, month} = this.state;
        const numberOfDays = new Date(year, month + 1, 0).getDate();
        let weekday =
            (DAYS_AT_THE_WEEK -
                (startDay - new Date(year, month, startDay).getDay())) %
            DAYS_AT_THE_WEEK;
        return splitEvery(DAYS_AT_THE_WEEK)([
            ...Array(weekday).fill(),
            ...Array(numberOfDays)
                .fill()
                .map((el, i) => i + 1)
        ]);
    }

    renderCalendar(calendar) {
        const {todayYear, todayMonth, todayDate, month} = this.state;
        const today = new Date(todayYear, todayMonth, todayDate);
        return calendar.map(row => (
            <div className="Calendar__week">
                {row.map( d =>
                    (today.getMonth() === month && d === today.getDate()) ?
                        <span className="Calendar__date Calendar__date_today">{d}</span>
                        :
                        ( (d) ?
                            <span className="Calendar__date">{d}</span>
                            :
                            <span className="Calendar__date Calendar__date_disabled">{"-"}</span> )
                        )
                }
            </div>
        ));
    }
}

render(<MyCalendar/>, document.getElementById("root"));
