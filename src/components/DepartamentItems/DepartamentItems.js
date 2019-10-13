import React, {Component} from "react";
import './DepartamentItems.scss';
import deleteIcon from './../../assets/images/delete-icon.png';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from "react-beautiful-dnd";
import "./DepartamentItems.scss";

class DepartamentItems extends Component {

    constructor(props) {
        super(props);

        this.createDepartments = this.createDepartments.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    handleChange(e,id){
        this.props.update(id,e.target.value);
}

    createDepartments(item, index) {
        return (
            <Draggable
                key={item.key}
                draggableId={item.key}
                index={index}>
                {provided => (
                    <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="list__item"
                        key={item.key}

                    ><input
                        className="list__item-input"
                        value={item.text}
                        onChange={(e) => {this.handleChange(e, item.key)}}
                    />
                        <img className="list__item-image"
                             src={deleteIcon}
                             alt='Delete Icon'
                             onClick={() => this.delete(item.key)}
                        />
                    </li>
                )}
            </Draggable>
        );
    }

    render() {
        let departments = this.props.departamets;
        let listItems = departments.map((item, index) => this.createDepartments(item, index));

        return (
            <Droppable droppableId='DepartamentsItems'>
                {provided => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.dropppableProps}
                        className="list">
                        {listItems}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        );
    }
};

export default DepartamentItems;