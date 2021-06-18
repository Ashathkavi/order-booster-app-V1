import {addFood, removeFood, editFood, startAddFood, setFoods, startSetFoods, startRemoveFood, startEditFood} from '../../actions/foods'
import moment from 'moment'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import sampleFoods from '../../fixtures/sampleFoods'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const foodData = {}
    sampleFoods().forEach(({
        id,
        name,
        category,
        amount,
        largeAvailability,
        foodSize,
        description,
        createdAt 
    }) => {
        foodData[id] = {
            name,
            category,
            amount,
            largeAvailability,
            foodSize,
            description,
            createdAt 
        }
        //console.log(foodData[id])
    })
    //console.log(foodData)
    database.ref('foods').set(foodData).then(()=>done())
})

test('should setup remove food action object', ()=>{
    const action = removeFood({id:'123abc'})
    expect(action).toEqual({
        type:'REMOVE_FOOD',
        id:'123abc'
    })
})


test('should setup remove food from database and store', (done)=>{
    const store = createMockStore({})
    const id = sampleFoods()[0].id
    store.dispatch(startRemoveFood({id})).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'REMOVE_FOOD',
            id
        })
        return database.ref(`foods/${id}`).once('value')        
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val()).toBeFalsy()
        done()
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

test('should setup edit food from database and store', (done)=>{
    const store = createMockStore({})
    const id = sampleFoods()[0].id
    const updates = {name :'Egg fried rice'}
    store.dispatch(startEditFood(id, updates)).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'EDIT_FOOD',
            id,
            updates
        })
        return database.ref(`foods/${id}`).once('value')        
    }).then((snapshot)=>{
        //console.log(snapshot.val())
        expect(snapshot.val().name).toBe(updates.name)
        done()
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




test('shoukd setup set foods action obvject eith data', ()=>{
    const action = setFoods(sampleFoods())
    expect(action).toEqual({
        type:'SET_FOODS',
        foods:sampleFoods()
    })
})



test('should fetch food from the database and store at store', (done)=>{
    const store = createMockStore({})
    store.dispatch(startSetFoods()).then(()=>{
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type:'SET_FOODS',
            foods:sampleFoods()
        })
        done()
    })
})


