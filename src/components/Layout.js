import React, {Component} from "react";
import CalendarHeader from "./Calendar-header"
import CalendarBody from "./Calendar-body"
import "../styles/Layout.less";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: this.props.date.getMonth(),
            year: this.props.date.getFullYear()
        };
    }

    render() {
        return <div>
            <CalendarHeader month={this.state.month} year={this.state.year} onChange={v => this.setState(v)}/>
            <CalendarBody month={this.state.month} year={this.state.year}/>
        </div>;
    }

}

export default Layout;