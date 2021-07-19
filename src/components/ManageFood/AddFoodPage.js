import React from 'react'
import FoodForm from '../ManageFood/FoodForm'
import {connect} from 'react-redux'
import {startAddFood} from '../../actions/foods'
import {useLocation} from 'react-router-dom'

export const AddFoodPage = (props) => {
    //console.log(props.history)
    const onSubmit = (food) => {
        props.history.push('/food')
        props.startAddFood(food)
        
    }

    const location = useLocation()
    const foodlargeAvailable = location.state
    return(
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add Food</h1>
                </div>
            </div>

            <div className="content-container">
                <FoodForm onSubmit={ onSubmit} foods={props.foods} foodlargeAvailable = {foodlargeAvailable}/>
            </div>
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startAddFood: (food) => dispatch(startAddFood(food))
})

const mapStateToProps = (state) => {
    return {
        foods:state.foods
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFoodPage)