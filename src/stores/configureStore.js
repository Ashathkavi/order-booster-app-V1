import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import foodsReducer from '../reducers/foods'
import foodFilterReducer from '../reducers/foodFilters'
import ordersReducer from '../reducers/orders'
import orderFilterReducer from '../reducers/orderFilters'
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'



//STORE CREATION.............................................

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{

    const store = createStore(
        combineReducers({
            foods:foodsReducer,
            foodFilters:foodFilterReducer,
            orders:ordersReducer,
            orderFilters:orderFilterReducer,
            auth:authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}




