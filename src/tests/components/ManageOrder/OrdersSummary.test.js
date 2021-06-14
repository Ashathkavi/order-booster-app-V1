import React from 'react'
import {shallow} from 'enzyme'
import {OrdersSummary} from '../../../components/ManageOrder/OrdersSummary'


test('should correctly render OrdersSummary with 1 order', ()=>{
    const wrapper = shallow(<OrdersSummary ordersCount={1} ordersTotal={225}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should correctly render OrdersSummary with multiple orders', ()=>{
    const wrapper = shallow(<OrdersSummary ordersCount={13} ordersTotal={12355}/>)
    expect(wrapper).toMatchSnapshot()
})