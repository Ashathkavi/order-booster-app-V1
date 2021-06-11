import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'



//REDUCERS..............................................................








//SUBSCRIPTION TO SEE FOOD VALUE AT EACH CHANGES......................
store.subscribe(()=>{
    const state = store.getState()
    const visibleFoods = getVisibleFoods(state.foods, state.foodFilters)
    console.log(visibleFoods)
})




//DISPATCHING ACTIONS..................................................
const FoodOne = store.dispatch(addFood({
    name:'Chicken Fried Rice',
    category:'Fried Rice',
    amount:350,
    largeAvailability:true,
    fullOrRegular:'regular'
}))

const FoodTwo = store.dispatch(addFood({
    name:'Beef Fried Rice',
    category:'Fried Rice',
    amount:380,
    largeAvailability:true,
    fullOrRegular:'regular'
}))

const Foodthree = store.dispatch(addFood({
    name:'Chicken Fried Rice',
    category:'Fried Rice',
    amount:550,
    largeAvailability:true,
    fullOrRegular:'full'
}))

const FoodFour = store.dispatch(addFood({
    name:'Chicken Briyani',
    category:'Briyani',
    amount:450,
    largeAvailability:false,
    fullOrRegular:'regular'
}))

/*
console.log('edit chech')
store.dispatch(editFood( FoodFour.food.id,{
    name:'Beef Briyani',
    category:'Briyani'
}))

console.log('remove chech')
store.dispatch(removeFood({id:Foodthree.food.id}))

console.log('setNameFilter filter value chech')
store.dispatch(setNameFilter('rice'))

console.log('setCatTextFilter filter value chech')
store.dispatch(setCatTextFilter('Briyani'))
*/
/*
console.log('setStartAmount filter value chech')
store.dispatch(setStartAmount(500))


console.log('setEndAmount filter value chech')
store.dispatch(setEndAmount(351))

*/
