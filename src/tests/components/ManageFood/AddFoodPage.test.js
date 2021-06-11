import React from 'react'
import {shallow} from 'enzyme'
import {AddFoodPage} from '../../../components/ManageFood/AddFoodPage'
import sampleFoods from '../../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

let addFoodSpy, historySpy, wrapper
 
beforeEach(()=>{
    addFoodSpy = jest.fn()
    historySpy = {push: jest.fn()}
    wrapper = shallow(<AddFoodPage addFood={addFoodSpy} history={historySpy}/>)
})

test('should render AddFoodPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle onSubmit', () => {
    wrapper.find('FoodForm').prop('onSubmit')(sample_foods[0])
    expect(historySpy.push).toHaveBeenLastCalledWith('/food')
    expect(addFoodSpy).toHaveBeenLastCalledWith(sample_foods[0])
})