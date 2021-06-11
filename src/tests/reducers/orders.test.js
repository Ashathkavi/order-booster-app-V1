import ordersReducer from '../../reducers/orders'
import sampleOrders from '../../fixtures/sampleOrders'
import SingleOrder from '../../components/ManageOrder/SingleOrder'
import moment from 'moment'

const sample_orders = sampleOrders()

test('should set default state', ()=>{
    const state = ordersReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual([])
})




test('should remove order by id', () => {
    const action = {
        type:'REMOVE_ORDER',
        id:sample_orders[0].id
    }
    const state = ordersReducer(sample_orders, action)
    expect(state).toEqual([sample_orders[1], sample_orders[2]])
})

test('should not remove order by id if id doesnt given', () => {
    const action = {
        type:'REMOVE_ORDER',
        id:-1
    }
    const state = ordersReducer(sample_orders, action)
    expect(state).toEqual(sample_orders)
})




test('should add order ', () => {
    const newOrder = {
        id:4,
        createdAt :moment().valueOf(), 
        customerName:'Rajah', 
        description : "more spicy", 
        phoneNumber:'0765165822', 
        orderEndTime : moment().add(30, 'minutes').valueOf(),
        address:'puliyantheevu',
        status:{
            status:'confirmed',
            time:moment().valueOf()
        },
        kotStatus:{
            status:'passed',
            time:moment().add(5, 'minutes').valueOf()
        },
        billStatus:{
            status:'printed',
            time:moment().add(5, 'minutes').valueOf()
        },
        foods:[new SingleOrder(sample_orders[0], 1), new SingleOrder(sample_orders[2], 1)],
        amount:2600
    }
    const action = {
        type:'ADD_ORDER',
        order:newOrder
    }
    const state = ordersReducer(sample_orders, action)
    expect(state).toEqual([...sample_orders, newOrder])
})






test('should edit order using id', () => {
    const updates = {
        orderEndTime : moment(0).add(40, 'minutes').valueOf(),
        address:'ds office',        
        foods:[new SingleOrder(sample_orders[1], 1), new SingleOrder(sample_orders[2], 1)],
        amount:3000
    }
    const action = {
        type:'EDIT_ORDER',
        id:sample_orders[0].id,
        updates
    }
    const state = ordersReducer(sample_orders, action)
    expect(state[0].orderEndTime).toBe(moment(0).add(40, 'minutes').valueOf())
    expect(state[0].address).toBe('ds office')
    expect(state[0].foods).toEqual([new SingleOrder(sample_orders[1], 1), new SingleOrder(sample_orders[2], 1)])
    expect(state[0].amount).toBe(3000)
})


test('should not edit food if id is wrong', () => {
    const updates = {
        orderEndTime : moment().add(40, 'minutes').valueOf(),
        address:'ds office',
        status:{
            status:'delivered',
            time:moment().valueOf()
        },
        kotStatus:{
            status:'passed',
            time:moment().add(5, 'minutes').valueOf()
        },
        billStatus:{
            status:'printed',
            time:moment().add(5, 'minutes').valueOf()
        },
        foods:[new SingleOrder(sample_orders[1], 1), new SingleOrder(sample_orders[2], 1)],
        amount:3000
    }
    const action = {
        type:'EDIT_ORDER',
        id:-1,
        updates
    }
    const state = ordersReducer(sample_orders, action)
    expect(state).toEqual(sample_orders)
})


