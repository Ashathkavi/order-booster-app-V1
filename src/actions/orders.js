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
            discount=0,
            serviceCharge=0,
            // kotStatus={
            //     status:'not',
            //     time:0
            // },
            // billStatus={
            //     status:'not',
            //     time:0
            // },
            foods=[],
            amount=0,
            deliverer='',
            deliverMeth='',
            count=0
        
        } = orderData
        const order = {
            createdAt, 
            customerName, 
            description, 
            phoneNumber, 
            orderEndTime,
            address,
            status,
            discount,
            serviceCharge,
            // kotStatus,
            // billStatus,
            foods,
            amount,
            deliverer,
            deliverMeth,
            count,
        }
        return database.ref('orders').push(order)
            .then((refOrder) => {
                console.log('Data is Saved')
                database.ref(`orders/${refOrder.key}`).once('value').then((snap)=>{
                    if(!snap.val()){
                        dispatch(addOrder({
                            id:refOrder.key,
                            ...order
                        }))
                    }
                    
                })
                
            })
    }
}








//REMOVE_ORDER : order reducer
export const removeOrder = ({id} = {}) => ({
    type:'REMOVE_ORDER',
    id
})

export const startRemoveOrder = ({id} = {})=> {
    return (dispatch) => {        
        return database.ref(`orders/${id}`).remove()
            .then(() => {
                console.log('Data is removed')
                dispatch(removeOrder({id}))
            })
            .catch((error)=>console.log('failed :', error))
    }
}

//EDIT_ORDER : order reducer
export const editOrder = (id, updates) => ({
    type:'EDIT_ORDER',
    id,
    updates

})

const findChangedFields = (updates, prev) => {

    let changedUpdates = {}
    let unChangedOrder = {}
    let keys = ['address', 'amount', 'createdAt', 'customerName', 'deliverMeth', 'deliverer', 'description',
         'discount', 'orderEndTime', 'phoneNumber', 'serviceCharge']

    keys.map((key)=>{
        if(updates[`${key}`] !== prev[`${key}`]){
            changedUpdates = {...changedUpdates, [key]:updates[`${key}`]}
            unChangedOrder = {...unChangedOrder, [key]:prev[`${key}`]}
        }
    })

    

    if(updates.status.status !== prev.status.status){
        changedUpdates = {...changedUpdates, status:updates.status}
        unChangedOrder = {...unChangedOrder, status:prev.status}
    }

   // console.log('JSON.stringify(updates.foods', JSON.stringify(updates.foods))
   // console.log('JSON.stringify(prev.foods', JSON.stringify(prev.foods))

    if(JSON.stringify(updates.foods) !== JSON.stringify(prev.foods)){
        //console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        changedUpdates = {...changedUpdates, foods:updates.foods}
        unChangedOrder = {...unChangedOrder, foods:prev.foods}
    }
    
    console.log('updates', updates)
    console.log('prev', prev)

    console.log('unChangedOrder', unChangedOrder)
    console.log('changedUpdates', changedUpdates)
    
    return {changedUpdates, unChangedOrder}
}

export const startEditOrder = (id, updates, prev)=> {
    let todayStart = moment().startOf('day').valueOf()
    let now = moment().valueOf()

    return (dispatch) => {        
        return database.ref(`orders/${id}`).update(updates)
            .then(() => {
                console.log('Data is updated')
                dispatch(editOrder(id, updates))
                database.ref(`orders/changed/${todayStart}`).push({
                    ...findChangedFields(updates, prev),
                    id:prev.id,
                    changedAt:now
                })
            })
            .catch((error)=>console.log('failed :', error))
    }
}


//SET_ORDERS : to get all orders detail from database
export const setOrders = (orders) => ({
    type:'SET_ORDERS',
    orders
})

export const startSetOrders = ()=> {
    return (dispatch) => {
        
        return database.ref('orders').once('value').then((snapshot) => {
            console.log('Data is fetched')
            const orders = []
            snapshot.forEach((childSnapshot)=>{
                if(childSnapshot.key !== 'changed'){
                    orders.push({
                    
                        ...childSnapshot.val(),
                        id:childSnapshot.key
                    })
                }
                
            })
            dispatch(setOrders(orders))
        }).catch((e)=>{  console.log('Error with data fetching: ', e)})
    }
}


export const onStartSetOrders = ()=> {
    return (dispatch) => {
        return database.ref('orders').on('value', (snapshot) => {
            console.log('snapshot.val()',snapshot.val())
            const orders = []
            snapshot.forEach((childSnapshot)=>{
                if(childSnapshot.key !== 'changed'){
                    orders.push({
                        ...childSnapshot.val(),
                        id:childSnapshot.key
                    })
                }
                
            })
            //console.log('llllllll')
            dispatch(setOrders(orders))
        })
    }
    
}

export const offStartSetOrders = ()=> {
    database.ref('orders').off('value')
    
}