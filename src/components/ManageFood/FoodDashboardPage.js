import React from 'react'
import {Link} from 'react-router-dom'
import FoodList from '../ManageFood/FoodList'
import FoodListFilters from './FoodListFilters'

const FoodDashboardPage = () => (
    <div>
        <FoodListFilters/>
        <FoodList/>
    </div>
)

export default FoodDashboardPage