import React, {Component} from 'react';
import {
    addEmployeeItem, deleteEmployee, updateEmployeeItem,
} from "../../redux/departmets-reducer";
import connect from "react-redux/es/connect/connect";
import Employees from "../Employees/Employees";
import './EmployeesContainer.scss';

class EmployeesContainer extends Component {

    render() {

        let addEmployeeItem = (e) => {
            e.preventDefault();
            let key = Date.now();
            this.props.addEmployeeItem(key, this._inputElement.value);
            this._inputElement.value = '';

        }

        return (
                <div className="employees">
                    <div className="employees__title">Список сотрудников департамента {this.props.name}</div>
                    <div className="employees__container">
                        <div className="employees__list-container">
                            <form onSubmit={addEmployeeItem} className="employees__form">
                                <input className="employees__input"
                                       ref={(a) => this._inputElement = a}
                                       placeholder="Введите имя сотрудника департамента">
                                </input>
                            </form>

                            <Employees
                                employess={this.props.employess}
                                setCurrentUrl={this.props.setCurrentUrl}
                                name={this.props.name}
                                currentKey={this.props.currentKey}
                                deleteEmployee={this.props.deleteEmployee}
                                updateEmployeeItem={this.props.updateEmployeeItem}
                            />
                        </div>
                    </div>
                </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsPage.departments,
        employess: state.departmentsPage.employess,
        name: state.departmentsPage.currentUrl,
        currentKey: state.departmentsPage.currentKey
    }
}

export default connect(mapStateToProps, {addEmployeeItem, deleteEmployee, updateEmployeeItem})(EmployeesContainer);

