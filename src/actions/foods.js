import uuid from 'uuid'
import moment from 'moment'
import database from '../firebase/firebase'

 
//CREATING ACTION GENERATORS..........................................

//ADD_FOOD : food reducer
export const addFood = (food)=>({
    type:'ADD_FOOD',
    food
})

export const startAddFood = (foodData = {})=> {
    return (dispatch) => {
        const {
            createdAt = moment().valueOf(),
            name='', 
            category = "soups", 
            amount=0, 
            largeAvailability=false, 
            foodSize='regular', 
            description=''
        } = foodData
        const food = {
            name,
            category,
            amount,
            largeAvailability,
            foodSize,
            description,
            createdAt    
        }
        return database.ref('foods').push(food)
            .then((refFood) => {
                console.log('Data is Saved')
                dispatch(addFood({
                    id:refFood.key,
                    ...food
                }))
            })
            .catch((error)=>console.log('failed :', error))
    }
}

//REMOVE_FOOD : food reducer
export const removeFood = ({id} = {}) => ({
    type:'REMOVE_FOOD',
    id
})

//EDIT_FOOD : food reducer
export const editFood = (id, updates) => ({
    type:'EDIT_FOOD',
    id,
    updates

})



//SET_FOODS : to get all foods detail from database
export const setFoods = (foods) => ({
    type:'SET_FOODS',
    foods
})

export const startSetFoods = ()=> {
    return (dispatch) => {
        
        return database.ref('foods').once('value')
            .then((snapshot) => {
                console.log('Data is fetched')
                const foods = []
                snapshot.forEach((childSnapshot)=>{
                    foods.push({
                        
                        ...childSnapshot.val(),
                        id:childSnapshot.key
                    })
                })
                dispatch(setFoods(foods))
            })
            .catch((error)=>console.log('failed :', error))
    }
}


