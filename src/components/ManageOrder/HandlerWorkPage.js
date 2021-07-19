import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {startEditOrder} from '../../actions/orders'
import {setStatusFilter, setStartDate} from '../../actions/orderFilters'
import {onStartSetOrders} from '../../actions/orders'
import selectedOrders from '../../selectors/orders'
import DurationDisplay from './DurationDisplay'
import MessageModal from '../MessageModal'
import {GiStabbedNote} from "react-icons/gi";





export const HandlerWorkPage = ({
    orders,
    setStatusFilter,
    onStartSetOrders,
    setStartDate,
    startEditOrder,
    auth

    }) => {
    //console.log(props)

    const [isFoodDisModalOpen, setIsFoodDisModalOpen] = useState(false)
    const [foodDescription, setFoodDescription] = useState('')

    
    const onFoodDescription = (foodDescription) => {
        setIsFoodDisModalOpen(!isFoodDisModalOpen)
        setFoodDescription(foodDescription)    
    }

    useEffect(()=>{
        setStatusFilter('kitchen')
        setStartDate(moment().subtract(1,'month').startOf('month').valueOf())
        const g = onStartSetOrders()
        return g
    },[])
    const onChangeHandledStatus = (id, foodIndex, orderedFoods) => {
        let foods = orderedFoods
        foods[foodIndex].handled = true
        foods[foodIndex].handledBy = auth.uid
        foods[foodIndex].handledTime = moment().valueOf()
        let orderReady = true
        foods.map((food)=> {
            if(food.handled === false){
                orderReady = false
            }
        })
        if(orderReady){
            startEditOrder(id ,{foods:foods, status:{status:'table', time:moment().valueOf()}})
            console.log('orderready')
        }else{
            startEditOrder(id ,{foods:foods})
        }
        //console.log(foods, 'Foods', id)
        
    }
    
    return(
        <div className='content-container'>
        
            <div className="list-body--deliverer">
            {
                orders.map((order)=>(
                    <div className="list-item list-item--deliverer">
                
                        <h2 className="list-item__title list-item__title--deliverer">{order.count}  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {order.deliverMeth}</h2>
                        <p><b>Order status: </b> {order.status.status}</p>
                        <table className="table-list-item-handler">
                            {
                                order.foods.map((food)=>{
                                    return (
                                        <tr>
                                            <td>{food.food.name}{!!food.foodDescription && <GiStabbedNote onClick={()=>onFoodDescription(food.foodDescription)}/>} </td>
                                            <td>{food.food.foodSize}</td>
                                            <td>{food.foodQuantity}</td>
                                            <td>{!!food.prepared ? 'Prepared' : 'Not Prepared'}</td>
                                            { (!food.handled && !!food.prepared ) &&<td> <button onClick={()=>onChangeHandledStatus(order.id, order.foods.indexOf(food), order.foods)}>Mark as Handled</button></td>}
                                            { (!food.handled && !food.prepared ) &&<td> Not Handled</td>}
                                            { (!!food.handled && !!food.prepared ) &&<td>  Handled</td>}

                                        </tr>)
                                })
                            }
                        </table>
                        
                        
                        {!!order.description && <p><b>Description: </b>{order.description}</p>  }  
                        <div className="list-item__duration"><DurationDisplay orderEndTime={order.orderEndTime}/></div>
                    </div>
                ))
            }
            </div>
            <MessageModal
                onVisibleMessageModal={setIsFoodDisModalOpen} 
                isMessageModalOpen = {isFoodDisModalOpen}
                message={foodDescription}
                title={''}
            />
        </div>
    )

}



const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
    setStatusFilter:(status) => dispatch(setStatusFilter(status)),
    setStartDate:(startDate)=>dispatch(setStartDate(startDate)),
    onStartSetOrders: () => dispatch(onStartSetOrders())

})

const mapStateToProps = (state) => {
    return {        
        orders:selectedOrders(state.orders, state.orderFilters),
        filters:state.orderFilters,
        auth:state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HandlerWorkPage)