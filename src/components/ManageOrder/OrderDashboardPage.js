import React, {useState} from 'react'
import OrderList from './OrderList'
import OrderListFilters from './OrderListFilters'
import OrdersSummary from '../../components/ManageOrder/OrdersSummary'


const OrderDashboardPage = () => {
    const [sawFilters, setSawFilters] = useState(true)
    return (
        <div>        
            <OrdersSummary/>
            <div className="content-container">
            {sawFilters ? <OrderListFilters setSawFilters={setSawFilters}/> : 
                <button className="button--view-filters" onClick={() => setSawFilters(true)}>Click to View Filters</button>}

            </div>

            <OrderList/>
        </div>
    )
}

export default OrderDashboardPage