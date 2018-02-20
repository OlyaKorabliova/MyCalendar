import React, {Component} from "react";
// import ReactDOM from "react-dom";
import "../styles/Calendar-body.less";
import {splitEvery} from "ramda";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

class CalendarBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date.getDate(),
            month: this.props.date.getMonth(),
            year: this.props.date.getFullYear(),
            // calendar: this.createCalendarModel()
        };
    }

    render() {
        return <div className={"Calendar-body"}>
            {this.viewDayNames()}
            {this.renderCalendarBody()}
        </div>
    }

    viewDayNames() {
        return <div>{dayNames.map(day => <span className={"Calendar-body__day-name"}>{day}</span>)}</div>
    }

    createCalendarModel() {
        const {month, year} = this.state;
        // const {date} = this.props;
        // const month = date.getMonth();
        // const year = date.getFullYear();
        const numOfDays = new Date(year, month + 1, 0).getDate();       // num of days in cur month Feb 2018
        const firstDay = new Date(year, month, 1).getDay() || 7;       // Feb 2018 - 4 - THURSDAY
        const lastDatePrevM = new Date(year, month, 0).getDate();     // last date of previous month
        const DAYS_AT_WEEK = 7;
        let a = [];
        let startDay = lastDatePrevM - firstDay + 2;
        const nextDays = 7 - (firstDay + numOfDays - 1) % 7;

        for (let i = 0; i < firstDay - 1; i++) {        // adding last days of previous month
            a.push([startDay, "Calendar-body__date_disabled"]);
            startDay++;
        }
        const today = new Date();
        for (let i = 1; i <= numOfDays; i++) {          // adding days of current month
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                a.push([i, "Calendar-body__date_today"]);
            }
            else {
                a.push([i, ""]);
            }
        }
        for (let i = 1; i <= nextDays; i++) {           // adding first days of next month
            a.push([i, "Calendar-body__date_disabled"]);
        }

        return splitEvery(DAYS_AT_WEEK, a);
    }
    //
    renderCalendarBody() {
        // const {calendar} = this.state;
        let calendar = this.createCalendarModel();
        return <div className={"Calendar-body__month"}>
            {calendar.map(w =>
                <div className={"Calendar-body__week"}>
                    {w.map(d => <span className={`Calendar-body__date ${d[1]}`}>{d[0] + "  "}</span>)}
                </div>)
            }
        </div>;
    }

}

// ReactDOM.render(<CalendarBody date={new Date(2019, 1)}/>, document.querySelector(".Layout"));
//
export default CalendarBody;