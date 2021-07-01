import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import DelivererModal from './DelivererModal'
import {startEditOrder} from '../../actions/orders'

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
    startEditOrder

}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
   
    const handleCloseModal = () => setModalIsOpen(false);
    const handleOpenModal = () => setModalIsOpen(true);

    const onDelivery= (delivererUid) => {
        startEditOrder(id ,{
            status:{status:'on Delivery', time:now.valueOf()},
            deliverMeth:'delivery',
            deliverer:delivererUid
        })
        printBill()
    }

    const onTakeAway= () => {
        startEditOrder(id ,{
            status:{status:'recieved', time:now.valueOf()},
            deliverMeth:'take away'

        })
        printBill()
    }

    const onDinning= () => {
        startEditOrder(id ,{
            status:{status:'on Delivery', time:now.valueOf()},
            deliverMeth:'dinning'
        })
    }

    const printBill = () => {

    }

    return(
        <div className="list-item">
            <div>
                <Link to={`/order/edit/${id}`}>
                    <h2 className="list-item__title">Order No : {count}:::::{status.status}</h2>
                </Link> 
                <p className="list-item__sub-title">{address}:::::{moment(orderEndTime).format('MMMM Do, YYYY')}</p>

                {
                    status.status === 'table' &&
                    <div>
                        <button onClick={onTakeAway}>Take Away</button>
                        <button onClick={handleOpenModal}>Delivery</button>
                        <button onClick={onDinning}>Dine In</button>
                    </div>                
                }
            </div>
            <div>
                <h3 className="list-item__data">{numeral(amount).format('$0,0.00')}</h3>
            </div>            
            <DelivererModal modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} onDelivery={onDelivery}/>
                      
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
})

export default connect(undefined, mapDispatchToProps)(OrderListItem)