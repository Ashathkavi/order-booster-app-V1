import foodsReducer from '../../reducers/foods'
import sampleFoods from '../../fixtures/sampleFoods'

const sample_foods = sampleFoods()

test('should set default state', ()=>{
    const state = foodsReducer(undefined, {type:'@@INIT'})
    expect(state).toEqual([])
})



test('should remove food by id', () => {
    const action = {
        type:'REMOVE_FOOD',
        id:sample_foods[0].id
    }
    const state = foodsReducer(sample_foods, action)
    expect(state).toEqual([sample_foods[1], sample_foods[2], sample_foods[3]])
})

test('should not remove food by id if id doesnt given', () => {
    const action = {
        type:'REMOVE_FOOD',
        id:-1
    }
    const state = foodsReducer(sample_foods, action)
    expect(state).toEqual(sample_foods)
})




test('should add food ', () => {
    const newFood = {
        id:5,
        name:'Egg Fried Rice',
        category:'Fried Rice',
        amount:300,
        largeAvailability:true,
        foodSize:'full'
    }
    const action = {
        type:'ADD_FOOD',
        food:newFood
    }
    const state = foodsReducer(sample_foods, action)
    expect(state).toEqual([...sample_foods, newFood])
})




test('should edit food using id', () => {
    const updates = {
        name:'Prawn Fried Rice',
        category:'Fried Rice',
        amount:500,
        largeAvailability:false,
        foodSize:'regular',
        createdAt:100005
    }
    const action = {
        type:'EDIT_FOOD',
        id:sample_foods[3].id,
        updates
    }
    const state = foodsReducer(sample_foods, action)
    expect(state[3]).toEqual({...updates, id:sample_foods[3].id})
})


test('should not edit food if id is wrong', () => {
    const updates = {
        name:'Prawn Fried Rice',
        category:'Fried Rice',
        amount:500,
        largeAvailability:false,
        foodSize:'regular'
    }
    const action = {
        type:'EDIT_FOOD',
        id:-1,
        updates
    }
    const state = foodsReducer(sample_foods, action)
    expect(state).toEqual(sample_foods)
})


