import React from 'react'
import FoodForm from '../ManageFood/FoodForm'
import {connect} from 'react-redux'
import {startAddFood} from '../../actions/foods'

export const AddFoodPage = (props) => {
    //console.log(props.history)
    const onSubmit = (food) => {
        props.startAddFood(food)
        props.history.push('/food')
    }
    return(
        <div>
            <h1>Add Food</h1>
            <FoodForm onSubmit={onSubmit}/>
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startAddFood: (food) => dispatch(startAddFood(food))
})

export default connect(undefined, mapDispatchToProps)(AddFoodPage)