import React from "react";
import ReactDOM from "react-dom";
import Section from "./containers/Section"

ReactDOM.render(
    <>
        <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
        </header>
        <Section />
    </>,
    document.getElementById("root")
)
