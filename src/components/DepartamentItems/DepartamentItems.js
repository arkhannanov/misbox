import React, {Component} from "react";
import './DepartamentItems.scss';
import deleteIcon from './../../assets/images/delete-icon.png';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from "react-beautiful-dnd";
import "./DepartamentItems.scss";
import history from '../../history';
import {NavLink} from "react-router-dom";

class DepartamentItems extends Component {

    constructor(props) {
        super(props);

        this.createDepartments = this.createDepartments.bind(this);
    }

    doubleClick(e, url, id) {
        this.props.setCurrentUrl(e.target.value, id);
        history.push(url);
    }

    delete(key, text) {
        this.props.delete(key, text);
    }

    handleChange(e, id) {
        this.props.update(id, e.target.value);
        this.props.setCurrentUrl(e.target.value, id);
    }

    createDepartments(item, index) {
        let url = `/departments/${item.text}/employees`;
        return (
            <Draggable
                key={item.key}
                draggableId={item.key}
                index={index}>
                {provided => (
                    <NavLink to={url}>
                        <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="list__item"
                            key={item.key}

                        ><input
                            className="list__item-input"
                            value={item.text}
                            onChange={(e) => {
                                this.handleChange(e, item.key)
                            }}
                            onDoubleClick={(e) => {
                                this.doubleClick(e, url, item.key)
                            }}
                        />
                            <img className="list__item-image"
                                 src={deleteIcon}
                                 alt='Delete Icon'
                                 onClick={() => this.delete(item.key, item.text)}
                            />
                        </li>
                    </NavLink>
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