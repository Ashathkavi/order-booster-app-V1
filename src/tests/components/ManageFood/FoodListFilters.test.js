import React from 'react'
import {shallow} from 'enzyme'
import {FoodListFilters} from '../../../components/ManageFood/FoodListFilters'
import {foodFilters, altFoodFilters} from '../../../fixtures/sampleFoodFilters'
import CategoryModal from '../../../components/ManageFood/CategoryModal'
import Modal from 'react-modal'

let setNameFilterSpy, setCatTextFilterSpy, setBoundryAmountSpy, setSizeSpy, wrapper

beforeEach(() => {
    setNameFilterSpy = jest.fn()
    setCatTextFilterSpy = jest.fn()
    setBoundryAmountSpy = jest.fn()
    setSizeSpy = jest.fn()
    wrapper = shallow(
        <FoodListFilters 
            filters={foodFilters}
            setBoundryAmount = {setBoundryAmountSpy}
            setCatTextFilter = {setCatTextFilterSpy}
            setNameFilter ={setNameFilterSpy}
            setSize = {setSizeSpy}
        />
    )
})

test('should render FoodList Coorectly', ()=>{
    expect(wrapper).toMatchSnapshot()
})

test('should render FoodList with alternate food filter', ()=>{
    wrapper.setProps({
        filters:altFoodFilters
    })
    expect(wrapper).toMatchSnapshot()
})


test('should handle onBoundryChange', () => {
    const value = 500
    wrapper.find('input').at(1).simulate('change', {
        
        persist: () => { },
        target:{value}
    })
    expect(setBoundryAmountSpy).toHaveBeenLastCalledWith(value)
})

test('should handle setNameFilter', () => {
    const value = 'soup'
    wrapper.find('input').at(0).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(setNameFilterSpy).toHaveBeenLastCalledWith(value)
})


test('should handle setSize', () => {
    const value = 'full'
    wrapper.find('select').first().simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(setSizeSpy).toHaveBeenLastCalledWith(value)
})


test('should handle category modal opening', () => {
    wrapper.find('button').first().simulate('click')    
    expect(wrapper.find(CategoryModal).prop('modalIsOpen')).toBe(true)
})


test('should handle category modal clossing', () => {
    wrapper.find('button').first().simulate('click')
    wrapper.find(CategoryModal).prop('handleCloseModal')();    
    expect(wrapper.find(CategoryModal).prop('modalIsOpen')).toBe(false)
})

test('should handle onchange category', () => {
    const value = 'fried rice'
    wrapper.find(CategoryModal).prop('handleCategory')(value);    
    expect(setCatTextFilterSpy).toHaveBeenLastCalledWith(value)
})

