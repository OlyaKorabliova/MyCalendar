import React, {Component} from "react";
import "../styles/Calendar-header.less";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class CalendarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: this.props.month,
            year: this.props.year
        }
    }

    render() {
        const {month, year} = this.state;
        return (
            <form className="Calendar-header">
                <button
                    onClick={this.clickBack.bind(this)}
                    className="Calendar-header__button Calendar-header__button_back"
                >
                    left
                </button>

                <span>{months[month]} {year}</span>

                <button
                    onClick={this.clickNext.bind(this)}
                    className="Calendar-header__button Calendar-header__button_next"
                >
                    right
                </button>
            </form>
        );
    }

    clickBack(e) {
        e.preventDefault();
        this.changeCalendarHeader(0, 11, -1)
    }

    clickNext(e) {
        e.preventDefault();
        this.changeCalendarHeader(11, 0, 1)
    }

    changeCalendarHeader(ifValue, newMonthValue, move) {
        let tempState = this.state;
        if (tempState.month !== ifValue)
            tempState.month += move;
        else {
            tempState.month = newMonthValue;
            tempState.year += move;
        }
        this.setState(tempState);
        this.props.onChange(tempState);

    }


}

export default CalendarHeader;