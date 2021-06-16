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
                dispatch(addFood({
                    id:refFood.key,
                    ...food
                }))
            })
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