import {addFood, removeFood, editFood} from '../../actions/foods'
import moment from 'moment'


test('should setup remove food action object', ()=>{
    const action = removeFood({id:'123abc'})
    expect(action).toEqual({
        type:'REMOVE_FOOD',
        id:'123abc'
    })
})


test('should setup edit food action object', ()=>{
    const updates = {
        name:'Chicken kothu',
        amount:350
    }
    const action = editFood('123abc', updates)
    expect(action).toEqual({
        type:'EDIT_FOOD',
        id:'123abc',
        updates
    })
})



test('should setup add food action object with provided value', ()=>{
    const foodData = {
        name:'Chicken kothu',
        amount:350,
        description:'it has more spicy and chicken',
        category:'kothu',
        largeAvailability: true,
        foodSize: 'full',
        createdAt:123456879

    }
    const action = addFood(foodData)
    expect(action).toEqual({
        type:'ADD_FOOD',
        food:{
            ...foodData,
            id:expect.any(String)
        }
    })
})



test('should setup add food action object with default value', ()=>{
    const foodData = {
        createdAt:moment().toDate(),
        name:'',
        category : "soups",
        amount:0,
        largeAvailability:false,
        foodSize:'regular',
        description:''
    }
    const action = addFood()
    expect(action).toEqual({
        type:'ADD_FOOD',
        food:{
            ...foodData,
            id:expect.any(String),
            createdAt:expect.any(Date)
        }
    })
})