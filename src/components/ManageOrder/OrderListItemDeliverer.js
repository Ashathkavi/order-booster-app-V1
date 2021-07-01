import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import {startEditOrder} from '../../actions/orders'

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
    startEditOrder
}) => {
    const now = moment()

    const onChangeStatus = () => {
        startEditOrder(id ,{status:{status:'recieved', time:now.valueOf()}})
    }

    return(
        <div>
            <h2>{customerName}::: {phoneNumber} :::{numeral(amount).format('$0,0.00')}</h2>
            <p>{moment(createdAt).format('MMMM Do, YYYY')}</p>
            <p>{address}</p>
            <p>{status.status}</p>            
            <p>{moment(orderEndTime).format('MMMM Do, YYYY')}</p>  
            {status.status === 'on delivery' && <button onClick={onChangeStatus}>Mark it as Delivered</button>}
                      
        </div>
)}

 
const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
})

export default connect(undefined, mapDispatchToProps)(OrderListItemDeliverer)