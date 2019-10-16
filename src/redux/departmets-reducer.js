const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const HANDLE_DRAG_AND_DROP = 'HANDLE_DRAG_AND_DROP';
const UPDATE_ITEM = 'UPDATE_ITEM';
const SET_CURRENT_URL_AND_KEY = 'SET_CURRENT_URL_AND_KEY';
const ADD_EMPLOYEE_ITEM = 'ADD_EMPLOYEE_ITEM';
const DELETE_EMMLOYEE = 'DELETE_EMMLOYEE';
const UPDATE_EMPLOYEE_ITEM = 'UPDATE_EMPLOYEE_ITEM';

let initialState = {
    departments: [],
    employess: [],
    currentUrl: null,
    currentKey: null
};

const departmetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            let content = action.content;
            let keyIndex = action.key;
            return {
                ...state,
                departments: [...state.departments, {key: keyIndex, text: content}]
            };
        case DELETE_ITEM:
            let key = action.key;
            let filteredItems = state.departments.filter(function (item) {
                return (item.key !== key);
            });
            let filteredEmployees = state.employess.filter(function (item) {
                return (item.departamentkey !== key);
            })

            return {
                ...state,
                departments: filteredItems,
                employess: filteredEmployees,
                currentUrl: null,
                currentKey: null
            };
        case DELETE_EMMLOYEE:
            let newEmployeeKey = action.key;
            let newFilteredEmployees = state.employess.filter(function (item) {
                return (item.key !== newEmployeeKey);
            })

            return {
                ...state,
                employess: newFilteredEmployees,
            };
        case UPDATE_ITEM:
            let itemKey = action.key;
            let newText = action.text;
            let itemIndex = state.departments.findIndex(el => el.key === itemKey);
            let updatedArray = [];
            let newArray = [];

        function getAllIndexes(arr, val) {
            var indexes = [], i;
            for (i = 0; i < arr.length; i++)
                if (arr[i].text === val)
                    indexes.push(i);
            return indexes;
        }

            let indexes = getAllIndexes(state.employess, state.currentUrl);

            for (let i = 0; i < state.employess.length; i += 1) {
                updatedArray[i] = state.employess[i];
            }


            for (let i = 0; i < indexes.length; i++) {
                updatedArray[indexes[i]] = {
                    text: newText,
                    departamentkey: itemKey,
                    key: state.employess[i].key,
                    employeeText: state.employess[i].employeeText
                }
            }

            for (let i = 0; i < state.departments.length; i += 1) {
                if (i === itemIndex) {
                    state.departments[i] = {
                        key: itemKey,
                        text: newText,
                    }
                }
                newArray[i] = state.departments[i];
            }
            return {
                ...state,
                departments: newArray,
                employess: updatedArray
            };
        case UPDATE_EMPLOYEE_ITEM:
            let udtatedEmployeeKey = action.key;
            let udtatedEmployeeText = action.text;
            let udtatedEmployeeItemIndex = state.employess.findIndex(el => el.key === udtatedEmployeeKey);
            let newUpdatedEmployeeArray = [];

            for (let i = 0; i < state.employess.length; i += 1) {
                if (i === udtatedEmployeeItemIndex) {
                    state.employess[i] = {
                        text: state.employess[i].text,
                        departamentkey: state.employess[i].departamentkey,
                        key: udtatedEmployeeKey,
                        employeeText: udtatedEmployeeText,
                    }
                }
                newUpdatedEmployeeArray[i] = state.employess[i];
            }
            return {
                ...state,
                employess: newUpdatedEmployeeArray
            };
        case ADD_EMPLOYEE_ITEM:
            let departmentText = state.currentUrl;
            let departamentkey = state.currentKey;
            let employeeKey = action.employeeKey;
            let employeeText = action.text;

            return {
                ...state,
                employess: [...state.employess, {
                    text: departmentText,
                    departamentkey: departamentkey,
                    key: employeeKey,
                    employeeText: employeeText
                }]
            };
        case HANDLE_DRAG_AND_DROP:
            const {destination, source, draggableId} = action.result;
            if (!destination) {
                return state;
            }
            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return state;
            }
            const newItemIds = [];
            for (let i = 0; i < state.departments.length; i += 1) {
                newItemIds[i] = state.departments[i].key;
            }

            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const itemIds = newItemIds;
            const newItems = [];


            for (let i = 0; i < itemIds.length; i += 1) {
                let searchKey = itemIds[i];
                let itemIndex = state.departments.findIndex(el => el.key === searchKey);
                newItems[i] = state.departments[itemIndex];
            }
            return {
                ...state,
                departments: newItems
            };
        case SET_CURRENT_URL_AND_KEY:
            let url = action.text;
            let currentKey = action.key;

            return {
                ...state,
                currentUrl: url,
                currentKey: currentKey
            };
        default:
            return state;
    }
}

export const addItem = (key, content) => ({type: ADD_ITEM, key, content});
export const deleteItem = (key, text) => ({type: DELETE_ITEM, key, text});
export const deleteEmployee = (key) => ({type: DELETE_EMMLOYEE, key});
export const handleDragAndDrop = (result) => ({type: HANDLE_DRAG_AND_DROP, result});
export const updateItem = (key, text) => ({type: UPDATE_ITEM, key, text});
export const updateEmployeeItem = (key, text) => ({type: UPDATE_EMPLOYEE_ITEM, key, text});
export const setCurrentUrl = (text, key) => ({type: SET_CURRENT_URL_AND_KEY, text, key});
export const addEmployeeItem = (employeeKey, text) => ({
    type: ADD_EMPLOYEE_ITEM,
    employeeKey,
    text
});


export default departmetsReducer;