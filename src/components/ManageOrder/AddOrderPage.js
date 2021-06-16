import React from 'react'
import {OrderForm} from './OrderForm'
import {startAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'


export const AddOrderPage = (props) => {

    const onSubmit = (order) => {
        props.startAddOrder(order)
        props.history.push('/order')
    }

    return(
        <div>
            <h2>Add Order</h2>
            <OrderForm onSubmit={ onSubmit}/>

        </div>
)}


const mapDispatchToProps = (dispatch) => ({
    startAddOrder: (order) => dispatch(startAddOrder(order))
})

export default connect(undefined, mapDispatchToProps)(AddOrderPage)