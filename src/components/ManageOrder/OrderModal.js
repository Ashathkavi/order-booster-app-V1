import React from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import numeral from 'numeral'
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
    onAddsingleTypeOrder = ({food, foodQuantity,prepared, preparedTime, prepearedBy}) => {
        this.setState((prevSate)=>({
            singleTypeOrders:[...prevSate.singleTypeOrders, {food, foodQuantity,prepared, preparedTime, prepearedBy}]
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

    //handle total bill amount calculation  //................................not tested
    onBillAmountCalculation = () => {
        let billAmount = 0
        this.state.singleTypeOrders.map((singleTypeOrder)=>billAmount=(singleTypeOrder.food.amount*singleTypeOrder.foodQuantity )+ billAmount)
        //console.log(billAmount)
        return billAmount
    }

    render(){
        let iterable = -1
        console.log(this.props)
        // if(this.props.isModalOpen){
        //     this.setState(()=>({
        //         singleTypeOrders: this.props.singleTypeOrders
        //     }))
        // }

        console.log(this.state.singleTypeOrders)
        //console.log('singleTypeOrder.foodQuantity.toString()', singleTypeOrder.foodQuantity.toString())
        return(
            <Modal
                isOpen={this.props.isModalOpen}
                contentLabel = "Select a Food"
                onRequestClose = {this.props.onVisibleChange}
                closeTimeoutMS={1000}
                onAfterOpen={this.onModalOpen}
            >
                <h3 className="modal__header">Please Select Some Foods</h3>
                <FoodListFilters fromOrderModal={true}/>
                <div className="modal__tablesContainer">
                    
                    <div>
                        {
                            this.props.foods.length !== 0 && (
                                <table className="modal__tableAvailableFoods">
                                    <tr>
                                        <th>Name</th>
                                        <th>Food Size</th>                                
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Type Quantity</th>
                                        <th></th>
                                    </tr>
                                    {
                                        this.props.foods.map((food)=><FoodListItem key={food.id} {...food} 
                                            fromOrderModal={true} 
                                            onAddsingleTypeOrder={this.onAddsingleTypeOrder}/>
                                        )
                                    }                        
                                </table>
                            )
                        }
                                               
                    </div>
                    <div>
                        {   
                            this.state.singleTypeOrders.length !== 0 ? (
                                <div>
                                    <table className="modal__tableSelectedFoods">
                                        <tr>
                                            <th>Name</th>
                                            <th>Food Quantity</th>                                
                                            <th>Prepared</th>
                                            <th></th>
                                        </tr>
                                    {
                                        this.state.singleTypeOrders.map((singleTypeOrder)=>{ 
                                        iterable = iterable + 1
                                        
        
                                        //console.log('singleTypeOrder.foodQuantity.toString()', singleTypeOrder)
                                            return (
                                                <FoodSingleOrder 
                                                    key = {iterable}
                                                    singleTypeOrder={singleTypeOrder} 
                                                    iterable={iterable} 
                                                    onRemoveSingleOrder={this.onRemoveSingleOrder}                                            
                                                />                                        
                                            )                                    
                                        }
                                        )
                                    }
                                    </table>
                                    <div className="modal__totalAmount">
                                        <div><button className="button button--closeModal" onClick={this.onSingleOrderFormPass}>Save</button> </div>
                                        <h3>{numeral(this.onBillAmountCalculation()).format('$0,0.00') }</h3>
                                    </div>
                                </div>
                            ):(
                                null
                            )      
                        }

                    </div>
                    

                </div>
                <div className="modal__buttons">
                    <button className="button button--closeModal" onClick={()=>this.props.onVisibleChange()}>Close</button>   

                </div>
                   

                
            </Modal>
        )

    }
}


const mapStateToProps = (state, props) => {
    
    return {
        
        foods:selectFood(state.foods, state.foodFilters)
    }
}

export default connect(mapStateToProps)(OrderModal);


/*

*/