
//ORDER REDUCER
const orderReducerDefaultState = []
const ordersReducer = (state=orderReducerDefaultState, action) => {
    switch(action.type){
        
        case 'ADD_ORDER':
            //console.log('from orders reducer',action.order)
            return [...state, action.order]
        case 'REMOVE_ORDER':
                return state.filter((order) => (order.id !== action.id))
        case 'EDIT_ORDER':
            return state.map((order)=>{
                if(order.id === action.id){
                    return {
                        ...order,
                        ...action.updates
                    }
                }else{
                    return order
                } 
            })
        case 'SET_ORDERS':
            return action.orders
        default:
            return state
    }
}

export default ordersReducer