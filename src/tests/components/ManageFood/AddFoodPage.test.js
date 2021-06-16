import React from 'react'
import {shallow} from 'enzyme'
import {AddFoodPage} from '../../../components/ManageFood/AddFoodPage'
import sampleFoods from '../../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

let startAddFoodSpy, historySpy, wrapper
 
beforeEach(()=>{
    startAddFoodSpy = jest.fn()
    historySpy = {push: jest.fn()}
    wrapper = shallow(<AddFoodPage startAddFood={startAddFoodSpy} history={historySpy}/>)
})

test('should render AddFoodPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find('FoodForm').prop('onSubmit')(sample_foods[0])
    expect(historySpy.push).toHaveBeenLastCalledWith('/food')
    expect(startAddFoodSpy).toHaveBeenLastCalledWith(sample_foods[0])
})