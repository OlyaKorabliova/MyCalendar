import React, {Component} from "react";
// import ReactDOM from "react-dom";
import "../styles/Refresh-button.less";

class RefreshButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            month: this.props.date.getMonth(),
            year: this.props.date.getFullYear()
        }
    }

    render() {
        return <button className={"Refresh-button"} onClick={this.viewToday.bind(this)}>Today</button>;
    }

    viewToday(e) {
        e.preventDefault();
        let newDate = new Date();
        this.setState({year: newDate.getFullYear(), month: newDate.getMonth(), date: newDate.getDate()});
    }
}

// ReactDOM.render(<RefreshButton date={new Date()}/>, document.querySelector(".Layout"));

export default RefreshButton;