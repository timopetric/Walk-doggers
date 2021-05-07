import {createStore} from "redux";

const TOGGLE_FILTER = 'TOGGLE_FILTER'

export function toggleFilter() {
    return {
        type: TOGGLE_FILTER,
        info: 'Toggles showFilter'
    }
}

const initialState = {
    showFilter: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FILTER: return {
            ...state,
            showFilter: !state.showFilter
        }

        default: return state
    }
}

export const store = createStore(reducer)
