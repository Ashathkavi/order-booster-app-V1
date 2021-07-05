import React from 'react'
import {connect} from 'react-redux'
import OrderListItem from '../ManageOrder/OrderListItem'
import OrderListItemDeliverer from '../ManageOrder/OrderListItemDeliverer'
import OrderListItemWaiter from '../ManageOrder/OrderListItemWaiter'


import selectOrder from '../../selectors/orders'

export const OrderList = (props) => {



    //console.log(props)
    return (
    <div className="content-container">
        { props.autherizedAs !== 'deliverer' && <div className= "list-header">
            <div className="show-for-mobile">Orders</div>
            <div className="show-for-deskotp">Order</div>
            <div className="show-for-deskotp">Amount</div>
        </div>}
        <div className={props.autherizedAs !== 'deliverer' ? "list-body" : "list-body--deliverer"}>
            {
                props.orders.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No Orders</span>
                    </div>
                ): (
                    props.orders.map((order)=>{
                        //console.log(order)
                        if(props.autherizedAs === 'waiter'){
                            return <OrderListItemWaiter key={order.id} {...order}/>
                        }else if (props.autherizedAs === 'deliverer'){
                            return <OrderListItemDeliverer key={order.id} {...order}/>
                        }else if (props.autherizedAs === 'admin' || props.autherizedAs === 'manager'){
                            return <OrderListItem key={order.id} {...order}/>
                        }else if(props.autherizedAs === 'cook'){
                            return <OrderListItem key={order.id} {...order}/>
                        }else{
                            return <p>un autherized</p>
                        }
                            
                    })
                )
                
            }
        </div>
        
    </div>
)}

const mapStateToProps = (state) => {
    //console.log(state.foods)

    return {
        orders:selectOrder(state.orders, state.orderFilters),
        autherizedAs:state.auth.role
    }
}

export default connect(mapStateToProps)(OrderList)