import React from 'react'
import {connect} from 'react-redux'
import FoodListItem from '../ManageFood/FoodListItem'
import selectFood from '../../selectors/foods'

export const FoodList = (props) => {
    //console.log(props)
    return (
    <div>
        {
            props.foods.length === 0 ? (
                <p>No Foods to Show</p>
            ):(
                props.foods.map((food)=>{
                    return <FoodListItem key={food.id} {...food}/>
                })
            )
        }
    </div>
)}

const mapStateToProps = (state) => {
    return {
        foods:selectFood(state.foods, state.foodFilters),
    }
}

export default connect(mapStateToProps)(FoodList)