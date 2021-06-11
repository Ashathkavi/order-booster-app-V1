
//FOOD REDUCER
const foodReducerDefaultState = []
const foodsReducer = (state=foodReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_FOOD':
            return [...state, action.food]
        case 'REMOVE_FOOD':
                return state.filter((food) => (food.id !== action.id))
        case 'EDIT_FOOD':
            return state.map((food)=>{
                if(food.id === action.id){
                    return {
                        ...food,
                        ...action.updates
                    }
                }else{
                    return food
                } 
            })
        default:
            return state
    }
}

export default foodsReducer