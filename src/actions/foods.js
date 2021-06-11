import uuid from 'uuid'
import moment from 'moment'

 
//CREATING ACTION GENERATORS..........................................

//ADD_FOOD : food reducer
export const addFood = ({createdAt = moment().toDate(), name='', category = "soups", amount=0, largeAvailability=false, foodSize='regular', description=''} = {})=>({
    type:'ADD_FOOD',
    food:{
        id:uuid(),
        name,
        category,
        amount,
        largeAvailability,
        foodSize,
        description,
        createdAt

    }
})

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