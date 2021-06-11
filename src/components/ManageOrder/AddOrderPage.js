import React from 'react'
import {OrderForm} from './OrderForm'
import {addOrder} from '../../actions/orders'
import {connect} from 'react-redux'


export const AddOrderPage = (props) => {

    const onSubmit = (order) => {
        props.addOrder(order)
        props.history.push('/order')
    }

    return(
        <div>
            <h2>Add Order</h2>
            <OrderForm onSubmit={ onSubmit}/>

        </div>
)}


const mapDispatchToProps = (dispatch) => ({
    addOrder: (order) => dispatch(addOrder(order))
})

export default connect(undefined, mapDispatchToProps)(AddOrderPage)