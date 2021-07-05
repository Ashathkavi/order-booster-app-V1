import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import {Link} from 'react-router-dom'
import selectFoods from '../../selectors/foods'




export const FoodsSummary = ({foodsCount, amountRange, foodCategory}) => {
    const foodWord = foodsCount === 1 ? 'food' : 'foods'
    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">
                    Viewing <span>{foodsCount}</span> {foodWord} {!!foodCategory && 'of category '} 
                    {!!foodCategory && <span>{foodCategory}</span>}  within the range of
                    <span>{' ' + amountRange}</span> 
                </h2>
                <div className="page-header__action">
                    <Link className="button" to="/food/create">Add Food</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleFoods = selectFoods(state.foods, state.foodFilters)
    return{
        foodsCount: visibleFoods.length,
        amountRange: state.foodFilters.boundryAmount,
        foodCategory: state.foodFilters.catText
    }
}

export default connect(mapStateToProps)(FoodsSummary)

