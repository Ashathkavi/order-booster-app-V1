import moment from 'moment'


const orderFilter = {
    address:'',
    customerName:'',
    boundryAmount:20000,
    food:'',
    phoneNumber:'',
    status:'',
    // kotStatus:'',
    // billStatus:'',
    sortBy:'date', // date or amount or duration
    startDate:moment().startOf('month').valueOf(),
    endDate:moment().endOf('month').valueOf()

}

const altOrderFilter = {
    address:'mama',
    customerName:'',
    boundryAmount:20000,
    food:'',
    phoneNumber:'',
    status:'',
    // kotStatus:'',
    // billStatus:'',
    sortBy:'date', // date or amount or duration
    startDate:moment().startOf('month').valueOf(),
    endDate:moment().endOf('month').valueOf()

}

export {orderFilter, altOrderFilter}

