import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'



export const OrderListItem = ({
    id,
    createdAt,
    customerName, 
    orderEndTime,
    status,
    startEditOrder,
    foods,
    description
}) => {
    const now = moment()

    const onChangeStatus = () => {
        startEditOrder(id ,{status:{status:'table', time:now.valueOf()}})
    }

    return(
        <div>
            <h2>customerName: {customerName}</h2>
            <p>Created at: {moment(createdAt).format('MMMM Do, YYYY')}</p>
            <p>Order status: {status.status}</p> 
            <p>Expiry Time: {moment(orderEndTime).format('MMMM Do, YYYY')}</p>
            <h3>Ordered Foods</h3>
            {
                foods.map((food)=><p>{food.food.name}:::::{food.foodQuantity}</p>)
            }
            <p>Description: {description}</p>            
            {status.status === 'kitchen' && <button onClick={onChangeStatus}>Mark it as Tabled</button>}                      
        </div>
)}

 
const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
})

export default connect(undefined, mapDispatchToProps)(OrderListItem)