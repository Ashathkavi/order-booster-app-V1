import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import {Link} from 'react-router-dom'
import selectOrders from '../../selectors/orders'
import selectOrdersTotal from '../../selectors/orders-total'




export const OrdersSummary = ({ordersCount, ordersTotal, orderStatus, startDate, endDate}) => {
    const orderWord = ordersCount === 1 ? 'order' : 'orders'
    const FormattedOrdersTotal = numeral(ordersTotal).format('$0,0.00')
    const viewableStartDate = moment(startDate).format('MMM Do YYYY')
    const viewableEndDate = moment(endDate).format('MMM Do YYYY')
    console.log(orderStatus, 'orderStatus')
    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">
                    Viewing <span>{ordersCount}</span> {orderWord}  {!!orderStatus && ` of`}
                    <span>{!!orderStatus && ` '${orderStatus}'`}</span> {!!orderStatus && ` status `} 
                    from <span>{viewableStartDate}</span> to <span>{viewableEndDate}</span>, totalling  
                    <span>{' '+FormattedOrdersTotal}</span>
                </h2>
                <div className="page-header__action">
                    <Link className="button" to="/order/create">Add Order</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleOrders = selectOrders(state.orders, state.orderFilters)
    return{
        startDate:state.orderFilters.startDate,
        endDate:state.orderFilters.endDate,
        orderStatus:state.orderFilters.status,
        ordersCount: visibleOrders.length,
        ordersTotal: selectOrdersTotal(visibleOrders)
    }
}

export default connect(mapStateToProps)(OrdersSummary)

