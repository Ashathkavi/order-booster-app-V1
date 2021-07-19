import React from 'react'
import CategoryModal from '../ManageFood/CategoryModal'
import moment from 'moment'

export default class FoodForm extends React.Component{
    
    constructor(props){

        super(props)
        
        this.state={
            modalIsOpen:false,
            category: !!props.food? props.food.category  : (!!props.foodlargeAvailable ? props.foodlargeAvailable.category :''),
            fullAvailability:props.food ? props.food.largeAvailability : (!!props.foodlargeAvailable ? true: false),
            foodSize:props.food ? props.food.foodSize : (!!props.foodlargeAvailable ? props.foodlargeAvailable.foodSize : 'regular'),
            name:props.food ? props.food.name :  (!!props.foodlargeAvailable ? props.foodlargeAvailable.name :''),
            description:props.food ? props.food.description : (!!props.foodlargeAvailable ? props.foodlargeAvailable.description :  ''),
            amount: props.food ? props.food.amount.toString() : '',
            createdAt: props.food ? props.food.createdAt : moment().valueOf(),
            error:''
        }
        console.log(this.state.category)
    }
    
    

    onSetSize = (e) => {
        this.setState(() => ({
            foodSize:e.target.value
        }))              
    }

    onAvailabilityChange = (e) => {
        //console.log('e.target.value', 'true' === e.target.value)
        if(e.target.value==='false' && this.state.foodSize === 'full'){
            this.setState(() => ({
                foodSize:'regular'
            }))
        }
            
        this.setState(() => ({
            fullAvailability:(e.target.value === 'true')
        }))
    }

    handleCloseModal = () => {    
        this.setState(()=>({
            modalIsOpen:false
        }))
    }
    handleOpenModal = () => {       
        //console.log('open')
        this.setState(()=>({
            modalIsOpen:true
        }))
    }
    handleCategory = (category) => { 
        //console.log('category', category)
        //document.getElementById('selectedCat').value=category; 
        this.setState(()=>({
            category
        }))
    }
    onNameChange = (e) => {
        this.setState(()=>({
            name:e.target.value
        }))
    }
    onDescriptionChange = (e) => {
        this.setState(()=>({
            description:e.target.value
        }))
    }
    onAmountChange = (e) => {
        this.setState(()=>({
            amount:e.target.value
        }))
        //document.getElementById('textInput').value=e.target.value; 
    }

    onCheckFoodsPresents = (foodName, foodSize) => {
        let presents = false
        this.props.foods.map((food)=>{
            if(food.name.toLowerCase() === foodName.toLowerCase() && food.foodSize === foodSize){
                presents = true
                if(!!this.props.food && (this.props.food.name.toLowerCase() === foodName.toLowerCase() && this.props.food.foodSize === foodSize)){
                    presents = false
                }
            }
        })
        return presents
    }

    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.name || !this.state.category || !this.state.foodSize ){
            this.setState(()=>({
                error:'The field such as NAME, CATEGORY, FULL_AVAILABILITY and FOODSIZE are mandatoroy to fill'
            }))
        }else if(this.onCheckFoodsPresents(this.state.name, this.state.foodSize)){
            this.setState(()=>({
                error:'The Submitted Food is already Available'
            }))
        }else{
            this.setState(()=>({error:''}))
            this.props.onSubmit({
                name:this.state.name,
                amount:parseInt(this.state.amount),
                createdAt:this.state.createdAt,
                description:this.state.description,
                largeAvailability:this.state.fullAvailability,
                foodSize:this.state.foodSize,
                category:this.state.category
            })
        }
    }



    //this.handleSizeRadio()
    render(){
        console.log(this.props,'this.props')
        console.log(this.state,'this.state')
        // console.log('state.modalIsOpen',this.state.modalIsOpen)
        // console.log('state.category',this.state.category)
        // console.log('state.fullAvailability',this.state.fullAvailability)
        // console.log('state.foodSize',this.state.foodSize)
        // console.log('state.description',this.state.description)
        // console.log('state.name',this.state.name)
        return (
                
                
                <form onSubmit={this.onSubmit} className="form">
                    
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <div>
                        { !this.state.category && <span>  Please Select a Food Category First &nbsp;&nbsp;&nbsp;&nbsp;</span>}
                        <button disabled={!!this.props.foodlargeAvailable} type="button" onClick={this.handleOpenModal}> Select Category</button>
                        &nbsp;&nbsp;
                        <input disabled={!!this.props.foodlargeAvailable}  type='text' id='selectedCat' value={this.state.category} disabled required></input>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        disabled={  !this.state.category || !!this.props.foodlargeAvailable}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="text-input"
                    />
                    <div>
                        <input type='text' id='textInput' value={this.state.amount} disabled></input>
                        <input  type='range' min='0' max='2000' disabled={!this.state.category} step='10' value={this.state.amount} onChange={(e)=>{
                            this.onAmountChange(e)
                            //this.updateTextInput(e.target.value)
                        }}/>
                    </div>
                    


                    <div >Is Full postion available &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input disabled={!!this.props.foodlargeAvailable} type="radio" value={true} checked={this.state.fullAvailability === true} onChange={this.onAvailabilityChange} /> Yes &nbsp;&nbsp;&nbsp;
                        <input disabled={!!this.props.foodlargeAvailable} type="radio" value={false} checked={this.state.fullAvailability === false} onChange={this.onAvailabilityChange} /> No
                    </div>
                    <div hidden={!this.state.fullAvailability} >Set the size of the potion &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input disabled={!!this.props.foodlargeAvailable} type="radio" value='regular' checked={this.state.foodSize === 'regular'} onChange={this.onSetSize} /> Normal &nbsp;&nbsp;&nbsp;
                        <input disabled={!!this.props.foodlargeAvailable} type="radio" value='full' checked={this.state.foodSize === 'full'} onChange={this.onSetSize} /> Full
                    </div>

                    
                                
                    <CategoryModal modalIsOpen={this.state.modalIsOpen} handleCloseModal={this.handleCloseModal} handleCategory={this.handleCategory}/>
                    
                    <textarea 
                        placeholder="Add a description about this food" 
                        disabled={!this.state.category}
                        value={this.state.description}
                        onChange={this.onDescriptionChange}   
                        className="textarea"
                    />
                    
                    <div>
                        <button className="button">Save Food</button>

                    </div>

                </form>
        )
    }
}