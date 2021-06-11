


//GET_VISIBLE_FOODS.....................................................
const getVisibleFoods = (foods, {name, catText, boundryAmount=2000, size}) => {
        let boundry_Amount = boundryAmount
        if(typeof boundry_Amount !== 'number'){
            boundry_Amount = parseInt(boundry_Amount, 10)
        }
    return foods.filter((food)=>{
        
        const boundryAmountMatch = typeof boundry_Amount !== 'number' || food.amount <= boundryAmount
        const nameMatch = food.name.toLowerCase().includes(name.toLowerCase())
        const catTextMatch = food.category.toLowerCase().includes(catText.toLowerCase())
        const sizeMatch = food.foodSize.toLowerCase().includes(size.toLowerCase())
        
        
        //console.log(food.foodSize)
        return boundryAmountMatch && nameMatch && catTextMatch && sizeMatch
    }).sort((a, b)=>{
        return a.amount < b.amount ? 1 : -1
    })
}

export default getVisibleFoods