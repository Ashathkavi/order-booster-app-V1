import React from 'react'
import {shallow} from 'enzyme'
import {FoodList} from '../../../components/ManageFood/FoodList'
import sampleFoods from '../../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

test('should render food list with foods', () => {
    const wrapper = shallow(<FoodList foods={sample_foods}/>)
    expect(wrapper).toMatchSnapshot()
})


test('should render food list with foods empty message', () => {
    const wrapper = shallow(<FoodList foods={[]}/>)
    expect(wrapper).toMatchSnapshot()
})

