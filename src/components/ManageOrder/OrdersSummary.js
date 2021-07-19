import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import {Link} from 'react-router-dom'
import selectOrders from '../../selectors/orders'
import selectOrdersTotal from '../../selectors/orders-total'




export const OrdersSummary = ({ordersCount, ordersTotal, orderStatus, startDate, endDate, orders, autherizedAs}) => {
    const orderWord = ordersCount === 1 ? 'order' : 'orders'
    const FormattedOrdersTotal = numeral(ordersTotal).format('$0,0.00')
    const viewableStartDate = moment(startDate).format('MMM Do YYYY')
    const viewableEndDate = moment(endDate).format('MMM Do YYYY')
    console.log(orderStatus, 'orderStatus')

    let confirmedCount = 0
    let kitchenCount = 0
    let tableCount = 0
    let onDeliveryCount = 0
    let recievedCount = 0
    let cancelledCount = 0

    if(!orderStatus){
        orders.map((order)=>{
            if(order.status.status === 'confirmed'){
                confirmedCount += 1
            }else if (order.status.status === 'kitchen'){
                kitchenCount += 1
            }else if (order.status.status === 'recieved'){
                recievedCount += 1
            }else if (order.status.status === 'table'){
                tableCount += 1
            }else if (order.status.status === 'cancelled'){
                cancelledCount += 1
            }else {
                onDeliveryCount += 1
            }
        })
    }


    return (
        <div className="page-header">
            <div className="content-container">
                {(autherizedAs!=='handler' && autherizedAs!=='handler') && <h2 className="page-header__title">
                    Viewing <span>{ordersCount}</span> {orderWord}  {!!orderStatus && ` of`}
                    <span>{!!orderStatus && ` '${orderStatus}'`}</span> {!!orderStatus && ` status `} 
                    from <span>{viewableStartDate}</span> to <span>{viewableEndDate}</span>, totalling  
                    <span>{' '+FormattedOrdersTotal}</span>
                </h2>}
                <div className="page-header__action">
                    {(autherizedAs!=='handler' && autherizedAs!=='handler') && <Link className="button" to="/order/create">Add Order</Link>}
                    {!orderStatus && <div>
                        <p>Confirmed : <span>{confirmedCount}</span></p>
                        <p>Kitchen : <span>{kitchenCount}</span></p>
                    </div>}
                    {!orderStatus && <div>
                        <p>Table : <span>{tableCount}</span></p>
                        <p>On Delivery : <span>{onDeliveryCount}</span></p>
                    </div>}
                    {!orderStatus && <div>
                        <p>Recieved : <span>{recievedCount}</span></p>
                        <p>Cancelled : <span>{cancelledCount}</span></p>
                    </div>}

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
        ordersTotal: selectOrdersTotal(visibleOrders),
        orders:visibleOrders,
        autherizedAs:state.auth.role
    }
}

export default connect(mapStateToProps)(OrdersSummary)

