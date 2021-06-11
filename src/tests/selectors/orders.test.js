import selectOrders from '../../selectors/orders'
import sampleOrders from '../../fixtures/sampleOrders'
import moment from 'moment'

const sample_orders = sampleOrders()
const orders_sample = [
    {
        ...sample_orders[0]
    },{
        ...sample_orders[1]
    },{
        ...sample_orders[2]
    }
]


test('should filter by address value', () => {
    const filters = {
        address:'mam',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([sample_orders[2], sample_orders[0]])
})


test('should filter by customer Name value', () => {
    const filters = {
        address:'',
        customerName:'ash',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([sample_orders[1], sample_orders[0]])
})


test('should filter by boundry amount Name value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:2000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([sample_orders[1], sample_orders[0]])
})


test('should filter by food Name value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'be',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([sample_orders[0]])
})



test('should filter by phonenumber Name value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'07658',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([sample_orders[1], sample_orders[0]])
})

test('should filter by status value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'confirmed',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[0]])
})

test('should filter by kot status value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'passed',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[1], sample_orders[0]])
})

test('should filter by bill status value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'printed',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[1], sample_orders[0]])
})


test('should sort by date value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[2], sample_orders[1], sample_orders[0]])
})


test('should sort by amount value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'amount', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[2], sample_orders[0], sample_orders[1]])
})


test('should sort by duration value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'duration', 
        startDate:undefined,
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[0], sample_orders[2], sample_orders[1]])
})



test('should filter by start date value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:moment().add(2, 'days').valueOf(),
        endDate:undefined,
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[2], sample_orders[1]])
})


test('should filter by end date value', () => {
    const filters = {
        address:'',
        customerName:'',
        boundryAmount:20000,
        food:'',
        phoneNumber:'',
        status:'',
        kotStatus:'',
        billStatus:'',
        sortBy:'date', 
        startDate:undefined,
        endDate:moment().add(7, 'days').valueOf(),
    }
    const result = selectOrders(orders_sample, filters)
    expect(result).toEqual([ sample_orders[1], sample_orders[0]])
})
