import React, {useState, useRef} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import DelivererModal from './DelivererModal'
import {startEditOrder} from '../../actions/orders'
import {useReactToPrint} from 'react-to-print';
import OrderViewModal from './OrderViewModal'
import OrderToPrint from './OrderToPrint'

const now = moment()

numeral.register('locale','sl', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    currency: {
        symbol: 'Rs '
    }
})

numeral.locale('sl');


export const OrderListItem = ({
        id,
        createdAt,
        customerName, 
        phoneNumber, 
        orderEndTime,
        amount,
        address,
        status,
        count,
        foods,
        deliverMeth,
        startEditOrder,


    }) => {

    const componentRef = useRef();
    const onOrderPrint = useReactToPrint({
            content:()=>componentRef.current
        })

    const order = {
        id,
        createdAt,
        customerName, 
        phoneNumber, 
        orderEndTime,
        amount,
        address,
        status,
        count,
        foods,
        deliverMeth
    }

    const [orderViewIsOpen, setOrderViewIsOpen ] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
   
    const handleCloseModal = () => setModalIsOpen(false);
    const handleOpenModal = () => setModalIsOpen(true);

    const onDelivery= (delivererUid) => {
        startEditOrder(id ,{
            status:{status:'on Delivery', time:now.valueOf()},
            deliverMeth:'delivery',
            deliverer:delivererUid
        })
        onOrderPrint()
    }

    const onTakeAway= () => {
        startEditOrder(id ,{
            status:{status:'recieved', time:now.valueOf()},
            deliverMeth:'take away'

        })
        onOrderPrint()
    }

    const onDinning= () => {
        startEditOrder(id ,{
            status:{status:'on Delivery', time:now.valueOf()},
            deliverMeth:'dinning'
        })
    }

    const onAfterDinning = () => {
        startEditOrder(id ,{
            status:{status:'recieved', time:now.valueOf()},
        })
        onOrderPrint()
    }

    return(
        <div className="list-item">
            <div>
                <Link className="list-item__link" to={`/order/edit/${id}`} >
                    <h4 className="list-item__title">No: {count} &nbsp;&nbsp;&nbsp; [ <sapn>{status.status}</sapn>]</h4>
                </Link> 
                <p className="list-item__sub-title">{address} &nbsp;&nbsp;&nbsp; <button onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button></p>

                {
                    status.status === 'table' &&(
                    <div>
                        <button onClick={onTakeAway}>Take Away</button>
                        <button onClick={handleOpenModal}>Delivery</button>
                        <button onClick={onDinning}>Dine In</button>
                    </div>)
                }
                {
                    (status.status === 'on Delivery' && deliverMeth === 'dinning')  &&(
                        <div >
                            <button onClick={onAfterDinning}>Print the bill</button>
                        </div>)
                }
                <div style={{display:'none'}}>
                    <OrderToPrint {...order} ref={componentRef} />
                </div>

                

            </div>
            <div>
                <h3 className="list-item__data">{numeral(amount).format('$0,0.00')}</h3>
                <p className="list-item__sub-title list-item__sub-title--date">{moment(orderEndTime).format('MMMM Do, YYYY')}</p>
            </div>            
            <DelivererModal modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} onDelivery={onDelivery}/>
            <OrderViewModal 
                modalIsOpen={orderViewIsOpen} 
                handleCloseModal={()=>setOrderViewIsOpen(false)} 
                {...order}                
                startEditOrder={startEditOrder}
            />
                      
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
})

export default connect(undefined, mapDispatchToProps)(OrderListItem)