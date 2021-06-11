import React from 'react'
import {shallow} from 'enzyme'
import FoodForm from '../../../components/ManageFood/FoodForm'
import sampleFoods from '../../../fixtures/sampleFoods'
import CategoryModal from '../../../components/ManageFood/CategoryModal'


const sample_foods = sampleFoods()

test('should render FoodForm correctly', () => {
    const wrapper = shallow(<FoodForm/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render FoodForm correctly with food date', () => {
    const wrapper = shallow(<FoodForm food= {sample_foods[0]}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should render error for invalid form submission', () => {
    const wrapper = shallow(<FoodForm/>)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0)
    expect(wrapper).toMatchSnapshot()
})



test('should set size on input change', () => {
    const value = 'regular'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('input').at(6).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('foodSize')).toBe(value)
})


test('should set availability change on input change', () => {
    const valueFullAvailability = false
    const valueSize = 'regular'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('input').at(3).simulate('change', {
        target:{valueFullAvailability},
        persist: () => { }
    })
    wrapper.find('input').at(4).simulate('change', {
        target:{valueSize},
        persist: () => { }
    })
    expect(wrapper.state('foodSize')).toBe(valueSize)
    expect(wrapper.state('fullAvailability')).toBe(valueFullAvailability)
})


test('should not set size as full is availability is false ', () => {
    const valueFullAvailability = false
    const valueSizeFull = 'full'
    const valueSizeRegular = 'regular'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('input').at(3).simulate('change', {
        target:{valueFullAvailability},
        persist: () => { }
    })
    wrapper.find('input').at(4).simulate('change', {
        target:{valueSizeFull},
        persist: () => { }
    })
    
    expect(wrapper.state('fullAvailability')).toBe(valueFullAvailability)
    expect(wrapper.state('foodSize')).toBe(valueSizeRegular)
})


test('should set name on input change', () => {
    const value = 'chicken soup'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('name')).toBe(value)
})

test('should set amount on input change', () => {
    const value = 25
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('input').at(2).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('amount')).toBe(value)
})


test('should set description on textarea change', () => {
    const value = 'more spicy soup'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find('textarea').at(0).simulate('change', {
        target:{value},
        persist: () => { }
    })
    expect(wrapper.state('description')).toBe(value)
})



test('should call onSubmit props for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<FoodForm food={sample_foods[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault:() => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        name:sample_foods[0].name,
        amount:sample_foods[0].amount,
        createdAt:sample_foods[0].createdAt,
        description:sample_foods[0].description,
        largeAvailability:sample_foods[0].largeAvailability,
        foodSize:sample_foods[0].foodSize,
        category:sample_foods[0].category
    
    })
})


test('should set the modal visibility  when click the category buttton', () => {
    const wrapper = shallow(<FoodForm/>)
    //console.log(wrapper.state('isModalOpen'))
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.state('modalIsOpen')).toEqual(true)
})


test('should set the modal visibility  when close the modal ', () => {
    const wrapper = shallow(<FoodForm/>)
    wrapper.find(CategoryModal).prop('handleCloseModal')()
    expect(wrapper.state('modalIsOpen')).toEqual(false)
})


test('should set category state ', () => {
    const selectedCategory = 'soup'
    const wrapper = shallow(<FoodForm/>)
    wrapper.find(CategoryModal).prop('handleCategory')(selectedCategory)
    expect(wrapper.state('category')).toEqual(selectedCategory)
})
