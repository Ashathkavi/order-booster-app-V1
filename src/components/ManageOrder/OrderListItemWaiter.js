import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DurationDisplay from './DurationDisplay'
import {onStartSetOrders} from '../../actions/orders'
import OrderViewModal from './OrderViewModal'
import numeral from 'numeral'






export const OrderListItemWaiter = ({
    
    id,
    createdAt,
    customerName, 
    phoneNumber, 
    orderEndTime,
    amount,
    address,
    status,
    count,
    foods,
    deliverMeth,
    deliverer,
    description
}) => {
    const [orderViewIsOpen, setOrderViewIsOpen ] = useState(false)
    const order = {
        id,
        createdAt,
        customerName, 
        phoneNumber, 
        orderEndTime,
        amount,
        address,
        status,
        count,
        foods,
        deliverMeth,
        deliverer,
        description
    }

/*
    const onChangeHandledStatus = (id, foodIndex, orderedFoods) => {
        let foods = orderedFoods
        foods[foodIndex].handled = true
        foods[foodIndex].handledBy = auth.uid
        foods[foodIndex].handledTime = moment().valueOf()
        let orderReady = true
        foods.map((food)=> {
            if(food.handled === false){
                orderReady = false
            }
        })
        if(orderReady){
            startEditOrder(id ,{foods:foods, status:{status:'table', time:moment().valueOf()}})
            console.log('orderready')
        }else{
            startEditOrder(id ,{foods:foods})
        }
        //console.log(foods, 'Foods', id)
        
    }
*/
    return(
        <div className="list-item list-item--deliverer">
            <div className="list-item__title__container">
                <h3 className="list-item__title list-item__title--deliverer">{count}</h3>
                <h4>{deliverMeth}</h4>
                <p> {status.status}</p>
            </div>

            
            
            
            <button onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button> 
            <div className="list-item__duration"><DurationDisplay orderEndTime={orderEndTime}/></div>
            <OrderViewModal 
                modalIsOpen={orderViewIsOpen} 
                handleCloseModal={()=>setOrderViewIsOpen(false)} 
                {...order}                
                from={'handlerList'}
            /> 
        </div>
          
        
        
)}

 
const mapDispatchToProps = (dispatch) => ({
    onStartSetOrders: () => dispatch(onStartSetOrders())
})


export default connect(undefined, mapDispatchToProps)(OrderListItemWaiter)


/*

*/