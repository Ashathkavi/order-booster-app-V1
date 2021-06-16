import moment from 'moment'
import {addOrder, removeOrder, editOrder, startAddOrder} from '../../actions/orders'
import sampleFoods from '../../fixtures/sampleFoods'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

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
        console.log(actions[0])
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


