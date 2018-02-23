import React, {Component} from "react";
import "../styles/Calendar-body.less";
import {splitEvery} from "ramda";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_AT_WEEK = 7;
const today = new Date();

class CalendarBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar: this.createCalendarModel(props)
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props !== newProps) {
            this.setState({
                calendar: this.createCalendarModel(newProps)
            })
        }
    }

    viewDayNames() {
        return <div>{dayNames.map((day, i) => <span key={i} className={"Calendar-body__day-name"}>{day}</span>)}</div>
    }

    createCalendarModel({month, year}) {
        const numOfDays = new Date(year, month + 1, 0).getDate();       // num of days in cur month
        const firstDay = new Date(year, month, 1).getDay() || 7;       // day of 1st of current month
        const lastDatePrevM = new Date(year, month, 0).getDate();     // last date of previous month
        const nextDays = 7 - (firstDay + numOfDays - 1) % 7;

        const prevMonth = Array(firstDay - 1).fill(0).map((el, i) => [lastDatePrevM - i, "Calendar-body__date_disabled"]).sort((a, b) => {return a[0] > b[0]});
        const curMonth = Array(numOfDays).fill(0).map((el, i) => (i + 1 === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? [i + 1, "Calendar-body__date_today"] : [i + 1, ""]);
        const nextMonth = Array(nextDays).fill(0).map((el, i) => [i + 1, "Calendar-body__date_disabled"]);

        let arr = [...prevMonth, ...curMonth, ...nextMonth];

        return splitEvery(DAYS_AT_WEEK, arr);
    }

    renderCalendarBody() {
        const {calendar} = this.state;
        return <div className={"Calendar-body__month"}>
            {calendar.map((w, i) =>
                <div key={i.toString()} className={"Calendar-body__week"}>
                    {w.map((d, i) =>
                        <time key={i.toString()} className={`Calendar-body__date ${d[1]}`}>{d[0]}</time>)
                    }
                </div>)
            }
        </div>;
    }

    render() {
        return <div className={"Calendar-body"}>
            {this.viewDayNames()}
            {this.renderCalendarBody()}
        </div>
    }

}

export default CalendarBody;