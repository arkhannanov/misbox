const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const HANDLE_DRAG_AND_DROP = 'HANDLE_DRAG_AND_DROP';
const UPDATE_ITEM = 'UPDATE_ITEM';

let initialState = {
    departments: [],
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
            return {
                ...state,
                departments: filteredItems,
            };
        case UPDATE_ITEM:
            let itemKey = action.key;
            let newText = action.text;
            let itemIndex = state.departments.findIndex(el => el.key === itemKey);
            let newArray = [];

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
        default:
            return state;
    }
}

export const addItem = (key, content) => ({type: ADD_ITEM, key, content});
export const deleteItem = (key) => ({type: DELETE_ITEM, key});
export const handleDragAndDrop = (result) => ({type: HANDLE_DRAG_AND_DROP, result});
export const updateItem = (key, text) => ({type: UPDATE_ITEM, key, text});


export default departmetsReducer;