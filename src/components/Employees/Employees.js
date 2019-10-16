import React, {Component} from "react";
import deleteIcon from './../../assets/images/delete-icon.png';
import {withRouter} from "react-router-dom";
import './Employees.scss';

class employeesItems extends Component {

    constructor(props) {
        super(props);

        this.createEmployees = this.createEmployees.bind(this);
    }

    deleteEmployee(key) {
        this.props.deleteEmployee(key);
    }

    handleChange(e, id) {
        this.props.updateEmployeeItem(id, e.target.value);
    }

    createEmployees(item, index) {
        return (
            <li
                className="employees-list__item"
                key={item.key}
            ><input
                className="employees-list__item-input"
                value={item.employeeText}
                onChange={(e) => {
                    this.handleChange(e, item.key)
                }}
            />
                <img className="list__item-image"
                     src={deleteIcon}
                     alt='Delete Icon'
                     onClick={() => this.deleteEmployee(item.key)}
                />
            </li>

        );
    }

    render() {
        let key = this.props.currentKey;
        let empployyes = this.props.employess;

        let filteredListItems = empployyes.filter(function (item) {
            return (item.departamentkey === key);
        });

        let listItems = filteredListItems.map((item, index) => this.createEmployees(item, index));

        return (
            <ul
                className="employees-list">
                {listItems}
            </ul>
        );
    }
};

export default withRouter(employeesItems);