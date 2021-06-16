import React from 'react'
import {shallow} from 'enzyme'
import {AddOrderPage} from '../../../components/ManageOrder/AddOrderPage'
import sampleOrders from '../../../fixtures/sampleOrders'

const sample_orders = sampleOrders()

let startAddOrderSpy, historySpy, wrapper
 
beforeEach(()=>{
    startAddOrderSpy = jest.fn()
    historySpy = {push: jest.fn()}
    wrapper = shallow(<AddOrderPage startAddOrder={startAddOrderSpy} history={historySpy}/>)
})

test('should render AddOrderPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find('OrderForm').prop('onSubmit')(sample_orders[0])
    expect(historySpy.push).toHaveBeenLastCalledWith('/order')
    expect(startAddOrderSpy).toHaveBeenLastCalledWith(sample_orders[0])
})