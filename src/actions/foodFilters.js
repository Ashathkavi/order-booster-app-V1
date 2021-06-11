

//SET_NAME_FILTER : food filter reducer
export const setNameFilter = (name='') => ({
    type:'SET_NAME_FILTER',
    name
})

//SET_CAT_TEXT_FILTER : food filter reducer
export const setCatTextFilter = (catText='') => ({
    type:'SET_CAT_TEXT_FILTER',
    catText
})

//SET_BOUNDRY_AMOUNT : food filter reducer
export const setBoundryAmount = (boundryAmount=2000) => ({
    type:'SET_BOUNDRY_AMOUNT',
    boundryAmount
})


//SET_SIZE : food filter reducer
export const setSize = (size = '') => ({
    type: 'SET_SIZE',
    size
})

