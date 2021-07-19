import React, {Component} from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import numeral from 'numeral'
import {connect} from 'react-redux'
import OrderModal from './OrderModal'
import {GiMeal, GiPerson, GiPhone, GiHomeGarage, GiStabbedNote, GiMoneyStack,
    GiTable, GiAlarmClock, GiFullMotorcycleHelmet, GiConfirmed, GiCancel, GiCook
    } from "react-icons/gi";
import {GoCalendar} from "react-icons/go";
import {FaMotorcycle, FaHome, FaPercentage} from "react-icons/fa";





import FoodSingleOrder from './FoodSingleOrder'
import database from '../../firebase/firebase'

import configureStore from '../../stores/configureStore'
import orderSelector from '../../selectors/orders'

import MessageModal from '../MessageModal'

import {setPNoFilter} from '../../actions/orderFilters'


const store = configureStore()
const now = moment()
//console.log(now.format('MMM do, YYYY'))
const defaultOrderDuration = '20'

class Deliverer{
    constructor(name, uid){
        this.name = name
        this.uid = uid
    }
}

//console.log('store.getState()', store.getState())
export class OrderForm extends Component{
     
    
    constructor(props){
        super(props)
        this.foods = props.order.foods
        this.state = {
            orderNo:props.order ? props.order.count : 'new', 

            discount:props.order ? props.order.discount : 0,
            serviceCharge: props.order ? props.order.serviceCharge : 0,

            isModalOpen:false,
            isMessageModalOpen:false,

            customerName:props.order ? props.order.customerName : '',            
            phoneNumber:props.order ? props.order.phoneNumber : 0,
            address:props.order ? props.order.address : '',
            orderEndTime:props.order ? props.order.orderEndTime : moment().add(20, 'minutes').valueOf(),
            duration:defaultOrderDuration,
            description:props.order ? props.order.description : '', 

            status:props.order ? props.order.status.status : 'confirmed',
            statusTime: props.order ? props.order.status.time : moment().valueOf(),

            //kotStatus:props.order ? props.order.kotStatus.status : 'not',
            //kotStatusTime: props.order ? props.order.kotStatus.time : moment().valueOf(),

            //billStatus:props.order ? props.order.billStatus.status : 'not',
            //billStatusTime: props.order ? props.order.billStatus.time : moment().valueOf(), 

            foods:props.order ? props.order.foods : undefined,

            //amount:props.order ? (props.order.amount / 100).toString() : '', 
            createdAt:props.order ?  moment(props.order.createdAt).valueOf(): moment().valueOf(),
            error:'',

            deliverMeth:props.order ? props.order.deliverMeth : 'take away',

            deliverers:[new Deliverer('default','defaultId')],
            deliverer:props.order ? props.order.deliverer : '',

            onGuessByPNo:false

        }
        //console.log(this.props.order.foods, 'kkkkkkkkkkkkkk')
    }

    
    
    componentDidMount() {
        const deliverers = []
        database.ref(`users`).once('value')
            .then((snap)=>{
                snap.forEach((childSnapshot)=>{
                    if(childSnapshot.val().role === 'deliverer'){
                        let deliverer = new Deliverer(childSnapshot.val().name, childSnapshot.key)
                        deliverers.push(deliverer)                        
                    }
                    //console.log(deliverers[0].name)
                })
                this.setState(()=>({
                    deliverers:deliverers
                }))
                    
            })
            .catch((error)=>console.log('User gaining request failed :', error))
        
    }

    componentDidUpdate(){
        //console.log(this.props.orders, 'this.props.orders')
    }


        onClearForm = () => {
            this.setState(()=>({
                isModalOpen:false,
                isMessageModalOpen:false,
                customerName:'',            
                phoneNumber: 0,
                address:'',
                orderEndTime:moment().add(20, 'minutes').valueOf(),
                duration:defaultOrderDuration,
                description:'', 
                status:'confirmed',
                statusTime:moment().valueOf(),
                createdAt:moment().valueOf(),
                error:'',
                deliverMeth:'take away',
                deliverers:[new Deliverer('default','defaultId')],
                deliverer:'',
                onGuessByPNo:false
            }))
        }

