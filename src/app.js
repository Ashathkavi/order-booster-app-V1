
import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './stores/configureStore'
import moment from 'moment'
import numeral from 'numeral'

import { login, logout, checkUserAvailability, setAsMemeber } from './actions/auth' 

import {startSetFoods} from './actions/foods'
import getVisibleFoods from './selectors/foods'

import getVisibleorders from './selectors/orders'
import {startSetOrders} from './actions/orders'
import {
    setBoundryAmount,
    setAddressFilter,
    setBillStatusFilter,
    setCustomerFilter,
    setEndDate,
    setFoodFilter,
    setKotStatusFilter,
    setPNoFilter,
    setStartDate,///
    setStatusFilter,
    sortByAmount,
    sortByDate,
    sortByDuration
} from './actions/orderFilters'
import "react-datepicker/dist/react-datepicker.css";
import database,{firebase} from "./firebase/firebase"
import LoadingPage from "./components/LoadingPage"





const store = configureStore()

//console.log('store.getState()', store.getState())

const state = store.getState()

const visibleFoods = getVisibleFoods(state.foods, state.foodFilters)
const visibleOrders = getVisibleorders(state.orders, state.orderFilters)
//console.log('visibleOrders',visibleOrders)



const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRender = false
const renderApp = () => {
    if(!hasRender){
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRender=true
    }
}

ReactDOM.render(<LoadingPage/>, document.getElementById('app'))


firebase.auth().onAuthStateChanged((user) => {
    
        
    if(user){
        
        store.dispatch(checkUserAvailability(user)).then(()=>{
            if(store.getState().auth.role === 'unknown'){
                
                store.dispatch(setAsMemeber(user.uid, user.displayName)).then(()=>{
                    store.dispatch(startSetFoods()).then(()=>{
                        store.dispatch(startSetOrders()).then(()=>{
                            renderApp()
                            if(history.location.pathname === '/'){
                                history.push('/dashboard')
                            }
                            console.log('store.getState()', store.getState())
                        })
                        
                    })
                    
                })
            }else{
                
                store.dispatch(startSetFoods()).then(()=>{
                    store.dispatch(startSetOrders()).then(()=>{
                        renderApp()
                        console.log('kfkfkfkf')
                        if(history.location.pathname === '/'){
                            history.push('/dashboard')
                        }
                    })                    
                    //console.log('store.getState()', store.getState())
                })
                
            }
                 
        })
        
    }else{
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})




/*

const sample_Foods = sampleFoods()
const FoodOne = store.dispatch(addFood(sample_Foods[0]))
const FoodTwo = store.dispatch(addFood(sample_Foods[1]))
const FoodThree = store.dispatch(addFood(sample_Foods[2]))
//const FoodFour = store.dispatch(addFood(sample_Foods[3]))


const sample_Orders = sampleOrders()
const OrderOne = store.dispatch(addOrder(sample_Orders[0]))
const OrderTwo = store.dispatch(addOrder(sample_Orders[1]))
const OrderThree = store.dispatch(addOrder(sample_Orders[2]))

/*
store.dispatch(editOrder(OrderOne.order.id, {
    createdAt :0, 
    customerName:'Ashath_kavi', 
    description : "less oil", 
    phoneNumber:'0765825555', 
    orderEndTime : 564865,
    address:'St/Micheals college',
    status:{
        status:'confirmed',
        time:564000
    },
    kotStatus:{
        status:'passed',
        time:564000
    },
    billStatus:{
        status:'Printed',
        time:565846
    },
    foods:[sampleFoods()[3], sampleFoods()[1]],
    amount:5560
}))

store.dispatch(removeOrder({id:OrderOne.order.id}))
*/

//store.dispatch(setAddressFilter('maman'))

//store.dispatch(setBoundryAmount(5200))
