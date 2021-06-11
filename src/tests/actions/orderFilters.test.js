import {setBoundryAmount, setKotStatusFilter, setStatusFilter, setPNoFilter, setEndDate,
setAddressFilter, setBillStatusFilter, setStartDate, setFoodFilter, 
sortByAmount, sortByDuration, sortByDate, setCustomerFilter} from '../../actions/orderFilters'

import moment from 'moment'


test ('should generate boundry amount filter action object', ()=>{
    const action = setBoundryAmount(1000)
    expect(action).toEqual({
        type:'SET_BOUNDRY_AMOUNT',
        boundryAmount:1000
    })
})

test ('should generate boundry amount filter action object with default value', ()=>{
    const action = setBoundryAmount()
    expect(action).toEqual({
        type:'SET_BOUNDRY_AMOUNT',
        boundryAmount:2000
    })
})


test ('should generate kot status filter action object', ()=>{
    const action = setKotStatusFilter('not')
    expect(action).toEqual({
        type:'SET_KOT_STATUS_FILTER',
        kotStatus:'not'
    })
})

test ('should generate bill status filter action object', ()=>{
    const action = setBillStatusFilter('not')
    expect(action).toEqual({
        type:'SET_BILL_STATUS_FILTER',
        billStatus:'not'
    })
})


test ('should generate status filter action object', ()=>{
    const action = setStatusFilter('confirmed')
    expect(action).toEqual({
        type:'SET_STATUS_FILTER',
        status:'confirmed'
    })
})



test ('should generate phoneNumber filter action object', ()=>{
    const action = setPNoFilter('0768564666')
    expect(action).toEqual({
        type:'SET_P_NO_FILTER',
        phoneNumber:'0768564666'
    })
})
test ('should generate phoneNumber filter action object with default value', ()=>{
    const action = setPNoFilter()
    expect(action).toEqual({
        type:'SET_P_NO_FILTER',
        phoneNumber:''
    })
})


test ('should generate customer name filter action object', ()=>{
    const action = setCustomerFilter('niva')
    expect(action).toEqual({
        type:'SET_CUSTOMER_FILTER',
        customerName:'niva'
    })
})
test ('should generate customer name filter action object with default value', ()=>{
    const action = setCustomerFilter()
    expect(action).toEqual({
        type:'SET_CUSTOMER_FILTER',
        customerName:''
    })
})



test ('should generate food filter action object', ()=>{
    const action = setFoodFilter('chic')
    expect(action).toEqual({
        type:'SET_FOOD_FILTER',
        food:'chic'
    })
})
test ('should generate food filter action object with default value', ()=>{
    const action = setFoodFilter()
    expect(action).toEqual({
        type:'SET_FOOD_FILTER',
        food:''
    })
})



test ('should generate address filter action object', ()=>{
    const action = setAddressFilter('mamangam')
    expect(action).toEqual({
        type:'SET_ADDRESS_FILTER',
        address:'mamangam'
    })
})
test ('should generate address filter action object' , ()=>{
    const action = setAddressFilter('mamangam')
    expect(action).toEqual({
        type:'SET_ADDRESS_FILTER',
        address:'mamangam'
    })
})




test ('should generate End date filter action object', ()=>{
    const action = setEndDate(123456)
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate:123456
    })
})


test ('should generate Start date filter action object', ()=>{
    const action = setStartDate(789456)
    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate:789456
    })
})



test ('should sort by date filter action object', ()=>{
    const action = sortByDate()
    expect(action).toEqual({
        type:'SORT_BY_DATE'
    })
})



test ('should sort by amount filter action object', ()=>{
    const action = sortByAmount()
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'
    })
})




test ('should sort by duration filter action object', ()=>{
    const action = sortByDuration()
    expect(action).toEqual({
        type:'SORT_BY_DURATION'
    })
})


