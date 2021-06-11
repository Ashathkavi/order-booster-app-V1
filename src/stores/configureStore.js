import {createStore, combineReducers} from 'redux'
import foodsReducer from '../reducers/foods'
import foodFilterReducer from '../reducers/foodFilters'
import ordersReducer from '../reducers/orders'
import orderFilterReducer from '../reducers/orderFilters'



//STORE CREATION.............................................

export default ()=>{

    const store = createStore(
        combineReducers({
            foods:foodsReducer,
            foodFilters:foodFilterReducer,
            orders:ordersReducer,
            orderFilters:orderFilterReducer
        })
    )
    return store
}




