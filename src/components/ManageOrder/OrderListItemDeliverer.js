import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import {startEditOrder} from '../../actions/orders'
import {setDeliverMethFilter} from '../../actions/orderFilters'
import OrderViewModal from './OrderViewModal'




numeral.locale('sl');


export const OrderListItemDeliverer = ({
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
    startEditOrder,
    setDeliverMethFilter
}) => {
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
        deliverMeth,
        foods
    }
    useEffect(()=>{
        setDeliverMethFilter('delivery')
        
    },[])
    const [orderViewIsOpen, setOrderViewIsOpen ] = useState(false)

    const now = moment()

    const onChangeStatus = () => {
        startEditOrder(id ,{status:{status:'recieved', time:now.valueOf()}})
    }
    console.log('status.status', status.status)

    return(
        <div className="list-item list-item--deliverer">
            
            <h2 className="list-item__title list-item__title--deliverer">{count}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {numeral(amount).format('$0,0.00')}</h2>
            <p><b>Customer Name: </b> {customerName}</p>
            <p><b>Phone Number: </b>{phoneNumber}</p>
            <p><b>Address: </b>{address}</p>    
            {status.status === 'on delivery' && <button onClick={onChangeStatus}>Mark it as Delivered</button>}
            <p >{moment(orderEndTime).format('MMMM Do, YYYY   h:mm a') }</p>
            <button className="button button--buttonMainBoard" onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button> &nbsp;&nbsp;&nbsp;
        
            <OrderViewModal 
                modalIsOpen={orderViewIsOpen} 
                handleCloseModal={()=>setOrderViewIsOpen(false)} 
                {...order}                
                startEditOrder={startEditOrder}
                from={'delivererList'}
            />
                      
        </div>
)}

 
const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
    setDeliverMethFilter:(deliverMeth) => dispatch(setDeliverMethFilter(deliverMeth))
})

export default connect(undefined, mapDispatchToProps)(OrderListItemDeliverer)