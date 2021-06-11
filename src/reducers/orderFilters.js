import moment from 'moment'

//ORDERFILTER REDUCER
const orderFilterReducerDefaultState = {
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
const orderFilterReducer = (state=orderFilterReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_ADDRESS_FILTER':
            return {...state,address:action.address}
        case 'SET_CUSTOMER_FILTER':
            return {...state,customerName:action.customerName}
        case 'SET_BOUNDRY_AMOUNT':
            return {...state,boundryAmount:action.boundryAmount}
        case 'SET_FOOD_FILTER':
            return {...state,food:action.food}
        case 'SET_P_NO_FILTER':
            return {...state,phoneNumber:action.phoneNumber}
        case 'SET_STATUS_FILTER':
            return {...state,status:action.status}
        case 'SET_KOT_STATUS_FILTER':
            return {...state,kotStatus:action.kotStatus}
        case 'SET_BILL_STATUS_FILTER':
            return {...state,billStatus:action.billStatus }
        case 'SORT_BY_DATE':
            return {...state, sortBy:'date'}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy:'amount'}
        case 'SORT_BY_DURATION':
            return {...state, sortBy:'duration'}
        case 'SET_START_DATE':
            return {...state, startDate:action.startDate}
        case 'SET_END_DATE':
            return {...state, endDate:action.endDate}
    default:
            return state
    }
}

export default orderFilterReducer