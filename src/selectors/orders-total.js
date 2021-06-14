export default (orders) => {
    if(orders.length === 0){
        return 0
    }else{
        return orders
            .map((order)=>order.amount)
            .reduce((sum, value) => {
                return sum + value;
            }, 0)
    }
}