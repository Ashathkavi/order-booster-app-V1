import React from 'react'
import {shallow} from 'enzyme'
import {EditFoodPage} from '../../../components/ManageFood/EditFoodPage'
import sampleFoods from '../../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

let editFoodSpy, historySpy, wrapper, startRemoveFoodSpy
 
beforeEach(()=>{
    editFoodSpy = jest.fn()
    startRemoveFoodSpy = jest.fn()
    historySpy = {push: jest.fn()}
    wrapper = shallow(<EditFoodPage 
        editFood={editFoodSpy} 
        startRemoveFood = {startRemoveFoodSpy} 
        history={historySpy}     
        food = {sample_foods[0]}   
    />)
})

test('should render EditFoodPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find('FoodForm').prop('onSubmit')(sample_foods[1])
    expect(historySpy.push).toHaveBeenLastCalledWith('/food')
    expect(editFoodSpy).toHaveBeenLastCalledWith(sample_foods[0].id, sample_foods[1])
})

test('should handle onSubmit', () => {
    wrapper.find('button').simulate('click')
    expect(historySpy.push).toHaveBeenLastCalledWith('/food')
    expect(startRemoveFoodSpy).toHaveBeenLastCalledWith(sample_foods[0].id)
})