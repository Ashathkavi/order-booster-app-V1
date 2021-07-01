import React, {useState} from 'react'
import { connect } from 'react-redux'
import {startRemoveFood} from '../../actions/foods'
import {Link} from 'react-router-dom'

class SingleTypeOrder {
    constructor(food, foodQuantity, prepared, preparedTime, prepearedBy){
        this.food= food
        this.foodQuantity= foodQuantity
        this.prepared= prepared
        this.preparedTime= preparedTime
        this.prepearedBy= prepearedBy
    }
}

export const FoodListItem = ({
    id, dispatch, name, category,  
    foodSize, amount, fromOrderModal, onAddsingleTypeOrder
}) => {
    const [foodQuantity, setFoodQuantity] = useState(0)
    const [prepared, setPrepared] = useState(false)
    const [preparedTime, setPreparedTime] = useState(0)
    const [prepearedBy, setPrepearedBy] = useState('none')


    if(fromOrderModal){
        //console.log('foodQuantity', foodQuantity)
        

        const food = {name, id, category, amount, foodSize}
        const singleTypeOrder = new SingleTypeOrder(food,foodQuantity,prepared, preparedTime, prepearedBy)
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
        </div>
    )
}

 

export default connect()(FoodListItem)