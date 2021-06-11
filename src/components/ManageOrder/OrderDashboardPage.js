import React from 'react'
import OrderList from './OrderList'
import OrderListFilters from './OrderListFilters'


const OrderDashboardPage = () => (
    <div>        
        
        <OrderListFilters/>
        <OrderList/>
    </div>
)

export default OrderDashboardPage