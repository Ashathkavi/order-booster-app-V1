import React from 'react'
import { connect } from 'react-redux'
import {removeOrder} from '../../actions/orders'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

numeral.register('locale','sl', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    currency: {
        symbol: 'Rs '
    }
})

numeral.locale('sl');

export const OrderListItem = ({
    id,
    createdAt,
    customerName, 
    phoneNumber, 
    orderEndTime,
    amount,
    address,
    status,
    dispatch
}) => {
    //console.log(moment(createdAt).format())

    return(
        <div>
            <Link to={`/order/edit/${id}`}><h2>{customerName}::: {phoneNumber} :::{numeral(amount).format('$0,0.00')}</h2></Link>
            <p>{moment(createdAt).format('MMMM Do, YYYY')}</p>
            <p>{address}</p>
            <p>{status.status}</p>
            
        </div>
)}

 

export default connect()(OrderListItem)