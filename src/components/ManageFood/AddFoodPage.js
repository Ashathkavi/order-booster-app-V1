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
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add Food</h1>
                </div>
            </div>

            <div className="content-container">
                <FoodForm onSubmit={ onSubmit}/>
            </div>
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startAddFood: (food) => dispatch(startAddFood(food))
})

export default connect(undefined, mapDispatchToProps)(AddFoodPage)