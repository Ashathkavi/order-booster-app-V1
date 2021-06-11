import React from 'react'
import {shallow} from 'enzyme'
import {OrderForm} from '../../../components/ManageOrder/OrderForm'
import sampleOrders from '../../../fixtures/sampleOrders'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import {OrderModal} from '../../../components/ManageOrder/OrderModal'
import FoodSingleOrder from '../../../components/ManageOrder/FoodSingleOrder'


const sample_order = sampleOrders()
const now = moment().valueOf()

test('should render OrderForm correctly', () => {
    const wrapper = shallow(<OrderForm/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render OrderForm correctly with order date', () => {
    const wrapper = shallow(<OrderForm order= {sample_order[0]}/>)
    expect(wrapper).toMatchSnapshot()
})



test('should render error for invalid form submission', () => {
    const wrapper = shallow(<OrderForm/>)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})



test('should set customer name on input change', () => {
    const value = 'Divasthan'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('input').at(0).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('customerName')).toBe(value)
})

test('should set phoneNumber on input change', () => {
    const value = '0762352885'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('phoneNumber')).toBe(value)
})

test('should set address on input change', () => {
    const value = 'kallady'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('input').at(2).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('address')).toBe(value)
})

test('should set description on input change', () => {
    const value = 'less spicy'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('textarea').at(0).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set status on input change', () => {
    const value = 'confirmed'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('select').at(0).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('status')).toBe(value)
    expect(wrapper.state('statusTime')).toBe(moment().valueOf())
})

test('should set kot status on input change', () => {
    const value = 'passed'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('select').at(1).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('kotStatus')).toBe(value)
    expect(wrapper.state('kotStatusTime')).toBe(moment().valueOf())
})

test('should set bill status on input change', () => {
    const value = 'printed'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('select').at(2).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('billStatus')).toBe(value)
    expect(wrapper.state('billStatusTime')).toBe(moment().valueOf())
})

test('should set duration on input change', () => {
    const value = '20'
    const wrapper = shallow(<OrderForm/>)
    wrapper.find('select').at(3).simulate('change', {
        target:{value},
        persist: () => { }
    })
    const orderEndTime = moment().add(value,'minutes').valueOf()
    expect(wrapper.state('orderEndTime')).toBe(orderEndTime)
})


test('should call onSubmit props for valid form submission', () => {
    let billAmount = 0
    sample_order[0].foods.map((food)=>billAmount=(food.food.amount*food.foodQuantity )+ billAmount)
    
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<OrderForm order={sample_order[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault:() => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        address:sample_order[0].address,
        amount:billAmount,
        createdAt:sample_order[0].createdAt,
        billStatus:sample_order[0].billStatus,
        customerName:sample_order[0].customerName,
        description:sample_order[0].description,
        foods:sample_order[0].foods,
        kotStatus:sample_order[0].kotStatus, 
        orderEndTime:sample_order[0].orderEndTime,
        phoneNumber:sample_order[0].phoneNumber,
        status:sample_order[0].status 
    
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<OrderForm/>)
    wrapper.find(DatePicker).prop('onChange')(now.toDate())
    expect(wrapper.state('createdAt')).toEqual(now.valueOf())

})


test('should toggle the modal visibility  when click the add food buttton', () => {
    const wrapper = shallow(<OrderForm/>)
    //console.log(wrapper.state('isModalOpen'))
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('isModalOpen')).toEqual(true)

})

test('should toggle the modal visibility  when close the modal ', () => {
    const wrapper = shallow(<OrderForm/>)
    //console.log(wrapper.state('isModalOpen'))
    wrapper.find('button').at(0).simulate('click')
    //console.log(wrapper.state('isModalOpen'))
    wrapper.find(OrderModal).prop('onVisibleChange')()
    expect(wrapper.state('isModalOpen')).toEqual(false)

})


test('should set new foods on food selection', () => {
    const newSingleOrder = sample_order[0].foods
    const wrapper = shallow(<OrderForm/>)
    wrapper.find(OrderModal).prop('onSingleOrderChange')(newSingleOrder)
    expect(wrapper.state('foods')).toEqual(newSingleOrder)

})


test('should remove 1st singleorder food', () => {
    const positionOfSingleOrder = 0
    const newSingleOrder = sample_order[0].foods
    const wrapper = shallow(<OrderForm/>)
    wrapper.find(OrderModal).prop('onSingleOrderChange')(newSingleOrder);
    wrapper.find(FoodSingleOrder).at(positionOfSingleOrder).prop('onRemoveSingleOrder')(positionOfSingleOrder)
    expect(wrapper.state('foods')).toEqual([newSingleOrder[1]])

})

test('should remove 2nd singleorder food', () => {
    const positionOfSingleOrder = 1
    const newSingleOrder = sample_order[0].foods
    const wrapper = shallow(<OrderForm/>)
    wrapper.find(OrderModal).prop('onSingleOrderChange')(newSingleOrder);
    wrapper.find(FoodSingleOrder).at(positionOfSingleOrder).prop('onRemoveSingleOrder')(positionOfSingleOrder)
    expect(wrapper.state('foods')).toEqual([newSingleOrder[0]])

})

test(' shoul calculate bill amount corectly',()=>{
    
})

