import React from 'react'
import {Link} from 'react-router-dom'

const FoodSingleOrder = (props) => (
    <div>
        <p>
            <span>{props.singleTypeOrder.food.name}</span>::::::::
            <span>{props.singleTypeOrder.foodQuantity}</span>:::::
            <span>{props.iterable}</span>
            <button type='button' onClick={()=>props.onRemoveSingleOrder(props.iterable)}>Remove</button>
        </p>
    </div>
)

export default FoodSingleOrder