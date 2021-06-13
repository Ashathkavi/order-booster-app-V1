import React from 'react'
import {shallow} from 'enzyme'
import {EditOrderPage} from '../../../components/ManageOrder/EditOrderPage'
import sampleOrders from '../../../fixtures/sampleOrders'
import OrderForm from '../../../components/ManageOrder/OrderForm'


const sample_orders = sampleOrders()

let editOrderSpy, historySpy, wrapper, removeOrderSpy
 
beforeEach(()=>{
    editOrderSpy = jest.fn()
    removeOrderSpy = jest.fn()
    historySpy = {push: jest.fn()}
    wrapper = shallow(<EditOrderPage 
        editOrder={editOrderSpy} 
        removeOrder = {removeOrderSpy} 
        history={historySpy}     
        order = {sample_orders[0]}   
    />)
})

test('should render EditOrderPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find(OrderForm).prop('onSubmit')(sample_orders[1])
    expect(historySpy.push).toHaveBeenLastCalledWith('/order')
    expect(editOrderSpy).toHaveBeenLastCalledWith(sample_orders[0].id, sample_orders[1])
})

test('should handle onSubmit', () => {
    wrapper.find('button').simulate('click')
    expect(historySpy.push).toHaveBeenLastCalledWith('/order')
    expect(removeOrderSpy).toHaveBeenLastCalledWith(sample_orders[0].id)
})