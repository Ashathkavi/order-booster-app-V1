import orderFiltersReducer from '../../reducers/orderFilters'
import moment from 'moment'

const defaultState = {
    address:'',
    customerName:'',
    boundryAmount:20000,
    food:'',
    phoneNumber:'',
    status:'',
    kotStatus:'',
    billStatus:'',
    sortBy:'date', // date or amount or duration
    startDate:moment().startOf('month').valueOf(),
    endDate:moment().endOf('month').valueOf()
}

test('should setup default filter value', () => {
    const state = orderFiltersReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual({
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', // date or amount or duration
        startDate:moment().startOf('month').valueOf(),
        endDate:moment().endOf('month').valueOf()
    })
})


test('should set address', () => {
    const action = {
        type:'SET_ADDRESS_FILTER',
        address:'mama'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.address).toEqual('mama')
})

test('should set customer name', () => {
    const action = {
        type:'SET_CUSTOMER_FILTER',
        customerName:'ash'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.customerName).toEqual('ash')
})

test('should set boundry amount', () => {
    const action = {
        type:'SET_BOUNDRY_AMOUNT',
        boundryAmount:5000
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.boundryAmount).toEqual(5000)
})

test('should set food', () => {
    const action = {
        type:'SET_FOOD_FILTER',
        food:'chi'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.food).toEqual('chi')
})

test('should set phoneNumber', () => {
    const action = {
        type:'SET_P_NO_FILTER',
        phoneNumber:'0765'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.phoneNumber).toEqual('0765')
})


test('should set status', () => {
    const action = {
        type:'SET_STATUS_FILTER',
        status:'regular'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.status).toEqual('regular')
})

test('should set kot status', () => {
    const action = {
        type:'SET_KOT_STATUS_FILTER',
        kotStatus:'passed'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.kotStatus).toEqual('passed')
})

test('should set bill status', () => {
    const action = {
        type:'SET_BILL_STATUS_FILTER',
        billStatus:'printed'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.billStatus).toEqual('printed')
})

test('should sort by date', () => {
    const action = {
        type:'SORT_BY_DATE',
        sortBy:'date'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.sortBy).toEqual('date')
})


test('should sort by amount', () => {
    const action = {
        type:'SORT_BY_AMOUNT',
        sortBy:'amount'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.sortBy).toEqual('amount')
})


test('should sort by duration', () => {
    const action = {
        type:'SORT_BY_DURATION',
        sortBy:'duration'
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.sortBy).toEqual('duration')
})



test('should set start date', () => {
    const action = {
        type:'SET_START_DATE',
        startDate:123456
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.startDate).toEqual(123456)
})


test('should set end date', () => {
    const action = {
        type:'SET_END_DATE',
        endDate:123456
    }
    const state = orderFiltersReducer(defaultState, action)
    expect(state.endDate).toEqual(123456)
})

