import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {
    setBoundryAmount,
    setFoodFilter,
    // setBillStatusFilter,
    // setKotStatusFilter,
    setStatusFilter,
    setPNoFilter,
    setCustomerFilter,
    setAddressFilter,
    setStartDate,
    setEndDate,
    sortByDuration,
    sortByAmount,
    sortByDate,
    setDeliverMethFilter
} from '../../actions/orderFilters' 
import DatePicker from 'react-datepicker'



export const OrderListFilters = (props) => {

    const [boundryAmountDisplay, setboundryAmountDisplay] = useState('')
    const [displayManageFilter, setDisplayManageFilter] = useState(false)

    useEffect(()=>{
        if(props.autherizedAs === 'admin' || props.autherizedAs === 'manager'){
            setDisplayManageFilter(true)
        }
    },[])


    const onDateChange = (dates) => {
        let [startDate, endDate] = dates;
        startDate = moment(startDate).valueOf()
        endDate =  moment(endDate).valueOf()
        //console.log(startDate,'start',endDate,'end')
        props.setStartDate(startDate)
        props.setEndDate(endDate)
    }

    const onAddressChange = (e) => {
        props.setAddressFilter(e.target.value)
    }

    const onCustomerChange = (e) => {
        props.setCustomerFilter(e.target.value)
    }

    const onFoodChange = (e) => {
        props.setFoodFilter(e.target.value)
    }

    const onPhoneNumberChange = (e) => {
        props.setPNoFilter(e.target.value)
    }

    const onBoundryAmountChange = (e) => {
        //console.log(typeof e.target.value )
        const boundryAmount = parseInt(e.target.value)
        //console.log(boundryAmount )
        props.setBoundryAmount(boundryAmount)

        setboundryAmountDisplay(e.target.value)
    }

    const onStatusChange = (e) => {
        props.setStatusFilter(e.target.value)
    }

    const onDeliverMethChange = (e) => {
        
        props.setDeliverMethFilter(e.target.value)
    }

    // const onKotStatusChange = (e) => {
    //     props.setKotStatusFilter(e.target.value)
    // }

    // const onBillStatusChange = (e) => {
    //     props.setBillStatusFilter(e.target.value)
    // }

    const onSortChange = (e) => {
        const billStatus = e.target.value
                
        if (billStatus=== 'duration'){
            props.sortByDuration()
        }else if(billStatus === 'amount'){
            props.sortByAmount()
        }else if(billStatus === 'date'){
            props.sortByDate()
        } 
    }

    


    return displayManageFilter ? (
        <div className = "content-container" >
            <div className="input-group">
                <button onClick={()=>props.setSawFilters(false)}>Hide Filter</button>
            </div>
            <div className="input-group">
                <div className="input-group__item">
                    {/*setAddressFilter filter*/}
                    <input className="text-input" type="text" value={props.filters.address} placeholder="Type an Address" onChange={onAddressChange}/>
                </div>
                <div className="input-group__item">
                    {/*setCustomerFilter filter*/}
                    <input className="text-input" type="text" value={props.filters.customerName} placeholder="Type a Customer Name" onChange={onCustomerChange}/>
                </div>
                <div className="input-group__item" >
                    {/*setFoodFilter filter*/}
                    <input className="text-input" type="text" value={props.filters.food} placeholder="Type a Food" onChange={onFoodChange}/>
                </div>
                <div className="input-group__item">
                    {/*setPNoFilter filter*/}
                    <input className="text-input" type="number" value={props.filters.phoneNumber} pattern={/^[0-9]{10}$/} placeholder="Type a PhoneNumber" onChange={onPhoneNumberChange}/>
                </div>
                
            </div>
            <div className="input-group">
                <div className="input-group__item input-group__item--range">
                    {/*setBoundryAmount filter*/}                    
                    <div>                    
                        <input className="text-input" type='text' id='textInput' disabled value={boundryAmountDisplay}></input>
                    </div>
                    <div>                    
                        <input className="text-input" type='range' min='0' max='20000' step='100' value={props.filters.boundryAmount} onChange={onBoundryAmountChange}/>
                    </div>
                </div>
                <div className="input-group__item">
                    {/*setStatusFilter filter*/}
                    <select className="select" value={props.filters.status} onChange={onStatusChange}>
                        <option value=''>All</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="table">Table</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="on delivery">On Delivery</option>
                        <option value="recieved">Recieved</option>
                    </select>
                </div>
                <div className="input-group__item"> 
                    {/*setBillStatusFilter filter*/}
                    <select className="select" value={props.filters.sortBy} onChange={onSortChange} placeholder="abcd">            
                        <option value="date">Date</option>
                        <option value="duration">Available Time</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
                <div className="input-group__item"> 
                    {/*setBillStatusFilter filter*/}
                    <select className="select" value={props.filters.deliverMeth} onChange={onDeliverMethChange} >
                        <option value="">Any</option>            
                        <option value="delivery">Delivery</option>
                        <option value="take away">Take Away</option>
                        <option value="dinning">Dinning</option>
                    </select>
                </div>
                <div className="input-group__item">
                    {/*setStartDate setEndDate filter*/}
                    <DatePicker    
                        selected={props.filters.startDate}
                        startDate={props.filters.startDate}   
                        endDate={props.filters.endDate} 
                        selectsRange
                        onChange= {onDateChange}
                        className="datePicker"
                    />  
                </div>
            </div>
        </div>
)  : (
        <div className = "content-container" >
            <div className="input-group">
                <button onClick={()=>props.setSawFilters(false)}>Hide Filter</button>
            </div>
            <div className="input-group">
                <div className="input-group__item" >
                    {/*setFoodFilter filter*/}
                    <input className="text-input" type="text" value={props.filters.food} placeholder="Type a Food" onChange={onFoodChange}/>
                </div>
                <div className="input-group__item">
                    {/*setStatusFilter filter*/}
                    <select className="select" value={props.filters.status} onChange={onStatusChange}>
                        <option value=''>All</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="table">Table</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="on delivery">On Delivery</option>
                        <option value="recieved">Recieved</option>
                    </select>
                </div>
                <div className="input-group__item"> 
                    {/*setBillStatusFilter filter*/}
                    <select className="select" value={props.filters.sortBy} onChange={onSortChange} placeholder="abcd">            
                        <option value="date">Date</option>
                        <option value="duration">Available Time</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
                <div className="input-group__item"> 
                    {/*setBillStatusFilter filter*/}
                    <select className="select" value={props.filters.deliverMeth} onChange={onDeliverMethChange} >
                        <option value="">Any</option>            
                        <option value="delivery">Delivery</option>
                        <option value="take away">Take Away</option>
                        <option value="dinning">Dinning</option>
                    </select>
                </div>
                <div className="input-group__item">
                    {/*setStartDate setEndDate filter*/}
                    <DatePicker    
                        selected={props.filters.startDate}
                        startDate={props.filters.startDate}   
                        endDate={props.filters.endDate} 
                        selectsRange
                        onChange= {onDateChange}
                        className="datePicker"
                    />  
                </div>
            </div>
        </div>

)}

const mapStateToProps = (state) =>  ({
    filters:state.orderFilters,
    autherizedAs:state.auth.role
})

const mapDispatchToProps = (dispatch) => ({
    setAddressFilter: (address) => dispatch(setAddressFilter(address)),
    setCustomerFilter: (customerName) => dispatch(setCustomerFilter(customerName)),
    setBoundryAmount: (amount) => dispatch(setBoundryAmount(amount)),
    setFoodFilter: (food) => dispatch(setFoodFilter(food)),
    setPNoFilter: (phoneNumber) => dispatch(setPNoFilter(phoneNumber)),
    setDeliverMethFilter:(deliverMeth) => dispatch(setDeliverMethFilter(deliverMeth)),
    setStatusFilter: (status) => dispatch(setStatusFilter(status)),
    setKotStatusFilter: (kotStatus) => dispatch(setKotStatusFilter(kotStatus)),
    setBillStatusFilter: (billStatus) => dispatch(setBillStatusFilter(billStatus)),    
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDuration: () => dispatch(sortByDuration()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),

})


export default connect(mapStateToProps, mapDispatchToProps)(OrderListFilters)