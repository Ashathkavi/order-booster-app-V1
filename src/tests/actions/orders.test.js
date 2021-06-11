
import {addOrder, removeOrder, editOrder} from '../../actions/orders'
import sampleFoods from '../../fixtures/sampleFoods'

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
        amount:2000,

    }
    const action = addOrder(orderData)
    expect(action).toEqual({
        type:'ADD_ORDER',
        order:{
            ...orderData,
            id:expect.any(String)
        }
    })
})



test('should setup add order action object with default value', ()=>{
    const orderData = {
        //createdAt = 123456, 
        customerName:'', 
        description :"", 
        phoneNumber:'', 
        //orderEndTime = 123456,
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
    const action = addOrder()
    expect(action).toEqual({
        type:'ADD_ORDER',
        order:{
            ...orderData,
            id:expect.any(String),
            createdAt:expect.any(Number) ,
            orderEndTime:expect.any(Number)         

        }
    })
})