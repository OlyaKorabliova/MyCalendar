import React, {Component} from "react";
// import ReactDOM from "react-dom";
import "../styles/Calendar-header.less";

const months = [
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
];

class CalendarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date.getDate(),
            month: this.props.date.getMonth(),
            year: this.props.date.getFullYear()
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
        const {month, year} = this.state;
        (month !== 0) ? this.setState({month: month - 1}) : this.setState({month: 11, year: year - 1});
    }

    clickNext(e) {
        e.preventDefault();
        const {month, year} = this.state;
        (month !== 11) ? this.setState({month: month + 1}) : this.setState({month: 0, year: year + 1});
    }

}

// ReactDOM.render(<CalendarHeader date={new Date()}/>, document.querySelector(".Layout"));
//
export default CalendarHeader;