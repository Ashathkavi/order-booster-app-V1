import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {startEditOrder} from '../../actions/orders'
import selectedOrders from '../../selectors/orders'
import {setStatusFilter, setStartDate} from '../../actions/orderFilters'
import categoryList from '../../fixtures/FoodCategoryList'
import moment from 'moment'
import {onStartSetOrders} from '../../actions/orders'
import DurationDisplay from './DurationDisplay'
import MessageModal from '../MessageModal'
import {GiStabbedNote} from "react-icons/gi";





export const ConfirmedFoodsPage = (props) => {
    //console.log(props.orders, 'props.orders')

    const [isOrderDisModalOpen, setIsOrderDisModalOpen] = useState(false)
    const [isFoodDisModalOpen, setIsFoodDisModalOpen] = useState(false)

    const [orderDescription, setOrderDescription] = useState('')
    const [foodDescription, setFoodDescription] = useState('')

    const [orderNo, setOrderNo] = useState('')

    let soups=[] , apetizer =[], chopsueys=[], riceAndCurry=[], friedRice=[], briyani=[]
    let noodles=[] , spaghetti =[], pasta=[], kothu=[], vegetableDishes=[], eggDishes=[]
    let fishDishes=[] , chickenDishes =[], prawnDishes=[], cuttleFishDishes=[], crabDishes=[], desserts=[]
    let milkShakes=[] , freshFruitJuice =[], softDrink=[], sandwiches=[], specialMenue=[]
    
    let orderInfo 
    props.orders.map((order)=>order.foods.map((food)=>{
        //console.log(food.food.category, 'food.food.category')
        orderInfo = {
            orderNo:order.count, 
            index:order.foods.indexOf(food), 
            orderId:order.id,
            deliverMeth:order.deliverMeth,
            orderEndTime:order.orderEndTime,
            orderDescription:order.description
        } 
        if(food.food.category === 'soups'){
            soups.push({...food, ...orderInfo})
        }else if (food.food.category === 'Appetizer'){
            apetizer.push({...food, ...orderInfo})
        }else if (food.food.category === 'Chopsueys'){
            chopsueys.push({...food, ...orderInfo})
        }else if (food.food.category === 'Rice and Curry'){
            riceAndCurry.push({...food, ...orderInfo})
        }else if (food.food.category === 'Fried Rice'){
            friedRice.push({...food, ...orderInfo})
        }else if (food.food.category === 'Briyani'){
            briyani.push({...food, ...orderInfo})
        }else if (food.food.category === 'Noodles'){
            noodles.push({...food, ...orderInfo})
        }else if (food.food.category === 'Spaghetti'){
            spaghetti.push({...food, ...orderInfo})
        }else if (food.food.category === 'Pasta'){
            pasta.push({...food, ...orderInfo})
        }else if (food.food.category === 'Kothu'){
            kothu.push({...food, ...orderInfo})
        }else if (food.food.category === 'Vegetable Dishes'){
            vegetableDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Egg Dishes'){
            eggDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Fish Dishes'){
            fishDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Chicken Dishes'){
            chickenDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Prawn Dishes'){
            prawnDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'CuttleFish Dishes'){
            cuttleFishDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Crab Dishes'){
            crabDishes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Desserts'){
            desserts.push({...food, ...orderInfo})
        }else if (food.food.category === 'MilkShakes'){
            milkShakes.push({...food, ...orderInfo})
        }else if (food.food.category === 'Fresh Fruit Juices'){
            freshFruitJuice.push({...food, ...orderInfo})
        }else if (food.food.category === 'Soft Drink'){
            softDrink.push({...food, ...orderInfo})
        }else if (food.food.category === 'Sandwiches'){
            sandwiches.push({...food, ...orderInfo})
        }else if (food.food.category === 'Special Menue'){
            specialMenue.push({...food, ...orderInfo})
        }
    }))


    let categoryList = [
        soups , apetizer , chopsueys, riceAndCurry, friedRice, briyani,
        noodles , spaghetti , pasta, kothu, vegetableDishes, eggDishes,
        fishDishes , chickenDishes , prawnDishes, cuttleFishDishes, crabDishes, desserts,
        milkShakes , freshFruitJuice , softDrink, sandwiches, specialMenue
    ]
    //briyani = briyani.sort((a,b)=>{return(a.orderEndTime - moment().valueOf()) < (b.orderEndTime - moment().valueOf()) ? -1 : 1})

    let filteredCategoryList = []
    categoryList.map((foodArray)=>{
        foodArray = foodArray.filter((food)=> (food.prepared === false))
        if(foodArray.length !== 0){
            foodArray = foodArray.sort((a,b)=>{return(a.orderEndTime - moment().valueOf()) < (b.orderEndTime - moment().valueOf()) ? -1 : 1})
            
            filteredCategoryList.push(foodArray)
        }

    })
    console.log(filteredCategoryList, 'filteredCategoryList')

    filteredCategoryList = filteredCategoryList.sort((a,b)=>{
        //console.log(a[0], 'a[0]')
        return(a[0].orderEndTime - moment().valueOf()) < (b[0].orderEndTime - moment().valueOf()) ? -1 : 1
    })

    console.log(filteredCategoryList, 'filteredCategoryList')

    const onChangePreparedStatus = (id, food, orderedFoods) => {
        let foods = orderedFoods
        foods[food.index].prepared = true
        foods[food.index].preparedBy = props.auth.uid
        foods[food.index].preparedTime = moment().valueOf()
        
        props.startEditOrder(id ,{foods:foods})
        //console.log(foods, 'Foods', id)
        
    }

    const onOrderDescription = (orderNo, orderDescription) => {
        setIsOrderDisModalOpen(!isOrderDisModalOpen)
        setOrderDescription(orderDescription)
        setOrderNo(orderNo)        
    }

    const onFoodDescription = (foodDescription) => {
        setIsFoodDisModalOpen(!isFoodDisModalOpen)
        setFoodDescription(foodDescription)    
    }


    useEffect(()=>{
        props.setStatusFilter('kitchen')
        props.setStartDate(moment().subtract(1,'month').startOf('month').valueOf())
        const g = props.onStartSetOrders()
        return g
    },[])


    
    return(
        <div className="content-container">
            <div className="mainContainer">
            {
                filteredCategoryList.map((category)=>{
                    
                    if(category.length !== 0){
                        //console.log(category, 'category')
                        return (
                            <div className="table-container">
                                <h3>{category[0].food.category}</h3>
                                {
                                    <table className="table-confirm-food">
                                            <tr>
                                                <th className="table-confirm-name">Name</th>           
                                                <th className="table-confirm-food-size">Food Size</th>
                                                <th className="table-confirm-food-quant">Food Quantity</th>
                                                <th className="table-confirm-duration">Duration</th>
                                                <th className="table-confirm-order-no">Order No</th>
                                                <th className="table-confirm-deliver-met">Deliver Method</th>
                                                <th className="table-confirm-prep-stat">Prepared Status</th>
                                            </tr>
                                            {
                                                category.map((food)=>{
                                                    let orderedFoods = []
                                                    props.orders.map((order)=>{
                                                        if(order.id === food.orderId){
                                                            orderedFoods = order.foods
                                                            //console.log(orderedFoods, 'orderedFoods')
                                                        }
                                                    })
                                                    //console.log(category.indexOf(food), 'category.indexOf(food)')

                                                    return (
                                                        <tr key={category.indexOf(food)}>
                                                            <td className="table-confirm-name">{food.food.name}{!!food.foodDescription &&  <span> &nbsp; <GiStabbedNote onClick={()=>onFoodDescription(food.foodDescription)}/></span>} </td>                               
                                                            <td className="table-confirm-food-size">{food.food.foodSize}</td>
                                                            <td className="table-confirm-food-quant">{food.foodQuantity}</td> 
                                                            <td className="table-confirm-duration">{<DurationDisplay orderEndTime={food.orderEndTime}/>}</td>
                                                            <td className="table-confirm-order-no">{!!food.orderDescription ?  <button onClick={()=>onOrderDescription(food.orderNo, food.orderDescription)}>{food.orderNo}</button> : food.orderNo }</td>
                                                
                                                            <td className="table-confirm-deliver-met">{food.deliverMeth}</td>
                                                            <td className="table-confirm-prep-stat">{food.prepared === false ? <button onClick={()=>onChangePreparedStatus(food.orderId, food, orderedFoods)}>Mark it as Prepared</button> : 'Prepared'}</td>
                                                        
                                                        </tr>
                                                    )
                                                    
                                                        
                                                })
                                            }

                                    </table>
                                    
                                    
                                }
                            </div>
                        )
                    }
                })
            }
            </div>

            <MessageModal
                onVisibleMessageModal={setIsOrderDisModalOpen} 
                isMessageModalOpen = {isOrderDisModalOpen}
                message={orderDescription}
                title={`Description of order ${orderNo}`}
            />
            <MessageModal
                onVisibleMessageModal={setIsFoodDisModalOpen} 
                isMessageModalOpen = {isFoodDisModalOpen}
                message={foodDescription}
                title={''}
            />
        </div>
        
            
        
    )
}


const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
    setStatusFilter: (status) => dispatch(setStatusFilter(status)),
    setStartDate:(startDate)=>dispatch(setStartDate(startDate)),
    onStartSetOrders: () => dispatch(onStartSetOrders())

})

const mapStateToProps = (state) => {
    return {        
        orders:selectedOrders(state.orders, state.orderFilters),
        filters:state.orderFilters,
        auth:state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedFoodsPage)