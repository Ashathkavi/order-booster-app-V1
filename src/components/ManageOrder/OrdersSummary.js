import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import selectOrders from '../../selectors/orders'
import selectOrdersTotal from '../../selectors/orders-total'




export const OrdersSummary = ({ordersCount, ordersTotal}) => {
    const orderWord = ordersCount === 1 ? 'order' : 'orders'
    const FormattedOrdersTotal = numeral(ordersTotal).format('$0,0.00')
    return (
        <div>
            <h1>Viewing {ordersCount} {orderWord} totalling {FormattedOrdersTotal}</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleOrders = selectOrders(state.orders, state.orderFilters)
    return{
        ordersCount: visibleOrders.length,
        ordersTotal: selectOrdersTotal(visibleOrders)
    }
}

export default connect(mapStateToProps)(OrdersSummary)

