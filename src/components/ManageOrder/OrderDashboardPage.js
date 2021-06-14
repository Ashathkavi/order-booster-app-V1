import React from 'react'
import OrderList from './OrderList'
import OrderListFilters from './OrderListFilters'
import OrdersSummary from '../../components/ManageOrder/OrdersSummary'


const OrderDashboardPage = () => (
    <div>        
        <OrdersSummary/>
        <OrderListFilters/>
        <OrderList/>
    </div>
)

export default OrderDashboardPage