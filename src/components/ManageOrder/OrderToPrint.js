import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import FoodSingleOrder from './FoodSingleOrder'

class OrderToPrint extends React.Component {

    
    constructor(props){
        super(props)
    }

    render() {
        let iterable = 0

        return (
            <div style={{justifyContent: 'left'}} className="mainContainer">
                <div className ="modal--OrderView">
                    <h3 className="modal--OrderView__title">The Order : {this.props.count} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {numeral(this.props.amount).format('$0,0.00')}</h3>
                    <div className="modal--OrderView__body">
                        <p >Name : {this.props.customerName}</p>
                        <p >PhoneNumber : {this.props.phoneNumber}</p>
                        <p >Address : {this.props.address}</p>
                        <p >Order Status : {this.props.status.status}</p>
                    </div>
                    <div>
                        {
                            this.props.foods.length !== 0 && (
                                <div>
                                    <table className="modal__tableSelectedFoods">
                                        <tr>
                                            <th>Name</th>
                                            <th>Food Quantity</th>                                
                                            <th>Prepared</th>
                                        </tr>
                                        {
                                            this.props.foods.map((food)=>{ 
                                                iterable = iterable + 1
                                                    return (
                                                        <FoodSingleOrder 
                                                            key = {iterable}
                                                            iterable = {iterable}
                                                            singleTypeOrder = {food}
                                                            onRemoveSingleOrder = {false}
                                                        />
                                                    )                                    
                                                }
                                            )
                                        }
                                    </table>
                                </div>
                            )
                        }
                    </div>
                    <div className="modal--OrderView__body">
                        <p >Created Time : {moment(this.props.createdAt).format('MMMM Do, YYYY  HH : mm : ss')}</p>
                        <p >Order End Time : {moment(this.props.orderEndTime).format('MMMM Do, YYYY  HH : mm : ss') }</p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default OrderToPrint
