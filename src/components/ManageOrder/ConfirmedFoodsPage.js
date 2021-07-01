import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {startEditOrder} from '../../actions/orders'
import selectedOrders from '../../selectors/orders'
import {setStatusFilter} from '../../actions/orderFilters'
import categoryList from '../../fixtures/FoodCategoryList'
import moment from 'moment'


export const ConfirmedFoodsPage = (props) => {
    console.log(props.orders, 'props.orders')


    let soups=[] , apetizer =[], chopsueys=[], riceAndCurry=[], friedRice=[], briyani=[]
    let noodles=[] , spaghetti =[], pasta=[], kothu=[], vegetableDishes=[], eggDishes=[]
    let fishDishes=[] , chickenDishes =[], prawnDishes=[], cuttleFishDishes=[], crabDishes=[], desserts=[]
    let milkShakes=[] , freshFruitJuice =[], softDrink=[], sandwiches=[], specialMenue=[]
    
    props.orders.map((order)=>order.foods.map((food)=>{
        //console.log(food.food.category, 'food.food.category')
        if(food.food.category === 'soups'){
            soups.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Appetizer'){
            apetizer.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Chopsueys'){
            chopsueys.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Rice and Curry'){
            riceAndCurry.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Fried Rice'){
            friedRice.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Briyani'){
            briyani.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Noodles'){
            noodles.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Spaghetti'){
            spaghetti.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Pasta'){
            pasta.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Kothu'){
            kothu.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Vegetable Dishes'){
            vegetableDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Egg Dishes'){
            eggDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Fish Dishes'){
            fishDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Chicken Dishes'){
            chickenDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Prawn Dishes'){
            prawnDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'CuttleFish Dishes'){
            cuttleFishDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Crab Dishes'){
            crabDishes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Desserts'){
            desserts.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'MilkShakes'){
            milkShakes.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Fresh Fruit Juices'){
            freshFruitJuice.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Soft Drink'){
            softDrink.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Sandwiches'){
            sandwiches.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }else if (food.food.category === 'Special Menue'){
            specialMenue.push({...food, orderNo:order.count, index:order.foods.indexOf(food), orderId:order.id})
        }
    }))

    console.log(spaghetti, 'spaghetti')

    const categoryList = [
        soups , apetizer , chopsueys, riceAndCurry, friedRice, briyani,
        noodles , spaghetti , pasta, kothu, vegetableDishes, eggDishes,
        fishDishes , chickenDishes , prawnDishes, cuttleFishDishes, crabDishes, desserts,
        milkShakes , freshFruitJuice , softDrink, sandwiches, specialMenue
    ]

    const onChangePreparedStatus = (id, food, orderedFoods) => {
        let foods = orderedFoods
        foods[food.index].prepared = true
        foods[food.index].preparedBy = props.auth.uid
        foods[food.index].preparedTime = moment().valueOf()
        let orderReady = true
        foods.map((food)=> {
            if(food.prepared === false){
                orderReady = false
            }
        })
        if(orderReady){
            props.startEditOrder(id ,{foods:foods, status:{status:'table', time:moment().valueOf()}})
        }else{
            props.startEditOrder(id ,{foods:foods})
        }
        console.log(foods, 'Foods', id)
        
    }


    useEffect(()=>{
        if(props.filters.status !== 'kitchen'){
            props.setStatusFilter('kitchen')
        }
    }, ()=>{

    })


    
    return(
        <div>
        {
            categoryList.map((category)=>{
                
                if(category.length !== 0){
                    console.log(category, 'category')
                    return (
                        <div>
                            <h3>{category[0].food.category}</h3>
                            {
                                
                                category.map((food)=>{
                                    let orderedFoods = []
                                    props.orders.map((order)=>{
                                        if(order.id === food.orderId){
                                            orderedFoods = order.foods
                                            console.log(orderedFoods, 'orderedFoods')
                                        }
                                    })
                                    
                                    return (
                                        <div>
                                            <p>{food.food.name}:::
                                            {food.food.foodSize}:::
                                            {food.foodQuantity}:::
                                            {food.orderNo}:::</p>
                                            {food.prepared === false && <button onClick={()=>onChangePreparedStatus(food.orderId, food, orderedFoods)}>Mark it as Prepared</button>}

                                        </div>
                                    )
                                        
                                })
                            }
                        </div>
                    )
                }
            })
        }
        </div>
        
            
        
    )
}


const mapDispatchToProps = (dispatch) => ({
    startEditOrder: (id, order) => dispatch(startEditOrder(id, order)),
    setStatusFilter: (status) => dispatch(setStatusFilter(status))

})

const mapStateToProps = (state) => {
    return {        
        orders:selectedOrders(state.orders, state.orderFilters),
        filters:state.orderFilters,
        auth:state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedFoodsPage)