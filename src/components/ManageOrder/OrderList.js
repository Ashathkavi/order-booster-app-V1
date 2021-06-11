import React from 'react'
import {connect} from 'react-redux'
import OrderListItem from '../ManageOrder/OrderListItem'
import selectOrder from '../../selectors/orders'

export const OrderList = (props) => {
    //console.log(props)
    return (
    <div>
        <h1>Order List</h1>
        {
            props.orders.map((order)=>{
                //console.log(order)
                return <OrderListItem key={order.id} {...order}/>
            })
        }
    </div>
)}

const mapStateToProps = (state) => {
    return {
        orders:selectOrder(state.orders, state.orderFilters),
    }
}

export default connect(mapStateToProps)(OrderList)