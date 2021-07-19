import moment from 'moment'


//GET_VISIBLE_ORDERS.....................................................
const getVisibleorders = (orders, {
    address,
    customerName,
    boundryAmount,
    food,
    phoneNumber,
    deliverMeth,
    status,
    // kotStatus,
    // billStatus,
    sortBy, 
    startDate,
    endDate
}) => {
    let importantStatus = []
    let cancelStatus = []
    let recievedStatus = []
    //console.log('orders', orders)
    const filteredArray =  orders.filter((order)=>{
        const food_recieved = food

        const createdAtMoment = moment(order.createdAt);
        const startDateMoment = moment(startDate)
        const endDateMoment = moment(endDate)
        
        const startDateMatch = startDate ? startDateMoment.isSameOrBefore(createdAtMoment, 'day'):true
        const endDateMatch = endDate ? endDateMoment.isSameOrAfter(createdAtMoment, 'day'):true

        let boundry_Amount = boundryAmount
        if(typeof boundry_Amount !== 'number'){
            boundry_Amount = parseInt(boundry_Amount, 10)
        }        
        const boundryAmountMatch = typeof boundry_Amount !== 'number' || order.amount <= boundryAmount

        


        const addressMatch = order.address.toLowerCase().includes(address.toLowerCase())
        const customerNameMatch = order.customerName.toLowerCase().includes(customerName.toLowerCase())       
        const phoneNumberMatch = order.phoneNumber.includes(phoneNumber)
        const deliverMethMatch = order.deliverMeth.toLowerCase().includes(deliverMeth.toLowerCase())
        const statusMatch = order.status.status.toLowerCase().includes(status.toLowerCase())
        // const kotStatusMatch = order.kotStatus.status.toLowerCase().includes(kotStatus.toLowerCase())
        // const billStatusMatch = order.billStatus.status.toLowerCase().includes(billStatus.toLowerCase())
        //console.log(order.foods.filter((food)=> food.name.toLowerCase().includes(food_recieved.toLowerCase())).length)
        const foodMatch = 0 !== order.foods.filter((food)=> food.food.name.toLowerCase().includes(food_recieved.toLowerCase())).length 
        /*
        console.log('startDateMatch', startDateMatch)
        console.log('endDateMatch', endDateMatch)
        console.log('addressMatch', addressMatch)
        console.log('customerNameMatch', customerNameMatch)
        console.log('boundryAmountMatch', boundryAmountMatch)
        console.log('foodMatch', foodMatch)
        console.log('phoneNumberMatch', phoneNumberMatch)
        */
        // console.log("orderEndTime",moment(order.orderEndTime).toDate())
        // console.log("createdAt",moment(order.createdAt).toDate())
        // console.log("difference",order.orderEndTime - order.createdAt)
        
        return startDateMatch && endDateMatch && addressMatch &&
            customerNameMatch && boundryAmountMatch && foodMatch && phoneNumberMatch &&
            statusMatch && deliverMethMatch //&& kotStatusMatch && billStatusMatch  
        

    }).sort((a, b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })

    if(sortBy === 'duration'){
        filteredArray.map((order)=>{
            if(order.status.status === 'recieved'){
                recievedStatus.push(order)
            }else if(order.status.status === 'cancelled'){
                cancelStatus.push(order)
            }else{
                importantStatus.push(order)
            }
        })
        let sortedRecievedStatus = recievedStatus.sort((a,b)=>{
            return (a.orderEndTime - moment().valueOf()) < (b.orderEndTime - moment().valueOf()) ? -1 : 1
        })
        let sortedCancelStatus = cancelStatus.sort((a,b)=>{
            return (a.orderEndTime - moment().valueOf()) < (b.orderEndTime - moment().valueOf()) ? -1 : 1
        })
        let sortedImportantStatus = importantStatus.sort((a,b)=>{
            return (a.orderEndTime - moment().valueOf()) < (b.orderEndTime - moment().valueOf()) ? -1 : 1
        })
        console.log(sortedImportantStatus.concat(sortedRecievedStatus, sortedCancelStatus))
        return sortedImportantStatus.concat(sortedRecievedStatus, sortedCancelStatus)

    }else{
        return filteredArray
    }
}

export default getVisibleorders