import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DurationDisplay from './DurationDisplay'
import {setStatusFilter} from '../../actions/orderFilters'
import {onStartSetOrders} from '../../actions/orders'
import OrderViewModal from './OrderViewModal'
import numeral from 'numeral'






export const OrderListItemCook = ({
    
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
        <div className="list-item">
            <div>
                <div className="list-item_into-row">
                    <h4 className="list-item__title">No: {count} &nbsp;&nbsp;&nbsp;</h4>
                    [<sapn>{status.status}</sapn> ] 
                    
                </div>
                 
                <p className="list-item__sub-title">
                    {status.status !== 'recieved' && status.status !== 'cancelled' && <DurationDisplay orderEndTime={orderEndTime}/>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {(deliverMeth === 'delivery' ) ? address : deliverMeth} 
                </p>
                
            </div>
            <div>

                <h3 className="list-item__data">
                    
                    {numeral(amount).format('$0,0.00')}
                </h3>
                <p className="list-item__sub-title list-item__sub-title--date">
                    <button onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button> &nbsp;&nbsp;&nbsp;
                    {moment(orderEndTime).format('YYYY MMMM Do, h:mm a')}
                </p>
            </div>            
            <OrderViewModal 
                modalIsOpen={orderViewIsOpen} 
                handleCloseModal={()=>setOrderViewIsOpen(false)} 
                {...order}
                from={'cookList'}
            />                      
        </div>
        
        
)}

 
const mapDispatchToProps = (dispatch) => ({
    setStatusFilter: (status) => dispatch(setStatusFilter(status)),
    onStartSetOrders: () => dispatch(onStartSetOrders())
})

const mapStateToProps = (state) => {
    return {        
        auth:state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListItemCook)
