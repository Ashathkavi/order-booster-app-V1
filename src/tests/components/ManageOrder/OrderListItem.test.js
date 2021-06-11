import React from 'react'
import {shallow} from 'enzyme'
import {OrderListItem} from '../../../components/ManageOrder/OrderListItem'
import sampleOrders from '../../../fixtures/sampleOrders'

const sample_orders = sampleOrders()

test('should render order list Item with a order', () => {
    const wrapper = shallow(<OrderListItem {...sample_orders[0]}/>)
    expect(wrapper).toMatchSnapshot()
})

