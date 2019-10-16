import React, {Component} from 'react';
import DepartamentItems from '../DepartamentItems/DepartamentItems';
import {DragDropContext} from 'react-beautiful-dnd';
import {
    addItem,
    deleteItem,
    handleDragAndDrop, setCurrentUrl, updateItem,
} from "../../redux/departmets-reducer";
import connect from "react-redux/es/connect/connect";
import "./DepartamentsContainer.scss";

class DepartametsContainer extends Component {

    onDragEnd = result => {

        this.props.handleDragAndDrop(result);
    }

    render() {

        let addItem = (e) => {
            let key = Date.now();
            this.props.addItem(key, this._inputElement.value);
            this._inputElement.value = '';
            e.preventDefault();
        }


        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="departaments">
                    <div className="departaments__title">Введите название департамента</div>
                    <div className="departaments__container">
                        <div className="departaments__list-container">
                            <form onSubmit={addItem} className="departaments__form">
                                <input className="departaments__input"
                                       ref={(a) => this._inputElement = a}
                                       placeholder="Введите название департамента">
                                </input>
                            </form>

                            <DepartamentItems
                                departamets={this.props.departments}
                                delete={this.props.deleteItem}
                                update={this.props.updateItem}
                                setCurrentUrl={this.props.setCurrentUrl}
                            />
                        </div>
                    </div>
                </div>
            </DragDropContext>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        departments: state.departmentsPage.departments,
    }
}

export default connect(mapStateToProps, {addItem, deleteItem, handleDragAndDrop, updateItem, setCurrentUrl})(DepartametsContainer);

