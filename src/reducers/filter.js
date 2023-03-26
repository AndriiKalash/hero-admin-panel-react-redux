const initialState = {
    filters: [],
    selectionfilter: 'all'
    
}

const filter = (state = initialState, action) => {
    
    switch (action.type) {

        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }  
        case 'SELECTED_FILTER':
            return {
                ...state,
                selectionfilter: action.payload
            }      
             
        default: return state
    }
}

export default filter;