import React, { Component } from "react";
import Item from "./Item";

class List extends Component {
    render () {
        return (
            <ul className="todo-app__list" id="todo-list">
                {this.props.content.map(
                    (e, index) =>
                    <Item
                        text={e.text} Id={index} key={index}
                        cross={e.cross}
                        deleteItem={this.props.deleteItem}
                        crossOut={this.props.crossOut}
                    />
                )}
            </ul>
        )
    }
}
export default List;