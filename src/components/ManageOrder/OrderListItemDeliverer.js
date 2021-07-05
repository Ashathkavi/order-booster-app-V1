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
    count,
    startEditOrder
}) => {
    const now = moment()

    const onChangeStatus = () => {
        startEditOrder(id ,{status:{status:'recieved', time:now.valueOf()}})
    }

    return(
        <div className="list-item list-item--deliverer">
            
            <h2 className="list-item__title list-item__title--deliverer">{count}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {numeral(amount).format('$0,0.00')}</h2>
            <p><b>Customer Name: </b> {customerName}</p>
            <p><b>Phone Number: </b>{phoneNumber}</p>
            <p><b>Address: </b>{address}</p>
            <p><b>Order Status: </b> {status.status}</p>  
            <div>
                <p>{moment(createdAt).format('MMMM Do, YYYY  -  HH : mm')}</p>  
                <p>{moment(orderEndTime).format('MMMM Do, YYYY  -  HH : mm')}</p>  

            </div>          
            {status.status === 'on delivery' && <button onClick={onChangeStatus}>Mark it as Delivered</button>}
        
            
                      
        </div>
)}

 
const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
})

export default connect(undefined, mapDispatchToProps)(OrderListItemDeliverer)