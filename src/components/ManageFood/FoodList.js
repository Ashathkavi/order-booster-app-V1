import React from 'react'
import {connect} from 'react-redux'
import FoodListItem from '../ManageFood/FoodListItem'
import selectFood from '../../selectors/foods'

export const FoodList = (props) => {
    //console.log(props)
    return (
    <div className="content-container">
        <div className= "list-header">
            <div className="show-for-mobile">Foods</div>
            <div className="show-for-deskotp">Food</div>
            <div className="show-for-deskotp">Category</div>
            <div className="show-for-deskotp">Amount</div>
        </div>
        <div className="list-body">
            {
                props.foods.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No Foods to Show</span>
                    </div>
                    
                ):(
                    props.foods.map((food)=>{
                        return <FoodListItem key={food.id} {...food}/>
                    })
                )
            }
        </div>
        
    </div>
)}

const mapStateToProps = (state) => {
    return {
        foods:selectFood(state.foods, state.foodFilters),
    }
}

export default connect(mapStateToProps)(FoodList)