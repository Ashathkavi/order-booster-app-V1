import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import {connect} from 'react-redux'
import OrderModal from './OrderModal'
import FoodSingleOrder from './FoodSingleOrder'



const now = moment()
//console.log(now.format('MMM do, YYYY'))
const defaultOrderDuration = '20'

class StatusTimer{
    constructor(status, time){
        this.status = status
        this.time = time
    }
}


export class OrderForm extends React.Component{
     
    constructor(props){
        super(props)
        this.state = {
            isModalOpen:false,

            customerName:props.order ? props.order.customerName : '',            
            phoneNumber:props.order ? props.order.phoneNumber : 0,
            address:props.order ? props.order.address : '',
            orderEndTime:props.order ? props.order.orderEndTime : moment().add(20, 'minutes').valueOf(),
            duration:defaultOrderDuration,
            description:props.order ? props.order.description : '', 

            status:props.order ? props.order.status.status : 'confirmed',
            statusTime: props.order ? props.order.status.time : moment().valueOf(),

            kotStatus:props.order ? props.order.kotStatus.status : 'not',
            kotStatusTime: props.order ? props.order.kotStatus.time : moment().valueOf(),

            billStatus:props.order ? props.order.billStatus.status : 'not',
            billStatusTime: props.order ? props.order.billStatus.time : moment().valueOf(), 

            foods:props.order ? props.order.foods : [],

            //amount:props.order ? (props.order.amount / 100).toString() : '', 
            createdAt:props.order ?  moment(props.order.createdAt).valueOf(): moment().valueOf(),
            error:''
        }
    }

        //handling customer Name
        onCustomerNameChange = (e) => {
            e.persist()
            this.setState(()=>({customerName:e.target.value}))
        }  

        //handling customer Phonenumber
        onPhoneNumberChange = (e) => {
            const phoneNumber = e.target.value
            //if(phoneNumber.match(/^\d{1,}$/gm)){
                this.setState(()=>({phoneNumber: e.target.value}))
            //} 
        }

        //handling customer Address
        onAddressChange = (e) => {
            e.persist()
            this.setState(()=>({address:e.target.value}))       
        }

        //handling order duration
        onDurationChange = (e) => {
            const orderDuration = parseInt(e.target.value)
            this.setState(()=>({
                orderEndTime:moment(this.state.createdAt).add(orderDuration,'minutes').valueOf(),
                duration:e.target.value
            })) 
        }

        //handling Order Description
        onDescriptionChange = (e) => { 
            e.persist()
            this.setState(()=>({description:e.target.value}))
        }

        //handling order Status
        onStatusChange = (e) => {
            e.persist()
            this.setState(()=>({
                status:e.target.value,
                statusTime:moment().valueOf()
            }))       
        }

        //handling kot Status
        onKotStatusChange = (e) => {
            e.persist()
            this.setState(()=>({
                kotStatus:e.target.value,
                kotStatusTime:moment().valueOf()
            }))       
        }

        //handling bill Status
        onBillStatusChange = (e) => {
            e.persist()
            this.setState(()=>({
                billStatus:e.target.value,
                billStatusTime:moment().valueOf()
            }))       
        }

        //handling create date
        onDateChange = (date) => {
            //e.persist()
            const date_value = moment(date).valueOf()
            //console.log(date_value,'date')
            this.setState(()=>({
                createdAt:date_value,
                orderEndTime:moment(date_value).add(defaultOrderDuration, 'minutes').valueOf()
            }))
            //this.setState(()=>({billStatus:e.target.value}))       
        }

        //handling Food Modal  
        onVisibleChange = () => {
            this.setState((prevState)=>({isModalOpen: !prevState.isModalOpen}))
        }

        //handle single Order 
        onSingleOrderChange = (singleOrders) => {
            //console.log('singleOrders', singleOrders)
            this.setState((prevState)=>{
                //console.log('prevState.foods', prevState.foods)
                return {foods: [...singleOrders]}
            })
        }

        //removing selected single order  
        onRemoveSingleOrder = (arrayPosition) => {

            this.setState((prevState)=>{
                if(prevState.foods.length !== 1){
                    if(arrayPosition === 0){
                        return ({foods:prevState.foods.slice(1)})
                    }
                    //console.log('fdffffffffffff', arrayPosition)
                    let foods = prevState.foods
                    foods.splice(arrayPosition, 1)
                    return ({foods:foods})
                }            
                return ({foods:[]})
            })
        }

