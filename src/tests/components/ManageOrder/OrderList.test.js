import React from 'react'
import {shallow} from 'enzyme'
import {OrderList} from '../../../components/ManageOrder/OrderList'
import sampleOrders from '../../../fixtures/sampleOrders'

const sample_orders = sampleOrders()

test('should render order list with orders', () => {
    const wrapper = shallow(<OrderList orders={sample_orders} autherizedAs='admin'/>)
    expect(wrapper).toMatchSnapshot()
})


test('should render order list with orders empty message', () => {
    const wrapper = shallow(<OrderList orders={[]}/>)
    expect(wrapper).toMatchSnapshot()
})

