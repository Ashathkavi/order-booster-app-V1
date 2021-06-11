import React from 'react'
import FoodForm from '../ManageFood/FoodForm'
import {connect} from 'react-redux'
import {addFood} from '../../actions/foods'

export const AddFoodPage = (props) => {
    //console.log(props.history)
    const onSubmit = (food) => {
        props.addFood(food)
        props.history.push('/food')
    }
    return(
        <div>
            <h1>Add Food</h1>
            <FoodForm onSubmit={onSubmit}/>
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    addFood: (food) => dispatch(addFood(food))
})

export default connect(undefined, mapDispatchToProps)(AddFoodPage)