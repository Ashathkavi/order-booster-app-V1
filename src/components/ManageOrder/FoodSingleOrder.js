import React from 'react'
import {Link} from 'react-router-dom'

const FoodSingleOrder = (props) => (
    <tr>
        <td>{props.singleTypeOrder.food.name}</td>
        <td>{props.singleTypeOrder.food.foodSize}</td>
        <td>{props.singleTypeOrder.foodQuantity}</td>
        <td>{props.singleTypeOrder.prepared ? "Prepared" : "Not Prepared"}</td>
        {!!props.onRemoveSingleOrder && <td>{props.singleTypeOrder.foodDescription}</td>}
        {!!props.onRemoveSingleOrder && <td><button type='button' onClick={()=>props.onRemoveSingleOrder(props.iterable)}>Remove</button></td>}
    </tr>
)

export default FoodSingleOrder