import React, {useState} from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

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
                <tr>
                    <td>{name}</td>
                    <td>{foodSize}</td>
                    <td>{category}</td>
                    <td>{amount}</td>
                    <td><input type='number' max='20' value={foodQuantity} onChange={(e)=>setFoodQuantity(e.target.value)}/></td>
                    <td><button type="button" onClick={()=>onAddsingleTypeOrder(singleTypeOrder)}>Select</button></td>
                </tr>
        )
    }

    return(
        <div className="list-item">
            <div>
                <Link className="list-item__link" to={`/food/edit/${id}`}>
                    <h2 className="list-item__title">{name} &nbsp;&nbsp;&nbsp; </h2>  <p>[{foodSize}]</p>
                </Link> 
                               
            </div>
            <div>
                <p className="list-item__sub-title">{category}</p>
            </div>
            
            <div>
                <h3 className="list-item__data">{numeral(amount).format('$0,0.00')}</h3>
            </div>            
            
        </div>    
        
    )
}

 

export default connect()(FoodListItem)