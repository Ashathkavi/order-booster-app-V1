import React from 'react'
import {Link} from 'react-router-dom'
import FoodList from '../ManageFood/FoodList'
import FoodListFilters from './FoodListFilters'
import FoodsSummary from './FoodsSummary'

const FoodDashboardPage = () => (
    <div>
        <FoodsSummary/>
        <FoodListFilters/>
        <FoodList/>
    </div>
)

export default FoodDashboardPage