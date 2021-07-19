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
                database.ref(`foods/${refFood.key}`).once('value').then((snap)=>{
                    if(!snap.val()){
                        dispatch(addFood({
                            id:refFood.key,
                            ...food
                        }))
                    }
                    
                })
                // dispatch(addFood({
                //     id:refFood.key,
                //     ...food
                // }))
            })
            .catch((error)=>console.log('failed :', error))
    }
}

//REMOVE_FOOD : food reducer
export const removeFood = ({id} = {}) => ({
    type:'REMOVE_FOOD',
    id
})


export const startRemoveFood = ({id} = {})=> {
    return (dispatch) => {        
        return database.ref(`foods/${id}`).remove()
            .then(() => {
                console.log('Data is removed')
                dispatch(removeFood({id}))
            })
            .catch((error)=>console.log('failed :', error))
    }
}



//EDIT_FOOD : food reducer
export const editFood = (id, updates) => ({
    type:'EDIT_FOOD',
    id,
    updates

})

export const startEditFood = (id, updates)=> {
    return (dispatch) => {        
        return database.ref(`foods/${id}`).update(updates)
            .then(() => {
                console.log('Data is updated')
                dispatch(editFood(id, updates))
            })
            .catch((error)=>console.log('failed :', error))
    }
}



//SET_FOODS : to get all foods detail from database
export const setFoods = (foods) => ({
    type:'SET_FOODS',
    foods
})

export const startSetFoods = ()=> {
    return (dispatch) => {
        
        return database.ref('foods').once('value').then((snapshot) => {
            console.log('Data is fetched')
            const foods = []
            snapshot.forEach((childSnapshot)=>{
                foods.push({
                    
                    ...childSnapshot.val(),
                    id:childSnapshot.key
                })
            })
            dispatch(setFoods(foods))
        }).catch((e)=>{
            console.log('Error with data fetching: ', e)
        })

    }
}


export const onStartSetFoods = ()=> {
    return (dispatch) => {
        return database.ref('foods').on('value', (snapshot) => {
            const foods = []
            snapshot.forEach((childSnapshot)=>{
                foods.push({
                    ...childSnapshot.val(),
                    id:childSnapshot.key
                })
            })
            dispatch(setFoods(foods))
        })
    }
    
}


