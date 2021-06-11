
//FOODFILTER REDUCER
const foodFilterReducerDefaultState = {
    name:'',
    catText:'',
    boundryAmount:2000,
    size:''
}
const foodFilterReducer = (state=foodFilterReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_NAME_FILTER':
            return {
                ...state,
                name:action.name
            }
        case 'SET_CAT_TEXT_FILTER':
            return {
                ...state,
                catText:action.catText
            }
        case 'SET_BOUNDRY_AMOUNT':
            return {
                ...state,
                boundryAmount:action.boundryAmount
            }
        case 'SET_SIZE':
            return {
                ...state,
                size:action.size
            }
    default:
            return state
    }
}

export default foodFilterReducer