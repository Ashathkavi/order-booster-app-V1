import React from 'react'
import {OrderForm} from './OrderForm'
import {startAddOrder} from '../../actions/orders'
import {connect} from 'react-redux'
import selectFood from '../../selectors/foods'



export const AddOrderPage = (props) => {

    
    const counter = (orders) =>{
        let count = orders.length + 1
        let i = true
        while(i === true){

            orders.map((order) => {
                i=false
                if(order.count  === count){
                    count += 1
                    i=true
                }
            })
            if(orders.length === 0){
                i = false
            }
        }
        return count
    } 

    const onSubmit = (order) => {
        props.startAddOrder({...order, count:counter(props.orders)})
        props.history.push('/order')
    }

    return(
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add Order</h1>
                </div>
            </div>

            <div className="content-container">
                <OrderForm orders={props.orders} onSubmit={ onSubmit} foods={props.foods}/>
            </div>
            

        </div>
)}


const mapDispatchToProps = (dispatch) => ({
    startAddOrder: (order) => dispatch(startAddOrder(order))
})


const mapStateToProps = (state) => {
    console.log(state.orders)
    return {
        orders:state.orders,
        foods:selectFood(state.foods, state.foodFilters)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderPage)