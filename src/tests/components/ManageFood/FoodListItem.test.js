import React from 'react'
import {shallow} from 'enzyme'
import {FoodListItem} from '../../../components/ManageFood/FoodListItem'
import sampleFoods from '../../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

test('should render food list Item with a food', () => {
    const wrapper = shallow(<FoodListItem {...sample_foods[0]}/>)
    expect(wrapper).toMatchSnapshot()
})