        //handling customer Name
        onCustomerNameChange = (e) => {
            e.persist()
            this.setState(()=>({customerName:e.target.value}))
            console.log(moment(12645).toDate())
        }  

        GuessByPNo = (phoneNumber) => {
            let matchedOrder = []
            this.setState(()=>({
                customerName:'',
                address:'',
                description:''
            }))
            if(!!phoneNumber){
                this.props.orders.map((order)=>{
                    if (order.phoneNumber.includes(phoneNumber)){
                        matchedOrder.push(order)
                    }
                })
    
                if(!!matchedOrder.length){
                    this.setState(()=>({
                        customerName:matchedOrder[0].customerName,
                        address:matchedOrder[0].address,
                        description:matchedOrder[0].description
                    }))
                    
                }
            }   
        }

        //handling customer Phonenumber
        onPhoneNumberChange = (e) => {
            const phoneNumber = e.target.value
            console.log(typeof(phoneNumber))
            this.setState(()=>({phoneNumber: e.target.value}))     
            if(this.state.onGuessByPNo){
                this.GuessByPNo( phoneNumber)  
            }
              
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

        //handling Order AddDiscount
        onAddDiscount = (e) => { 
            e.persist()
                if(e.target.value < 50 && e.target.value >= 0){
                    this.setState(()=>({discount:e.target.value}))
                }
            
            
        }

        //handling Order Service Charge
        onAddServiceCharge = (e) => { 
            e.persist()
                if(e.target.value < 50 && e.target.value >= 0){
                    this.setState(()=>({serviceCharge:e.target.value}))
                }
            
        }

        //handling order Status
        onStatusChange = (e) => {
            e.persist()
            this.setState(()=>({
                status:e.target.value,
                statusTime:moment().valueOf()
            }))       
        }

        //handling deliverer Status
        onDelivererChange = (e) => {
            e.persist()
            this.setState(()=>({
                deliverer:e.target.value
            }))       
        }

        //handling delivererMeth Status
        onDeliverMethChange = (e) => {
            console.log(e.target.value)
            e.persist()
                   
            if(e.target.value === 'dinning'){
                this.setState(()=>({
                    deliverMeth:e.target.value,
                    serviceCharge:10
                }))  
            }else{
                this.setState(()=>({
                    deliverMeth:e.target.value
                }))
            }
        }

        // //handling kot Status
        // onKotStatusChange = (e) => {
        //     e.persist()
        //     this.setState(()=>({
        //         kotStatus:e.target.value,
        //         kotStatusTime:moment().valueOf()
        //     }))       
        // }

        // //handling bill Status
        // onBillStatusChange = (e) => {
        //     e.persist()
        //     this.setState(()=>({
        //         billStatus:e.target.value,
        //         billStatusTime:moment().valueOf()
        //     }))       
        // }

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

        //handling Food Modal  
        onVisibleMessageModal = (e) => {
            e.preventDefault()
            this.setState((prevState)=>({isMessageModalOpen: !prevState.isMessageModalOpen}))
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
        onBillAmountCalculationFinal = () => {
            let billAmount = 0
            if(!!this.state.foods){
                this.state.foods.map((food)=>billAmount=(food.food.amount*food.foodQuantity )+ billAmount)
            }
            let discount = billAmount/100 * this.state.discount
            let serviceCharge = billAmount/100 * this.state.serviceCharge
            billAmount = billAmount + serviceCharge - discount
            
            //console.log(billAmount)
            return billAmount
        }
        onBillAmountCalculation = () => {
            let billAmount = 0
            if(!!this.state.foods){
                this.state.foods.map((food)=>billAmount=(food.food.amount*food.foodQuantity )+ billAmount)
            }
            return billAmount
        }


        chechPreparedFood = (foods) =>{
            let allArePrepared = true
            foods.map((food)=>{
                console.log(food.prepared)
                if(food.prepared === false){
                    allArePrepared = false
                }
            })
            return allArePrepared
        }

    

    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.customerName || !this.state.phoneNumber || !this.state.orderEndTime || !this.state.foods){
            this.setState(()=>({
                error:'CUSTOMER NAME, PHONENUMBER, ORDER DURATIONS and ORDER PLACINGS are mandatoroy to fill'
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else if(!this.state.address && this.state.deliverMeth === 'delivery'){
            this.setState(()=>({
                error:'ADDRESS is mandatoroy to fill, if the deliver method is DELIVERY'
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else if(!this.props.order && (this.state.createdAt < moment().subtract(15, "minutes").valueOf())){
            this.setState(()=>({
                error:'Please Select a Valid Timeline for Your Order'
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else if(this.state.phoneNumber.slice(0,1) !== '0' || this.state.phoneNumber.length !== 10){
            this.setState(()=>({
                error:'Please Provide a Valid PHONE NUMBER'
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else if((this.state.status==='table' || this.state.status==='on delivery' || this.state.status==='recieved') && !this.chechPreparedFood(this.state.foods) ){
            console.log(this.state.status==='table')
            console.log(this.chechPreparedFood(this.state.foods))
            this.setState(()=>({
                error:`You cant Apply Status '${this.state.status}', if Foods are Not Prepared`
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else if((this.state.status==='kitchen' || this.state.status==='confirmed' ) && this.chechPreparedFood(this.state.foods) ){
            this.setState(()=>({
                error:`You cant Apply Status '${this.state.status}', if Foods are Already Prepared`
            }))
            if(!!this.props.order ){
                this.onVisibleMessageModal(e)
            }
        }else{//new StatusTimer(this.state.billStatus, this.state.billStatusTime)
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                address:this.state.address,
                amount:this.onBillAmountCalculation(),
                createdAt:this.state.createdAt,
                //billStatus:{status:this.state.billStatus, time:this.state.billStatusTime} ,
                customerName:this.state.customerName,
                description:this.state.description,
                foods:this.state.foods,
                //kotStatus:{status:this.state.kotStatus, time:this.state.kotStatusTime} ,
                orderEndTime:this.state.orderEndTime,
                phoneNumber:this.state.phoneNumber,
                status:{status:this.state.status, time:this.state.statusTime},
                deliverer:this.state.deliverer,
                deliverMeth:this.state.deliverMeth,
                discount:this.state.discount,
                serviceCharge:this.state.serviceCharge
            })
        }
    }

    /*
    GiMeal, GiPerson, GiPhone, GiHomeGarage, GiStabbedNote,
    GiTable, GiAlarmClock, GiCalendar, GiFullMotorcycleHelmet  
*/




    render(){
        let iterable = -1
        //console.log('this.props.orders', this.props)
        return(
            <div>
                
                <form className="form" onSubmit={this.props.order ? this.onVisibleMessageModal: this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    

                    <OrderModal 
                        onVisibleChange={this.onVisibleChange} 
                        isModalOpen = {this.state.isModalOpen}
                        onSingleOrderChange={this.onSingleOrderChange}
                        singleTypeOrders = {this.state.foods}
                        foods={this.props.foods}
                        
                    />

                    {/*Adding Customer Name*/}
                    <div className="input-group input-group--form">
                        <div className="form__icon-container"><GiPerson/></div>&nbsp;&nbsp;&nbsp;
                        <input
                            type="text"
                            placeholder="Customer Name"
                            value={this.state.customerName}
                            onChange={this.onCustomerNameChange}    
                            className="text-input"                    

                        />
                    </div>
                    

                    <div className="input-group">
                        <div className="form__icon-container"><GiPhone/></div>&nbsp;&nbsp;&nbsp;
                            {/*Adding Customer Name*/}
                        <input
                            type="number"
                            placeholder="Phone Number"
                            value={this.state.phoneNumber}
                            onChange={this.onPhoneNumberChange }  
                            className="text-input"
                        />&nbsp;&nbsp;&nbsp;
                        
                        
                        {this.state.onGuessByPNo && <span>(Guessing....) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        {!this.props.order  && <button type='button' onClick={()=>this.setState((prevState)=>({onGuessByPNo:!prevState.onGuessByPNo}))}>
                            {this.state.onGuessByPNo ? 'Off Guessing' : 'Onn Guessing'}
                        </button>}
                    </div>
                    

                    <div className="input-group input-group--form">
                        <div className="form__icon-container"><GiHomeGarage/></div>&nbsp;&nbsp;&nbsp;
                        {/*Adding Customer Address*/}
                        <input
                            type="text"
                            placeholder="Customer Address"
                            value={this.state.address}
                            onChange={this.onAddressChange }  
                            className="text-input"                       

                        />
                    </div>

                    <div className="input-group input-group--form">
                        <div className="form__icon-container"><GiMeal/></div>&nbsp;&nbsp;&nbsp;
                        <button 
                            className="button button--selectFood button--selectFood__streched" 
                            type='button' 
                            onClick={this.onVisibleChange}
                        >
                            Select Food
                        </button>
                        
                    </div>
                    
                    
                    <div className="form__selected-foods-container">
                        <div className="modal__totalAmount modal__totalAmount--form">
                            <div className="form__icon-container"><GiMoneyStack/></div>&nbsp;&nbsp;&nbsp;
                            <h3>{numeral(this.onBillAmountCalculationFinal()).format('$0,0.00') }</h3>
                        </div>
                        {
                            (!!this.state.foods && this.state.foods.length !== 0 ) && (
                                <div className="form__selected-foods">
                                    <table className="modal__tableSelectedFoods">
                                        <tr>
                                            <th>Name</th>
                                            <th>Potion Type</th>
                                            <th>Food Quantity</th>                                
                                            <th>Prepared</th>
                                            <th>Description</th>
                                            <th></th>
                                        </tr>
                                        {
                                            this.state.foods.map((food)=>{ 
                                            iterable = iterable + 1
                                                return (
                                                    <FoodSingleOrder 
                                                    key = {iterable}
                                                    iterable = {iterable}
                                                    singleTypeOrder = {food}
                                                    onRemoveSingleOrder = {this.onRemoveSingleOrder}
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

                    <div className="input-group input-group--form">
                        <div className="form__icon-container"><GiStabbedNote/></div>&nbsp;&nbsp;&nbsp;
                        {/*Adding Description*/}
                        <textarea 
                            placeholder="Add a discription for your order (optional)"
                            autoFocus 
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                            className="textarea" >
                            
                        </textarea>
                    </div>

                    <div className="input-group input-group--border">
                    
                        <div className="form__icon-container">Add Discount</div>&nbsp;&nbsp;&nbsp;
                            {/*Adding Customer Name*/}
                        <input
                            type="number"
                            placeholder="Discount"
                            value={this.state.discount}
                            onChange={this.onAddDiscount }  
                            className="text-input number-input-discount"
                        />&nbsp;&nbsp;&nbsp;
                        <div className="form__icon-container"><FaPercentage/></div>
                        <div>&nbsp;&nbsp;({numeral(this.onBillAmountCalculation()/ 100 * this.state.discount).format('$0,0.00') })</div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <div className="form__icon-container">Add Service Charge</div>&nbsp;&nbsp;&nbsp;
                            {/*Adding Customer Name*/}
                        <input
                            type="number"
                            placeholder="Service Charge"
                            value={this.state.serviceCharge}
                            onChange={this.onAddServiceCharge }  
                            className="text-input number-input-discount"
                        />&nbsp;&nbsp;&nbsp;
                        <div className="form__icon-container"><FaPercentage/></div>
                        <div>&nbsp;&nbsp;({numeral(this.onBillAmountCalculation()/ 100 * this.state.serviceCharge).format('$0,0.00') })</div>

                        
                        
                    </div>
                    
                    <div className="form__selectors">
                        <div>
                            {this.state.status === 'confirmed' && <div><GiConfirmed/></div>}
                            {this.state.status === 'kitchen' && <div><GiCook/></div>}
                            {this.state.status === 'table' && <div><GiTable/></div>}
                            {this.state.status === 'on delivery' && <div><FaMotorcycle/></div>}
                            {this.state.status === 'recieved' && <div><FaHome/></div>}
                            {this.state.status === 'cancelled' && <div><GiCancel/></div>}
                            {/*Adding Status*/}                    
                            <select className="select" value={this.state.status} onChange={this.onStatusChange} >
                                <option value ='confirmed'>Confirmed</option>
                                <option value ='kitchen'>Kitchen</option>
                                {!!this.props.order && <option value ='table'>Table</option>}
                                {(!!this.props.order && this.state.deliverMeth === "delivery") &&<option value ='on delivery'>On Delivery</option>}
                                {!!this.props.order &&<option value ='recieved'>Recieved</option>}
                                {!!this.props.order &&<option value ='cancelled'>Cancelled</option>}
                            </select>
                        </div>

                        

                        <div>
                            {this.state.deliverMeth === "take away" && <div><GiPerson/></div>}
                            {this.state.deliverMeth === "dinning" && <div><GiTable/></div>}
                            {this.state.deliverMeth === "delivery" && <div><FaMotorcycle/></div>}
                            {/*Adding DeliverMeth*/}                    
                            <select className="select" value={this.state.deliverMeth} onChange={this.onDeliverMethChange} >
                                <option value ='take away' disabled={this.state.status === 'on delivery'}>Take Away</option>
                                <option value ='dinning' disabled={this.state.status === 'on delivery'}>Dinning</option>
                                <option value ='delivery' >Delivery</option>
                            </select>
                        </div>
                        
                        

                        <div >
                            <div><GiAlarmClock/></div>
                            {/*Adding Order Duration*/}
                            <select className="select" value={this.state.duration} onChange={this.onDurationChange} >
                                <option value ='20'>20 minutes</option>
                                <option value ='30'>30 minutes</option>
                                <option value ='40'>40 minutes</option>
                                <option value ='50'>50 minutes</option>
                                <option value ='60'>1 hour</option>
                                <option value ='70'>1 hour 10 minutes</option>
                                <option value ='80'>1 hour 20 minute</option>
                                <option value ='90'>1 and 1\2 hour </option>
                            </select>
                        </div>
                        
                        <div>
                            <div className="form__icon-container"><GoCalendar/></div>
                            {/*Adding Order Creation Date*/}
                            <DatePicker
                                selected={moment(this.state.createdAt).toDate()}
                                onChange={this.onDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="datePicker"
                                minDate={moment().toDate()}
                            />
                            
                        </div>
                        
                        <div>
                            <div className="form__icon-container"><GiFullMotorcycleHelmet/></div>
                            {/*Adding Deliverer*/}                    
                            <select className="select" value={this.state.deliverer} onChange={this.onDelivererChange} disabled={this.state.deliverMeth !== 'delivery'}>
                                <option selected value =''>None Selected</option>
                                {
                                    this.state.deliverers.map((deliverer)=><option value ={deliverer.uid}>{deliverer.name}</option>)
                                }                       
                                <option selected value =''>None Selected</option>
                                
                            
                            </select>
                            
                        </div>
                        
                    </div>

                    {/*Adding KOT status*/}  
                    {/*<select value={this.state.kotStatus} onChange={this.onKotStatusChange} disabled={!this.props.order}>
                        <option value ='not'>Not Passed</option>
                        <option value ='passed'>Passed</option>
                    </select>*/}

                    {/*Adding Bill Status*/}  
                    {/*<select value={this.state.billStatus} onChange={this.onBillStatusChange} disabled={!this.props.order}>
                        <option value ='not'>Not Printed</option>
                        <option value ='printed'>Printed</option>
                </select> */} 

                    
                    <div className="button__splitter">
                        <button className="button">Save Order</button>
                        <button type='button' onClick={this.onClearForm}  className="button button--linkLogout">Clear Form</button>
                    </div>
                    

                </form>
                <MessageModal
                    onVisibleMessageModal={this.onVisibleMessageModal} 
                    isMessageModalOpen = {this.state.isMessageModalOpen}
                    onSubmit={this.onSubmit}
                    orderNo={this.state.orderNo}
                    message='Are You sure, Do you want to edit the Order'
                    title='Order Edit Alert'
                />

                   
            </div>
            
        )
    
    }
}


/*
const mapStateToProps = (state) => ({
    orders:orderSelector(state.orders, state.orderFilters)
})
*/
export default OrderForm