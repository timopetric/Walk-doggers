import {createStore} from "redux";

const TOGGLE_FILTER = 'TOGGLE_FILTER'
const PICK_SIZE_FILTER = 'PICK_SIZE_FILTER'
const PICK_DISTANCE_FILTER = 'PICK_DISTANCE_FILTER'

export function toggleFilter() {
    return {
        type: TOGGLE_FILTER,
        info: 'Toggles showFilter'
    }
}

export function pickSizeFilter(size) {
    return{
        type: PICK_SIZE_FILTER,
        info: 'Picks dog size for filter',
        payload: size
    }
}

export function pickDistanceFilter(distance) {
    return {
        type: PICK_DISTANCE_FILTER,
        info: 'Picks distance filter',
        payload: distance
    }
}

const initialState = {
    showFilter: false,
    selectedSize: '0',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FILTER: return {
            ...state,
            showFilter: !state.showFilter
        }
        case PICK_SIZE_FILTER: return {
            ...state,
            selectedSize: action.payload
        }
        case PICK_DISTANCE_FILTER: return {
            ...state,
            selectedSize: action.payload
        }

        default: return state
    }
}

export const store = createStore(reducer)
