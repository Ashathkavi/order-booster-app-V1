import React from 'react'
import Modal from 'react-modal'
import moment from 'moment'
import numeral from 'numeral'
import {Link} from 'react-router-dom'
import FoodSingleOrder from './FoodSingleOrder'

let iterable = 0
const OrderViewModal = (props) => (
    <Modal
        isOpen={props.modalIsOpen}
        contentLabel = "Order View"
        onRequestClose = {props.handleCloseModal}
        closeTimeoutMS={1000}
        className ="modal--OrderView"
    >
        <div className="modal__view-modal-header">
            <h3 className="modal--OrderView__title">Order No : {props.count} </h3>
            <h4>{numeral(props.amount).format('$0,0.00')}</h4>
        </div>
        <div className="modal--OrderView__body">
            {(props.from !== 'handlerList' && props.from !== 'cookList') && <p >Name : {props.customerName}</p>}
            {(props.from !== 'handlerList' && props.from !== 'cookList') && <p >PhoneNumber : {props.phoneNumber}</p>}
            {(props.from !== 'handlerList' && props.from !== 'cookList') && <p >Address : {props.address}</p>}
            <p >Order Status : {props.status.status}</p>
            <p> Delivery Method : {props.deliverMeth}</p>
        </div>
        <div>
            {
                props.foods.length !== 0 && (
                    <div>
                        <table className="table-order-view-modal">
                            <tr>
                                <th>Name</th>
                                <th>Potion Type</th>
                                <th>Food Quantity</th>     
                                <th>Prepared</th>
                            </tr>
                            {
                                
                                props.foods.map((food)=>{ 
                                    iterable = iterable + 1
                                        return (
                                            <FoodSingleOrder 
                                            key = {iterable}
                                            iterable = {iterable}
                                            singleTypeOrder = {food}
                                            />
                                        )                                    
                                    }
                                )
                            }
                        </table>
                        
                    </div>
                )
            }
        </div>
        <div className="modal--OrderView__body">
            <p >Created Time : {moment(props.createdAt).format('MMMM Do, YYYY   h:mm a')}</p>
            <p >Order End Time : {moment(props.orderEndTime).format('MMMM Do, YYYY   h:mm a') }</p>
        </div>
        <div className="button__splitter">
            <button className="button " onClick={props.handleCloseModal}>Okay</button>
            {(props.from !== 'delivererList' && props.from !== 'cookList'  && props.from !== 'handlerList') && <Link className="button button--selectFood" to={`/order/edit/${props.id}`} >Edit this Order</Link>}
        </div>
        
        
    </Modal>
)

export default OrderViewModal;