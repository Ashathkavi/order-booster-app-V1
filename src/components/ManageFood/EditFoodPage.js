import React from 'react'
import {connect} from 'react-redux'
import { startEditFood, startRemoveFood} from '../../actions/foods'
import FoodForm from '../ManageFood/FoodForm'

export const EditFoodPage = (props) => {
    console.log(props, 'props')
    const onSubmit = (food) => {
        props.startEditFood(props.food.id ,food)
        props.history.push('/food')
    }

    const onRemove = () => {
        props.startRemoveFood(props.food.id)
        props.history.push('/food')
    }
    return(
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Food</h1>
                </div>
            </div>
           <div className="content-container">
            <FoodForm food={props.food} onSubmit={onSubmit} foods={props.foods}/>
                {props.autherizedAs === 'admin' && <button className="button button--remove" onClick={onRemove}>Remove this Food</button>}

           </div>
           
        </div>
)}

const mapDispatchToProps = (dispatch) => ({
    startEditFood: (id, food) => dispatch(startEditFood(id, food)),
    startRemoveFood: (id) => dispatch(startRemoveFood({id}))
})

const mapStateToProps = (state, props) => {
    console.log(state.foods, 'kkkk',props.match.params.id)
    return {

        autherizedAs:state.auth.role,
        foods:state.foods,

        food:state.foods.find((food)=> food.id === props.match.params.id)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFoodPage)