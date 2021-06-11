import React, {useState} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {
    setBoundryAmount,
    setFoodFilter,
    setBillStatusFilter,
    setKotStatusFilter,
    setStatusFilter,
    setPNoFilter,
    setCustomerFilter,
    setAddressFilter,
    setStartDate,
    setEndDate,
    sortByDuration,
    sortByAmount,
    sortByDate
} from '../../actions/orderFilters' 
import DatePicker from 'react-datepicker'



export const OrderListFilters = (props) => {

    const [boundryAmountDisplay, setboundryAmountDisplay] = useState('')


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
        props.setBoundryAmount(e.target.value)
        setboundryAmountDisplay(e.target.value)
    }

    const onStatusChange = (e) => {
        props.setStatusFilter(e.target.value)
    }

    const onKotStatusChange = (e) => {
        props.setKotStatusFilter(e.target.value)
    }

    const onBillStatusChange = (e) => {
        props.setBillStatusFilter(e.target.value)
    }

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

    


    return(
        <div>
            {/*setAddressFilter filter*/}
            <input type="text" value={props.filters.address} placeholder="Type an Address" onChange={onAddressChange}/>

            {/*setCustomerFilter filter*/}
            <input type="text" value={props.filters.customerName} placeholder="Type a Customer Name" onChange={onCustomerChange}/>

            {/*setFoodFilter filter*/}
            <input type="text" value={props.filters.food} placeholder="Type a Food" onChange={onFoodChange}/>

            {/*setPNoFilter filter*/}
            <input type="number" value={props.filters.phoneNumber} pattern={/^[0-9]{10}$/} placeholder="Type a PhoneNumber" onChange={onPhoneNumberChange}/>

            {/*setBoundryAmount filter*/}
            <input type='range' min='0' max='20000' step='100' value={props.filters.boundryAmount} onChange={onBoundryAmountChange}/>
            <input type='text' id='textInput' disabled value={setboundryAmountDisplay}></input>

            {/*setStatusFilter filter*/}
            <select value={props.filters.status} onChange={onStatusChange}>
                <option value=''>All</option>
                <option value="confirmed">Confirmed</option>
                <option value="kitchen">Kitchen</option>
                <option value="table">Table</option>
                <option value="cancelled">Cancelled</option>
                <option value="on delivery">On Delivery</option>
                <option value="recieved">Recieved</option>
            </select>

            {/*setKotStatusFilter filter*/}
            <select value={props.filters.kotSatus} onChange={onKotStatusChange}>
                <option value=''>All</option>
                <option value="passed">Passed</option>
                <option value="not">Not Passed</option>
            </select>

            {/*setBillStatusFilter filter*/}
            <select value={props.filters.billStatus} onChange={onBillStatusChange}>
                <option value =''>All</option>
                <option value="printed">Printed</option>
                <option value="not">Not Printed</option>
            </select>

            {/*setBillStatusFilter filter*/}
            <select value={props.filters.sortBy} onChange={onSortChange}>            
                <option value="date">Date</option>
                <option value="duration">Available Time</option>
                <option value="amount">Amount</option>
            </select>

            {/*setStartDate setEndDate filter*/}
            <DatePicker    
                selected={props.filters.startDate}
                startDate={props.filters.startDate}   
                endDate={props.filters.endDate} 
                selectsRange
                onChange= {onDateChange}
            />           

        </div>
)}

const mapStateToProps = (state) =>  ({filters:state.orderFilters})

const mapDispatchToProps = (dispatch) => ({
    setAddressFilter: (address) => dispatch(setAddressFilter(address)),
    setCustomerFilter: (customerName) => dispatch(setCustomerFilter(customerName)),
    setBoundryAmount: (amount) => dispatch(setBoundryAmount(amount)),
    setFoodFilter: (food) => dispatch(setFoodFilter(food)),
    setPNoFilter: (phoneNumber) => dispatch(setPNoFilter(phoneNumber)),
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