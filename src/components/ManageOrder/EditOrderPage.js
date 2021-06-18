import React from 'react'
import {connect} from 'react-redux'
import { editOrder, startRemoveOrder} from '../../actions/orders'
import OrderForm from './OrderForm'

export const EditOrderPage = (props) => {
    
    const onSubmit = (order) => {
        props.editOrder(props.order.id ,order)
        props.history.push('/order')
    }

    const onRemove = () => {
        props.startRemoveOrder(props.order.id)
        props.history.push('/order')
    }

    return(
        <div>
           <OrderForm order={props.order} onSubmit={onSubmit}/>
           <button onClick={onRemove}>Remove</button>
        </div>
)}


const mapDispatchToProps = (dispatch) => ({
    editOrder: (id, order) => dispatch(editOrder(id, order)),
    startRemoveOrder: (id) => dispatch(startRemoveOrder({id}))
})

const mapStateToProps = (state, props) => {
    //console.log(state.orders)
    return {
        
        order:state.orders.find((order)=> order.id === props.match.params.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderPage)