import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout"

ReactDOM.render(<Layout date={new Date()}/>, document.querySelector(".Layout"));