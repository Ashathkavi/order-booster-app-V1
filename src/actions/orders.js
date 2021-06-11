import uuid from 'uuid'
import moment from 'moment'

 
//CREATING ACTION GENERATORS..........................................

//ADD_ORDER : order reducer
export const addOrder = ({
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

} = {})=>({
    type:'ADD_ORDER',
    order:{
        id:uuid(),
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
    
})

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