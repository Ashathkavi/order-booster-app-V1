import sampleFoods from './sampleFoods'
import moment from 'moment'

const now = moment()

class SingleOrder  {
    constructor(food, foodQuantity){
        this.food = food
        this.foodQuantity = foodQuantity
    }
}

const onBillAmountCalculation = (foods) => {
    let billAmount = 0
    foods.map((food)=>billAmount=(food.food.amount*food.foodQuantity )+ billAmount)
    //console.log(billAmount)
    return billAmount
}

export default () =>[
    {
        id:'1',
        createdAt :moment().valueOf(), 
        customerName:'Ashath', 
        description : "less oil", 
        phoneNumber:'0765822562', 
        orderEndTime : moment().add(20, 'minutes').valueOf(),
        address:'Mamangam',
        status:{
            status:'confirmed',
            time:moment().valueOf()
        },
        kotStatus:{
            status:'passed',
            time:moment().add(5, 'minutes').valueOf()
        },
        billStatus:{
            status:'printed',
            time:moment().add(5, 'minutes').valueOf()
        },
        foods:[new SingleOrder(sampleFoods()[1], 2), new SingleOrder(sampleFoods()[0], 3)],
        amount:onBillAmountCalculation([new SingleOrder(sampleFoods()[1], 2), new SingleOrder(sampleFoods()[0], 3)])
    },
    {
        id:'2',
        createdAt :moment().add(6, 'days').valueOf(), 
        customerName:'AshathKavi', 
        description : "more oil", 
        phoneNumber:'0765812582', 
        orderEndTime : moment().add(8, 'days').valueOf(),
        address:'koolavadi',
        status:{
            status:'kitchen',
            time:moment().add(6, 'days').valueOf()
        },
        kotStatus:{
            status:'passed',
            time:moment().add(6, 'days').valueOf()
        },
        billStatus:{
            status:'printed',
            time:moment().add(6, 'days').valueOf()
        },
        foods:[new SingleOrder(sampleFoods()[2], 2), new SingleOrder(sampleFoods()[0], 1)],
        amount:onBillAmountCalculation([new SingleOrder(sampleFoods()[2], 2), new SingleOrder(sampleFoods()[0], 1)])
    },
    {
        id:'3',
        createdAt :moment().add(8, 'days').valueOf(),
        customerName:'Pushpandan', 
        description :"low spicy", 
        phoneNumber:'0765165145', 
        orderEndTime : moment().add(9, 'days').valueOf(),
        address:'Mamangam',
        status:{
            status:'table',
            time:moment().add(8, 'days').valueOf()
        },
        kotStatus:{
            status:'not',
            time:0
        },
        billStatus:{
            status:'not',
            time:0
        },
        foods:[new SingleOrder(sampleFoods()[0], 2), new SingleOrder(sampleFoods()[2], 3)],
        amount:onBillAmountCalculation([new SingleOrder(sampleFoods()[0], 2), new SingleOrder(sampleFoods()[2], 3)])
    }
]