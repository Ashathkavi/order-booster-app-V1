import React from 'react'
import { connect } from 'react-redux'
import {removeOrder} from '../../actions/orders'
import {Link} from 'react-router-dom'
import moment from 'moment'

export const OrderListItem = ({
    id,
    createdAt,
    customerName, 
    phoneNumber, 
    orderEndTime,
    address,
    status,
    dispatch
}) => {
    //console.log(moment(createdAt).format())

    return(
        <div>
            <Link to={`/order/edit/${id}`}><h2>{customerName}: {phoneNumber}</h2></Link>
            <p>{moment(createdAt).format()}</p>
            <p>{address}</p>
            <p>{status.status}</p>
            <button onClick={()=>{dispatch(removeOrder({id}))}}>Remove</button>
        </div>
)}

 

export default connect()(OrderListItem)