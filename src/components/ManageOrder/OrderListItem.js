import React, {useState, useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import DelivererModal from './DelivererModal'
import {startEditOrder} from '../../actions/orders'
import {useReactToPrint} from 'react-to-print';
import OrderViewModal from './OrderViewModal'
import OrderToPrint from './OrderToPrint'
import DurationDisplay from './DurationDisplay'

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
        deliverer


    }) => {

    console.log(orderEndTime - moment().valueOf())

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
        deliverMeth,
        deliverer
    }

    const [orderViewIsOpen, setOrderViewIsOpen ] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
   
    const handleCloseModal = () => setModalIsOpen(false);
    const handleOpenModal = () => setModalIsOpen(true);

    const onDelivery= (delivererUid) => {
        if(!!delivererUid){
            startEditOrder(id ,{
                status:{status:'on delivery', time:now.valueOf()},
                deliverer:delivererUid
            })
            onOrderPrint()
        }
        
    }

    const on_Delivery= () => {
        startEditOrder(id ,{
            status:{status:'on delivery', time:now.valueOf()}
        })
        onOrderPrint()
    }

    const onTakeAway= () => {
        startEditOrder(id ,{
            status:{status:'recieved', time:now.valueOf()}
        })
        onOrderPrint()
    }


    const onAfterDinning = () => {
        startEditOrder(id ,{
            status:{status:'recieved', time:now.valueOf()},
        })
        onOrderPrint()
    }

    const onToKitchen = () => {
        startEditOrder(id ,{
            status:{status:'kitchen', time:now.valueOf()},
        })
    }
/*
    const durationDisplay = () => {
        let duration = moment(orderEndTime).diff(moment())
        let durationPlusTen = moment(orderEndTime).subtract(10,'minutes').diff(moment())
        if(duration < 0){
            return <span style={{color: "red"}}>{moment.utc(duration*-1).format('HH ')}hours&nbsp;&nbsp;{moment.utc(duration*-1).format('mm ')}minutes</span>
        }else if(durationPlusTen < 0){
            return <span style={{color: "orange"}}>{moment.utc(duration).format('mm ') }minutes</span>
        }else{
            return <span >{moment.utc(duration).format('HH:mm')}</span>
        }
        

    }
*/
    return(
        <div className="list-item">
            <div>
                <div className="list-item_into-row">
                    <Link className="list-item__link" to={`/order/edit/${id}`} >
                        <h4 className="list-item__title">No: {count} &nbsp;&nbsp;&nbsp;</h4>
                    </Link>
                    [<sapn>{status.status}</sapn> ]  &nbsp;&nbsp;
                    {status.status === 'confirmed' && <button onClick={onToKitchen}>Move to Kitchen</button>  }&nbsp;

                    
                </div>
                 
                <p className="list-item__sub-title">
                    {status.status !== 'recieved' && status.status !== 'cancelled' && <DurationDisplay orderEndTime={orderEndTime}/>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {(deliverMeth === 'delivery' ) ? address : deliverMeth} 
                </p>
                

                <div style={{display:'none'}}>
                    <OrderToPrint {...order} ref={componentRef} />
                </div>   
            </div>
            <div>

                <h3 className="list-item__data">
                    {(status.status === 'table' && deliverMeth === 'take away') && <button onClick={onTakeAway}>Print Bill</button>}
                    {
                        !!deliverer ? 
                        (status.status === 'table' && deliverMeth === 'delivery') && <button onClick={on_Delivery}>Print Bill{deliverer}</button> :
                        (status.status === 'table' && deliverMeth === 'delivery') && <button onClick={handleOpenModal}>Choose a deliverer{deliverer}</button>

                    }
                    {(status.status === 'table' && deliverMeth === 'dinning') && <button onClick={onAfterDinning}>Print Bill</button>}
                    &nbsp;&nbsp;&nbsp;
                    {numeral(amount).format('$0,0.00')}
                </h3>
                <p className="list-item__sub-title list-item__sub-title--date">
                    <button onClick={()=>setOrderViewIsOpen(true)}>See Order Details</button> &nbsp;&nbsp;&nbsp;
                    {moment(orderEndTime).format('YYYY MMMM Do, h:mm a')}
                </p>
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