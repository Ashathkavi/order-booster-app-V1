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
        <h3 className="modal--OrderView__title">The Order : {props.count} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numeral(props.amount).format('$0,0.00')}</h3>
        <div className="modal--OrderView__body">
            <p >Name : {props.customerName}</p>
            <p >PhoneNumber : {props.phoneNumber}</p>
            <p >Address : {props.address}</p>
            <p >Order Status : {props.status.status}</p>
        </div>
        <div>
            {
                props.foods.length !== 0 && (
                    <div>
                        <table className="modal__tableSelectedFoods">
                            <tr>
                                <th>Name</th>
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
                                            onRemoveSingleOrder = {false}
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
            <p >Created Time : {moment(props.createdAt).format('MMMM Do, YYYY  HH : mm : ss')}</p>
            <p >Order End Time : {moment(props.orderEndTime).format('MMMM Do, YYYY  HH : mm : ss') }</p>
        </div>
        
        <button className="button button--closeModal" onClick={props.handleCloseModal}>Okay</button>
        <Link className="button button--selectFood" to={`/order/edit/${props.id}`} >Edit this Order</Link>
        
    </Modal>
)

export default OrderViewModal;