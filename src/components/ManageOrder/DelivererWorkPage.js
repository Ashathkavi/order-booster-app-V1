import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import {startEditOrder} from '../../actions/orders'
import {setDeliverMethFilter, setStartDate} from '../../actions/orderFilters'
import OrderViewModal from './OrderViewModal'
import {onStartSetOrders} from '../../actions/orders'
import selectedOrders from '../../selectors/orders'



export const DelivererWorkPage = ({
    orders,
    setDeliverMethFilter,
    onStartSetOrders,
    setStartDate,
    startEditOrder

    }) => {
    //console.log(props)

    useEffect(()=>{
        setDeliverMethFilter('delivery')
        setStartDate(moment().subtract(1,'month').startOf('month').valueOf())
        const g = onStartSetOrders()
        return g
    },[])
    const [orderViewIsOpen, setOrderViewIsOpen ] = useState(false)

    const now = moment()

    const onChangeStatus = () => {
        startEditOrder(id ,{status:{status:'recieved', time:now.valueOf()}})
    }


    return(
        <div className='content-container'>
        
            <div className="list-body--deliverer">
            {
                orders.map((order)=>(
                    <div className="list-item list-item--deliverer">
                        
                        <h2 className="list-item__title list-item__title--deliverer">{order.count}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {numeral(order.amount).format('$0,0.00')}</h2>
                        <p><b>Customer Name: </b> {order.customerName}</p>
                        <p><b>Phone Number: </b>{order.phoneNumber}</p>
                        <p><b>Address: </b>{order.address}</p>    
                        {order.status.status === 'on delivery' && <button onClick={onChangeStatus}>Mark it as Delivered</button>}
                        <p >{moment(order.orderEndTime).format('MMMM Do, YYYY   h:mm a') }</p>
                        <button className="button button--buttonMainBoard" onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button> &nbsp;&nbsp;&nbsp;
                    
                        <OrderViewModal 
                            modalIsOpen={orderViewIsOpen} 
                            handleCloseModal={()=>setOrderViewIsOpen(false)} 
                            {...order}                
                            startEditOrder={startEditOrder}
                            from={'delivererList'}
                        />
                                
                    </div>
                ))
            }
            </div>
        </div>
        
    )

}



const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
    setDeliverMethFilter:(deliverMeth) => dispatch(setDeliverMethFilter(deliverMeth)),
    setStartDate:(startDate)=>dispatch(setStartDate(startDate)),
    onStartSetOrders: () => dispatch(onStartSetOrders())

})

const mapStateToProps = (state) => {
    return {        
        orders:selectedOrders(state.orders, state.orderFilters),
        filters:state.orderFilters,
        auth:state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DelivererWorkPage)