import React, {useState} from 'react'
import {connect} from 'react-redux'
import { startEditOrder, startRemoveOrder} from '../../actions/orders'
import OrderForm from './OrderForm'
import MessageModal from '../MessageModal'
import selectFood from '../../selectors/foods'


export const EditOrderPage = (props) => {
    //console.log(props, 'props')

    const [visibleMessageModal, setVisibleMessageModal] = useState(false)
    
    const onSubmit = (order) => {
        console.log(props.order, 'props.order')
        props.startEditOrder(props.order.id ,order, props.order)
        props.history.push('/order')
    }

    const toggleVisibleModal = () =>{
        setVisibleMessageModal(!visibleMessageModal)
    }

    const onRemove = () => {
        props.startRemoveOrder(props.order.id)
        props.history.push('/order')
    }

    return(
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Order</h1>
                </div>
            </div>
           <div className="content-container">
                <OrderForm order={props.order} onSubmit={onSubmit} foods={props.foods}/>
                {props.autherizedAs === 'admin' && <button className="button button--remove" onClick={toggleVisibleModal}>Remove this Order</button>}

           </div>
           <MessageModal 
                onVisibleMessageModal={toggleVisibleModal} 
                isMessageModalOpen = {visibleMessageModal}
                onSubmit={onRemove}
                orderNo={props.order.count}
                message='Are You sure, Do you want to delete the Order'
                title='Order Delete Alert'
           />
        </div>
    )
}


const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order, prev) => dispatch(startEditOrder(id, order, prev)),
    startRemoveOrder: (id) => dispatch(startRemoveOrder({id}))
})

const mapStateToProps = (state, props) => {
    //console.log(state.orders)
    return {
        
        order:state.orders.find((order)=> order.id === props.match.params.id),
        autherizedAs:state.auth.role,
        foods:selectFood(state.foods, state.foodFilters)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderPage)