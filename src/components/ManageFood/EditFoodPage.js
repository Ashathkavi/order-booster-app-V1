import React from 'react'
import {connect} from 'react-redux'
import { editFood, startRemoveFood} from '../../actions/foods'
import FoodForm from '../ManageFood/FoodForm'

export const EditFoodPage = (props) => {
    //console.log(props)
    const onSubmit = (food) => {
        props.editFood(props.food.id ,food)
        props.history.push('/food')
    }

    const onRemove = () => {
        props.startRemoveFood(props.food.id)
        props.history.push('/food')
    }
    return(
        <div>
           <FoodForm food={props.food} onSubmit={onSubmit} />
           <button onClick = {onRemove}>Remove</button>
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    editFood: (id, food) => dispatch(editFood(id, food)),
    startRemoveFood: (id) => dispatch(startRemoveFood({id}))
})

const mapStateToProps = (state, props) => {
    console.log(state.foods)
    return {
        
        food:state.foods.find((food)=> food.id === props.match.params.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodPage)