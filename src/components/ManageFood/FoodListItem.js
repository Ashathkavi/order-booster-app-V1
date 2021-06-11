import React, {useState} from 'react'
import { connect } from 'react-redux'
import {removeFood} from '../../actions/foods'
import {Link} from 'react-router-dom'

class SingleTypeOrder {
    constructor(food, foodQuantity){
        this.food= food
        this.foodQuantity= foodQuantity
    }
}

export const FoodListItem = ({
    id, dispatch, name, category, largeAvailability, 
    foodSize, description, amount, fromOrderModal, onAddsingleTypeOrder
}) => {
    const [foodQuantity, setFoodQuantity] = useState(0)

    if(fromOrderModal){
        //console.log('foodQuantity', foodQuantity)
        

        const food = {name, id, category, amount, foodSize}
        const singleTypeOrder = new SingleTypeOrder(food,foodQuantity )
        //console.log('singleTypeOrder', singleTypeOrder)
        return(
            <div>
                <h3>{name}::::: {foodSize}::::: {amount}:::::::{category}</h3>
                <input type='number' max='20' value={foodQuantity} onChange={(e)=>setFoodQuantity(e.target.value)}/>
                <button type="button" onClick={()=>onAddsingleTypeOrder(singleTypeOrder)}>Select</button>
            </div>
        )
    }

    return(
        <div>
            <Link to={`/food/edit/${id}`}><h2>{name}: {foodSize}</h2></Link>
            <p>{category}</p>
            <p>{amount}</p>
            <button onClick={()=>{dispatch(removeFood({id}))}}>Remove</button>
        </div>
    )
}

 

export default connect()(FoodListItem)