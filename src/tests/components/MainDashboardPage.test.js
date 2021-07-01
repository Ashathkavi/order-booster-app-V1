import React from 'react'
import {shallow} from 'enzyme'
import {MainDashboardPage} from '../../components/MainDashboardPage'

test('should render MainDashboardPage', () => {
    const wrapper = shallow(<MainDashboardPage startLogout={() => {}}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on button click', () => {
    const startLogoutSpy = jest.fn()
    const wrapper = shallow(<MainDashboardPage startLogout={startLogoutSpy}/>)
    wrapper.find('button').simulate('click')
    expect(startLogoutSpy).toHaveBeenCalled()
})