import React from 'react'
import {shallow} from 'enzyme'
import {OrderListFilters} from '../../../components/ManageOrder/OrderListFilters'
import {orderFilter, altOrderFilter} from '../../../fixtures/sampleOrderFilters'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { setStartDate } from '../../../actions/orderFilters'

let setAddressFilterSpy, setCustomerFilterSpy, setBoundryAmountSpy, setFoodFilterSpy
let wrapper, setPNoFilterSpy, setStatusFilterSpy, setKotStatusFilterSpy, setBillStatusFilterSpy
let sortByDateSpy, sortByAmountSpy, sortByDurationSpy, setStartDateSpy, setEndDateSpy


beforeEach(() => {
    setAddressFilterSpy = jest.fn()
    setCustomerFilterSpy = jest.fn()
    setBoundryAmountSpy = jest.fn()
    setFoodFilterSpy = jest.fn()
    setPNoFilterSpy = jest.fn()
    setStatusFilterSpy = jest.fn()
    setKotStatusFilterSpy = jest.fn()
    setBillStatusFilterSpy = jest.fn()
    sortByDateSpy = jest.fn()
    sortByAmountSpy = jest.fn()
    sortByDurationSpy = jest.fn()
    setStartDateSpy = jest.fn()
    setEndDateSpy = jest.fn()
    wrapper = shallow(
        <OrderListFilters 
            filters={orderFilter}
            setAddressFilter = {setAddressFilterSpy}
            setCustomerFilter = {setCustomerFilterSpy}
            setBoundryAmount = {setBoundryAmountSpy}
            setFoodFilter = {setFoodFilterSpy}
            setPNoFilter = {setPNoFilterSpy}
            setStatusFilter = {setStatusFilterSpy}
            setKotStatusFilter = {setKotStatusFilterSpy}
            setBillStatusFilter = {setBillStatusFilterSpy}
            sortByDate = {sortByDateSpy}
            sortByAmount = {sortByAmountSpy}
            sortByDuration = {sortByDurationSpy}
            setStartDate = {setStartDateSpy}
            setEndDate = {setEndDateSpy}
        />
    )
})

test('should render OrderList Coorectly', ()=>{
    expect(wrapper).toMatchSnapshot()
})

test('should render OrderList with alternate order filter', ()=>{
    wrapper.setProps({
        filters:altOrderFilter
    })
    expect(wrapper).toMatchSnapshot()
})


test('should handle setAddressFilter', () => {
    const value = 'mama'
    wrapper.find('input').at(0).simulate('change', {
        
        persist: () => { },
        target:{value}
    })
    expect(setAddressFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setCustomerFilter', () => {
    const value = 'push'
    wrapper.find('input').at(1).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setCustomerFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setFoodFilterS', () => {
    const value = 'chi'
    wrapper.find('input').at(2).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setFoodFilterSpy).toHaveBeenLastCalledWith(value)
})

test('should handle setPNoFilter', () => {
    const value = 'chi'
    wrapper.find('input').at(3).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setPNoFilterSpy).toHaveBeenLastCalledWith(value)
})

test('should handle setboundryAmount', () => {
    const value = '0756'
    wrapper.find('input').at(4).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setBoundryAmountSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setStatusFilter', () => {
    const value = 'conf'
    wrapper.find('select').at(0).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setStatusFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setKotStatusFilter', () => {
    const value = 'conf'
    wrapper.find('select').at(1).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setKotStatusFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setBillStatusFilter', () => {
    const value = 'conf'
    wrapper.find('select').at(2).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(setBillStatusFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle sortbyamount', () => {
    const value = 'amount'
    wrapper.find('select').at(3).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(sortByAmountSpy).toHaveBeenCalled()
})


test('should handle sortByDate', () => {
    const value = 'date'
    wrapper.find('select').at(3).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(sortByDateSpy).toHaveBeenCalled()
})


test('should handle sortbyduration', () => {
    const value = 'duration'
    wrapper.find('select').at(3).simulate('change', {
        persist: () => { },
        target:{value}
    })
    expect(sortByDurationSpy).toHaveBeenCalled()
})





test('should handle category modal clossing', () => {
    const startDate = moment().startOf('month')
    const endDate =moment().endOf('month')
    wrapper.find(DatePicker).prop('onChange')([startDate.toDate(), endDate.toDate()]);    
    expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate.valueOf())
    expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate.valueOf())
})

