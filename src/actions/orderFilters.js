

//SET_ADDRESS_FILTER : order filter reducer
export const setAddressFilter = (address='') => ({
    type:'SET_ADDRESS_FILTER',
    address
})

//SET_CUSTOMER_FILTER : order filter reducer
export const setCustomerFilter = (customerName='') => ({
    type:'SET_CUSTOMER_FILTER',
    customerName
})


//SET_BOUNDRY_AMOUNT : order filter reducer
export const setBoundryAmount = (boundryAmount=2000) => ({
    type:'SET_BOUNDRY_AMOUNT',
    boundryAmount
})

//SET_FOOD_FILTER : order filter reducer
export const setFoodFilter = (food='') => ({
    type:'SET_FOOD_FILTER',
    food
})

//SET_P_NO_FILTER : order filter reducer
export const setPNoFilter = (phoneNumber='') => ({
    type:'SET_P_NO_FILTER',
    phoneNumber
})

//SET_DELIVERMETH_FILTER : order filter reducer
export const setDeliverMethFilter = (deliverMeth='') => ({
    type:'SET_DELIVERMETH_FILTER',
    deliverMeth
})

//SET_STATUS_FILTER : order filter reducer
export const setStatusFilter = (status='') => ({
    type:'SET_STATUS_FILTER',
    status
})

// //SET_KOT_STATUS_FILTER : order filter reducer
// export const setKotStatusFilter = (kotStatus='') => ({
//     type:'SET_KOT_STATUS_FILTER',
//     kotStatus
// })

// //SET_BILL_STATUS_FILTER : order filter reducer
// export const setBillStatusFilter = (billStatus='') => ({
//     type:'SET_BILL_STATUS_FILTER',
//     billStatus
// })

//SORT_BY_DATE : order filter reducer
export const sortByDate = () => ({
    type:'SORT_BY_DATE'
}) 
//SORT_BY_AMOUNT : order filter reducer
export const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT'
}) 
//SORT_BY_DURATION : order filter reducer
export const sortByDuration = () => ({
    type:'SORT_BY_DURATION'
})
//SET_START_DATE : order filter reducer
export const setStartDate = (startDate = undefined) => ({
    type:'SET_START_DATE',
    startDate
}) 
//SET_END_DATE : order filter reducer
export const setEndDate = (endDate = undefined) => ({
    type:'SET_END_DATE',
    endDate
}) 