        //handle total bill amount calculation  //................................not tested
        onBillAmountCalculation = () => {
            let billAmount = 0
            this.state.foods.map((food)=>billAmount=(food.food.amount*food.foodQuantity )+ billAmount)
            //console.log(billAmount)
            return billAmount
        }

    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.customerName || !this.state.phoneNumber || !this.state.address ||
            !this.state.orderEndTime || this.state.foods === []){
            this.setState(()=>({
                error:'CUSTOMER NAME, PHONENUMBER, ADDRESS , ORDERDURATIONS are ORDER PLACINGS are mandatoroy to fill'
            }))
        }else{//new StatusTimer(this.state.billStatus, this.state.billStatusTime)
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                address:this.state.address,
                amount:this.onBillAmountCalculation(),
                createdAt:this.state.createdAt,
                billStatus:{status:this.state.billStatus, time:this.state.billStatusTime} ,
                customerName:this.state.customerName,
                description:this.state.description,
                foods:this.state.foods,
                kotStatus:{status:this.state.kotStatus, time:this.state.kotStatusTime} ,
                orderEndTime:this.state.orderEndTime,
                phoneNumber:this.state.phoneNumber,
                status:{status:this.state.status, time:this.state.statusTime} 
            })
        }
    }
    





    render(){
        let iterable = -1
        //console.log('this.props.foods', this.props.foods)
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <button type='button' onClick={this.onVisibleChange}>Add Food</button>

                    <OrderModal 
                        onVisibleChange={this.onVisibleChange} 
                        isModalOpen = {this.state.isModalOpen}
                        onSingleOrderChange={this.onSingleOrderChange}
                        singleTypeOrders = {this.state.foods}
                        
                    />
                    {/*Adding Customer Name*/}
                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={this.state.customerName}
                        onChange={this.onCustomerNameChange}                        

                    />

                    {/*Adding Customer Name*/}
                    <input
                        type="number"
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        onChange={this.onPhoneNumberChange }                        

                    />

                    {/*Adding Customer Address*/}
                    <input
                        type="text"
                        placeholder="Customer Address"
                        value={this.state.address}
                        onChange={this.onAddressChange }                        

                    />

                    {/*Adding Description*/}
                    <textarea 
                        placeholder="Add a discription for your order (optional)"
                        autoFocus 
                        value={this.state.description}
                        onChange={this.onDescriptionChange}>
                    </textarea>

                    {
                        
                        this.state.foods.map((food)=>{
                            iterable = iterable + 1
                            return <FoodSingleOrder 
                                    key = {iterable}
                                    iterable = {iterable}
                                    singleTypeOrder = {food}
                                    onRemoveSingleOrder = {this.onRemoveSingleOrder}
                                />
                        })
                        
                    }
                    {
                        <div><h3>:::::::::::::{this.onBillAmountCalculation().toString()}:::::::::::::</h3></div>
                        
                    }

                    {/*Adding Status*/}                    
                    <select value={this.state.status} onChange={this.onStatusChange} >
                        <option value ='confirmed'>Confirmed</option>
                        <option value ='cancelled'>Cancelled</option>
                        <option value ='kitchen'>Kitchen</option>
                        <option value ='table'>Table</option>
                        <option value ='on delivery'>On Delivery</option>
                        <option value ='recieved'>Recieved</option>
                    </select>

                    {/*Adding KOT status*/}  
                    <select value={this.state.kotStatus} onChange={this.onKotStatusChange} disabled={!this.props.order}>
                        <option value ='not'>Not Passed</option>
                        <option value ='passed'>Passed</option>
                    </select>

                    {/*Adding Bill Status*/}  
                    <select value={this.state.billStatus} onChange={this.onBillStatusChange} disabled={!this.props.order}>
                        <option value ='not'>Not Printed</option>
                        <option value ='printed'>Printed</option>
                    </select>                    

                    {/*Adding Order Duration*/}
                    <select value={this.state.duration} onChange={this.onDurationChange} >
                        <option value ='20'>20 minutes</option>
                        <option value ='30'>30 minutes</option>
                        <option value ='40'>40 minutes</option>
                        <option value ='50'>50 minutes</option>
                        <option value ='60'>1 hour</option>
                        <option value ='70'>1 hour 10 minutes</option>
                        <option value ='80'>1 hour 20 minute</option>
                        <option value ='90'>1 and 1\2 hour </option>
                    </select>

                    {/*Adding Order Creation Date*/}
                    <DatePicker
                        selected={moment(this.state.createdAt).toDate()}
                        onChange={this.onDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <button>Save Order</button>

                </form>

                <div>
                    <p>customerName: {this.state.customerName}</p>
                    <p>phoneNumber: {this.state.phoneNumber}</p>
                    <p>address: {this.state.address}</p>
                    <p>description: {this.state.description}</p>
                    <p>orderEndTime:  {moment(this.state.orderEndTime).toLocaleString() }</p>
                    <p>status: {this.state.status}</p>
                    <p>kotSatus: {this.state.kotStatus}</p>
                    <p>billStatus: {this.state.billStatus}</p>
                    <p>createdAt: {moment(this.state.createdAt).toLocaleString()}</p>
                    <p>foods: {this.state.foods.toString()}</p>
                    
                    <p>isModaOpen: {this.state.isModalOpen.toString()}</p>

                </div>   
            </div>
            
        )
    
    }
}


const mapStateToProps = (state, props) => {
    console.log(state.foods)
    return {
        
        foods:state.foods
    }
}

export default connect(mapStateToProps)(OrderForm)