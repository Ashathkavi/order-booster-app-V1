import {addFood, removeFood, editFood, startAddFood} from '../../actions/foods'
import moment from 'moment'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

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
            ...foodData
        }
    })
})

test('should add foods to database and store', (done) => {
    const store = createMockStore({})
    const foodData = {
        name:'Chicken kothu',
        amount:350,
        description:'it has more spicy and chicken',
        category:'kothu',
        largeAvailability: true,
        foodSize: 'full',
        createdAt:123456879
    }
    store.dispatch(startAddFood(foodData)).then(()=>{
        const actions = store.getActions()
        //console.log(actions[0])
        expect(actions[0]).toEqual({
            type:'ADD_FOOD',
            food:{
                id:expect.any(String),
                ...foodData
            }
        })
        return database.ref(`foods/${actions[0].food.id}`).once('value')
        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(foodData)
        done()
    })
})


test('should add foods with default to database and store', (done) => {
    const store = createMockStore({})
    const foodDefault = {
        createdAt : moment().valueOf(),
        name:'', 
        category : "soups", 
        amount:0, 
        largeAvailability:false, 
        foodSize:'regular', 
        description:''
    }
    store.dispatch(startAddFood()).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'ADD_FOOD',
            food:{
                id:expect.any(String),
                ...foodDefault
            }
        })
        return database.ref(`foods/${actions[0].food.id}`).once('value')
        
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(foodDefault)
        done()
    })
})




/*
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
            createdAt:expect.any(Date)
        }
    })
})
*/