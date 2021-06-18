import uuid from 'uuid'
import moment from 'moment'
import database from '../firebase/firebase'

 
//CREATING ACTION GENERATORS..........................................

//ADD_ORDER : order reducer
export const addOrder = (order)=>({
    type:'ADD_ORDER',
    order
    
})


export const startAddOrder= (orderData = {})=> {
    return (dispatch) => {
        const {
            createdAt = moment().valueOf(), 
            customerName='', 
            description = "", 
            phoneNumber='', 
            orderEndTime = moment().add(20, 'minutes').valueOf(),
            address='',
            status={
                status:'confirmed',
                time:0
            },
            kotStatus={
                status:'not',
                time:0
            },
            billStatus={
                status:'not',
                time:0
            },
            foods=[],
            amount=0,
        
        } = orderData
        const order = {
            createdAt, 
            customerName, 
            description, 
            phoneNumber, 
            orderEndTime,
            address,
            status,
            kotStatus,
            billStatus,
            foods,
            amount
        }
        return database.ref('orders').push(order)
            .then((refOrder) => {
                dispatch(addOrder({
                    id:refOrder.key,
                    ...order
                }))
            })
    }
}








//REMOVE_ORDER : order reducer
export const removeOrder = ({id} = {}) => ({
    type:'REMOVE_ORDER',
    id
})

//EDIT_ORDER : order reducer
export const editOrder = (id, updates) => ({
    type:'EDIT_ORDER',
    id,
    updates

})


//SET_ORDERS : to get all orders detail from database
export const setOrders = (orders) => ({
    type:'SET_ORDERS',
    orders
})

export const startSetOrders = ()=> {
    return (dispatch) => {
        
        return database.ref('orders').once('value')
            .then((snapshot) => {
                console.log('Data is fetched')
                const orders = []
                snapshot.forEach((childSnapshot)=>{
                    orders.push({
                        
                        ...childSnapshot.val(),
                        id:childSnapshot.key
                    })
                })
                dispatch(setOrders(orders))
            })
            .catch((error)=>console.log('failed :', error))
    }
}
