import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import FoodListItem from '../ManageFood/FoodListItem'
import FoodListFilters from '../ManageFood/FoodListFilters'
import selectFood from '../../selectors/foods'
import FoodSingleOrder from './FoodSingleOrder'

// class SingleTypeOrder {
//     constructor(food, quantity){
//         this.food= food
//         this.quantity= quantity
//     }
// }

export class OrderModal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            singleTypeOrders: props.singleTypeOrders ? props.singleTypeOrders : []
        }
    }

    

    //handling single orders of food in Order Modal
    onAddsingleTypeOrder = ({food, foodQuantity}) => {
        this.setState((prevSate)=>({
            singleTypeOrders:[...prevSate.singleTypeOrders, {food, foodQuantity}]
        }))
    }

    //handling single orders Passing
    onSingleOrderFormPass = () => {
        console.log('this.state.singleTypeOrders', this.state.singleTypeOrders)
        this.props.onSingleOrderChange(this.state.singleTypeOrders)
        this.props.onVisibleChange()
    }

    //removing selected single order
    onRemoveSingleOrder = (arrayPosition) => {

        this.setState((prevState)=>{
            console.log('prevState.singleTypeOrders.length', prevState.singleTypeOrders.length, arrayPosition)
            if(prevState.singleTypeOrders.length !== 1){
                if(arrayPosition === 0){
                    return ({singleTypeOrders:prevState.singleTypeOrders.slice(1)})
                }
                console.log('fdffffffffffff', arrayPosition)
                let singleTypeOrders = prevState.singleTypeOrders
                singleTypeOrders.splice(arrayPosition, 1)
                return ({singleTypeOrders:singleTypeOrders})
            }            
            return ({singleTypeOrders:[]})
        })
    }

    onModalOpen = () => {
        this.setState(()=>({singleTypeOrders:this.props.singleTypeOrders}))
    }

    render(){
        let iterable = -1
        // if(this.props.isModalOpen){
        //     this.setState(()=>({
        //         singleTypeOrders: this.props.singleTypeOrders
        //     }))
        // }


        //console.log('singleTypeOrder.foodQuantity.toString()', singleTypeOrder.foodQuantity.toString())
        return(
            <Modal
                isOpen={this.props.isModalOpen}
                contentLabel = "Select a Food"
                onRequestClose = {this.props.onVisibleChange}
                closeTimeoutMS={1000}
                onAfterOpen={this.onModalOpen}
            >
                <h3>Please Select Some Foods</h3>
                <FoodListFilters fromOrderModal={true}/>
                <div >
                    <div>
                        {   
                            this.state.singleTypeOrders.map((singleTypeOrder)=>{ 
                                iterable = iterable + 1

                                //console.log('singleTypeOrder.foodQuantity.toString()', singleTypeOrder)
                                    return (
                                        <FoodSingleOrder 
                                            singleTypeOrder={singleTypeOrder} 
                                            iterable={iterable} 
                                            onRemoveSingleOrder={this.onRemoveSingleOrder}                                            
                                        />
                                        
                                    )
                                    
                                }
                            )
                        
                        }

                    </div>
                    <div>
                        {
                            this.props.foods.map((food)=><FoodListItem {...food} 
                                fromOrderModal={true} 
                                onAddsingleTypeOrder={this.onAddsingleTypeOrder}/>)
                        }
                        
                    </div>
                    

                </div>
                
                <button onClick={()=>this.props.onVisibleChange()}>Close</button>   
                <button onClick={this.onSingleOrderFormPass}>Save</button>   

                
            </Modal>
        )

    }
}


const mapStateToProps = (state, props) => {
    console.log(state.foods, state.foodFilters)
    return {
        
        foods:selectFood(state.foods, state.foodFilters)
    }
}

export default connect(mapStateToProps)(OrderModal);


/*

*/