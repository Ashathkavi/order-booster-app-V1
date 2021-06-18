import moment from 'moment'
import {addOrder, removeOrder, editOrder, startAddOrder, setOrders, startSetOrders, startRemoveOrder, startEditOrder} from '../../actions/orders'
import sampleFoods from '../../fixtures/sampleFoods'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import sampleOrders from '../../fixtures/sampleOrders'

const createMockStore = configureMockStore([thunk])


beforeEach((done) => {
    const orderData = {}
    sampleOrders().forEach(({
        id,
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
    }) => {
        orderData[id] = {
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
        //console.log(orderData[id])
    })
    //console.log(orderData)
    database.ref('orders').set(orderData).then(()=>done())
})

class SingleOrder{
    constructor(food, foodQuantity){
        this.food = food
        this.foodQuantity = foodQuantity
    }
}

test('should setup remove order action object', ()=>{
    const action = removeOrder({id:'123abc'})
    expect(action).toEqual({
        type:'REMOVE_ORDER',
        id:'123abc'
    })
})

test('should setup remove order from database and store', (done)=>{
    const store = createMockStore({})
    const id = sampleOrders()[0].id
    store.dispatch(startRemoveOrder({id})).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'REMOVE_ORDER',
            id
        })
        return database.ref(`orders/${id}`).once('value')        
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val()).toBeFalsy()
        done()
    })

})


test('should setup edit order action object', ()=>{
    const updates = {
        customerName:'Ashath',
        phoneNumber:'0768571126'
    }
    const action = editOrder('123abc', updates)
    expect(action).toEqual({
        type:'EDIT_ORDER',
        id:'123abc',
        updates
    })
})

test('should setup edit order from database and store', (done)=>{
    const store = createMockStore({})
    const id = sampleOrders()[0].id
    const updates = {customerName :'Pradap'}
    store.dispatch(startEditOrder(id, updates)).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'EDIT_ORDER',
            id,
            updates
        })
        return database.ref(`orders/${id}`).once('value')        
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val().customerName).toBe(updates.customerName)
        done()
    })

})




test('should setup add order action object with provided value', ()=>{
    const orderData = {
        createdAt:123456, 
        customerName:'Ashath', 
        description : "less spicy", 
        phoneNumber:'0768571126', 
        orderEndTime : 123456,
        address:'mamangam',
        status:{
            status:'confirmed',
            time:123
        },
        kotStatus:{
            status:'Not passed',
            time:123
        },
        billStatus:{
            status:'Not Printed',
            time:123
        },
        foods:[new SingleOrder(sampleFoods()[0], 3), new SingleOrder(sampleFoods()[2], 3)],
        amount:2000

    }
    const action = addOrder(orderData)
    expect(action).toEqual({
        type:'ADD_ORDER',
        order:{
            ...orderData
        }
    })
})


test('should add orders to database and store', (done) => {
    const store = createMockStore({})
    const orderData = {
        createdAt:123456, 
        customerName:'Ashath', 
        description : "less spicy", 
        phoneNumber:'0768571126', 
        orderEndTime : 123456,
        address:'mamangam',
        status:{
            status:'confirmed',
            time:123
        },
        kotStatus:{
            status:'Not passed',
            time:123
        },
        billStatus:{
            status:'Not Printed',
            time:123
        },
        foods:[new SingleOrder(sampleFoods()[0], 3), new SingleOrder(sampleFoods()[2], 3)],
        amount:2000
    }
    store.dispatch(startAddOrder(orderData)).then(()=>{
        const actions = store.getActions()
        //console.log(actions[0])
        expect(actions[0]).toEqual({
            type:'ADD_ORDER',
            order:{
                id:expect.any(String),
                ...orderData
            }
        })
        return database.ref(`orders/${actions[0].order.id}`).once('value')
        
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val()).toEqual(orderData)
        done()
    })
})


test('should add orders with default to database and store', (done) => {
    const store = createMockStore({})
    const orderData = {
        createdAt :moment().valueOf(), 
        customerName:'', 
        description : "", 
        phoneNumber:'', 
        orderEndTime : moment().add(20, 'minutes').valueOf(),
        address:'',
        status:{
            status:'confirmed',
            time:0
        },
        kotStatus:{
            status:'not',
            time:0
        },
        billStatus:{
            status:'not',
            time:0
        },
        foods:[],
        amount:0,
    }
    store.dispatch(startAddOrder()).then(()=>{
        const actions = store.getActions()
        //console.log(actions[0])
        expect(actions[0]).toEqual({
            type:'ADD_ORDER',
            order:{
                id:expect.any(String),
                ...orderData
            }
        })
        return database.ref(`orders/${actions[0].order.id}`).once('value')
        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual({
            createdAt :moment().valueOf(), 
            customerName:'', 
            description : "", 
            phoneNumber:'', 
            orderEndTime : moment().add(20, 'minutes').valueOf(),
            address:'',
            status:{
                status:'confirmed',
                time:0
            },
            kotStatus:{
                status:'not',
                time:0
            },
            billStatus:{
                status:'not',
                time:0
            },
            amount:0
        })
        done()
    })
})





test('shoukd setup set orders action obvject eith data', ()=>{
    const action = setOrders(sampleOrders())
    expect(action).toEqual({
        type:'SET_ORDERS',
        orders:sampleOrders()
    })
})



test('should fetch order from the database and store at store', (done)=>{
    const store = createMockStore({})
    store.dispatch(startSetOrders()).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'SET_ORDERS',
            orders:sampleOrders()
        })
        done()
    })
})


