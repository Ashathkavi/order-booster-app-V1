import React from 'react'
import {shallow} from 'enzyme'
import MainDashboardPage from '../../components/MainDashboardPage'

test('should render MainDashboardPage', () => {
    const wrapper = shallow(<MainDashboardPage />)
    expect(wrapper).toMatchSnapshot()
})

