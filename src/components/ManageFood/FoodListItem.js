import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import {GiStabbedNote} from "react-icons/gi";
import {FaLessThan} from "react-icons/fa";


import {Link} from 'react-router-dom'

class SingleTypeOrder {
    constructor(food, foodQuantity, foodDescription, prepared, preparedTime, 
        prepearedBy, handled, handledBy, handledTime){
        this.food= food
        this.foodQuantity= foodQuantity
        this.foodDescription = foodDescription
        this.prepared= prepared
        this.preparedTime= preparedTime
        this.prepearedBy= prepearedBy
        this.handled = handled 
        this.handledBy = handledBy
        this.handledTime = handledTime
    }
}

export const FoodListItem = ({
    id, name, category, foods,
    foodSize, amount, fromOrderModal, onAddsingleTypeOrder, description, largeAvailability
}) => {
    const [foodQuantity, setFoodQuantity] = useState(0)
    const [foodDescription, setFoodDescription] = useState('')
    const [prepared, setPrepared] = useState(false)
    const [preparedTime, setPreparedTime] = useState(0)
    const [prepearedBy, setPrepearedBy] = useState('none')
    const [handled, setHandled] = useState(false)
    const [handledTime, setHandledTime] = useState(0)
    const [handledBy, setHandledBy] = useState('none')
    const [foodDesVisibility, setFoodDesVisibility] = useState(false)


    let anotherAvailable = false
    let i = 0
    foods.map((food)=>{
        if(name.toLowerCase() === food.name.toLowerCase()){
            i = i + 1
            if(i === 2){
                anotherAvailable = true
            }
        }
    })

    const onFoodQuantityChange = (e) => {
        e.persist()
        if(e.target.value >= 0){
            setFoodQuantity(e.target.value)
        }        
    }

    const onFoodDescriptionChange = (e) => {
        e.persist()
        setFoodDescription(e.target.value)
    }

    const onSelectSingleTypeOrder = (singleTypeOrder) =>{
        console.log(singleTypeOrder, 'singleTypeOrder')
        if(foodQuantity > 0){
            onAddsingleTypeOrder(singleTypeOrder)
        }
    }

    if(fromOrderModal){
        //console.log('foodQuantity', foodQuantity)
        

        const food = {name, id, category, amount, foodSize}
        const singleTypeOrder = new SingleTypeOrder(food,foodQuantity, foodDescription,prepared, preparedTime,
             prepearedBy, handled, handledBy, handledTime)
        //console.log('singleTypeOrder', singleTypeOrder)
        return(
                <tr>
                    <td>{name}</td>
                    <td>{foodSize}</td>
                    <td>{category}</td>
                    <td>{amount}</td>
                    <td>
                        <div  className="list-item-order__inputs">
                            <input className="number-input-food-list-order" type='number' max='50' value={foodQuantity} onChange={onFoodQuantityChange}/>&nbsp;
                            <div onClick={()=>setFoodDesVisibility(true)}>
                                {foodDesVisibility ? <input  type='text' value={foodDescription} onChange={onFoodDescriptionChange}/> : <GiStabbedNote/>}
                            </div>
                            <div hidden={!foodDesVisibility} onClick={()=>setFoodDesVisibility(false) }><FaLessThan/></div>
                        </div>
                    </td>
                    <td><button type="button" onClick={()=>onSelectSingleTypeOrder(singleTypeOrder)}>Select</button></td>
                </tr>
        )
    }
    let otherFoodSize = foodSize === 'regular' ? 'full' : 'regular'

    return(
        <div className="list-item">
            <div className="list-item_into-row list-item_into-row--food">
                <Link className="list-item__link" to={`/food/edit/${id}`}>
                    <h2 className="list-item__title">{name} &nbsp;&nbsp;&nbsp; </h2>  
                    <p className="list-item__food-size">[{foodSize}]</p>
                </Link> 
                
                
                               
            </div>
            
            <div className="list-item_into-row list-item_into-row--food">
                <div>
                    <p className="list-item__sub-title list-item__sub-title--food">{category}</p>
                    {(largeAvailability && !anotherAvailable )&& <Link to ={{
                        pathname:'/food/create',
                        state:{
                            name:name,
                            description:description,
                            category:category,
                            foodSize:otherFoodSize

                        }
                    }}>Add {otherFoodSize}</Link>}
                </div>
                
                <h3 className="list-item__data list-item__data--food">{numeral(amount).format('$0,0.00')}</h3>
            </div>            
            
        </div>    
        
    )
}

 
const mapStateToProps = (state) => {
    return {
        foods:state.foods
    }
}

export default connect(mapStateToProps)(FoodListItem)