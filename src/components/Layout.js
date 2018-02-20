import React, {Component} from "react";
// import ReactDOM from "react-dom";
import CalendarHeader from "./Calendar-header"
import CalendarBody from "./Calendar-body"
import RefreshButton from "./Refresh-button"
import "../styles/Layout.less";
import "../styles/Common.less";


class Layout extends Component {
    constructor(props) {
        super(props);
        // const today = this.props.date || new Date();
        // const calendarModel = this.createCalendarModel();
        this.state = {
            // date: this.props.date,
            // calendar: calendarModel,
            // today: today.getDate()
        };
    }

    render() {
        console.log(this.props.date);
        return <div>
            <CalendarHeader date={this.props.date}/>
            <CalendarBody date={this.props.date}/>
            <RefreshButton date={new Date()}/>
        </div>;
    }
}

// ReactDOM.render(<Layout date={new Date()}/>, document.querySelector(".Layout"));

export default Layout;