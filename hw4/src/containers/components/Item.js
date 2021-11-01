import React, { Component } from "react";
import x from "./x.png"
const checked_style = {
    textDecoration: "line-through",
    opacity: 0.5
}

class Item extends Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: {}
        };
    }
    handleDelete = () => {
        this.props.deleteItem(this.props.Id);
    }
    handleChecked = () => {
        this.props.crossOut(this.props.Id);
        let target = document.getElementById(this.props.Id);
        // cross out locally
        if (target.checked) {
            this.setState({
                checked: checked_style
            });
        } else {
            this.setState({
                checked: {}
            });
        }
    }
    render () {
        let my_style = {};
        if (this.props.cross === true){
            my_style = checked_style;
        }
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input
                        type="checkbox" id={this.props.Id}
                        onChange={this.handleChecked}
                        checked={this.props.cross}
                    />
                    <label htmlFor={this.props.Id} />
                </div>
                <h1 className="todo-app__item-detail"
                    style={my_style}>
                    {this.props.text}
                </h1>
                <img src={x} className="todo-app__item-x"
                     onClick={this.handleDelete} alt="x"/>
            </li>
        )
    }
}

export default Item;