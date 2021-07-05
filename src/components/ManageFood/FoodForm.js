import React from 'react'
import CategoryModal from '../ManageFood/CategoryModal'
import moment from 'moment'

export default class FoodForm extends React.Component{
    
    state={
        modalIsOpen:false,
        category: this.props.food? this.props.food.category : '',
        fullAvailability:this.props.food ? this.props.food.largeAvailability : false,
        foodSize:this.props.food ? this.props.food.foodSize : 'regular',
        name:this.props.food ? this.props.food.name :  '',
        description:this.props.food ? this.props.food.description :  '',
        amount: this.props.food ? this.props.food.amount.toString() : '',
        createdAt: this.props.food ? this.props.food.createdAt : moment().valueOf(),
        error:''
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


    onSubmit = (e) => {
        e.preventDefault()
        if(!this.state.name || !this.state.category || !this.state.foodSize ){
            this.setState(()=>({
                error:'The field such as NAME, CATEGORY, FULL_AVAILABILITY and FOODSIZE are mandatoroy to fill'
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
        //console.log(this.props.food.category)
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
                        <button type="button" onClick={this.handleOpenModal}> Select Category</button>
                        &nbsp;&nbsp;
                        <input type='text' id='selectedCat' value={this.state.category} disabled required></input>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        disabled={!this.state.category}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        className="text-input"
                    />
                    <div>
                        <input type='text' id='textInput' value={this.state.amount} disabled></input>
                        <input type='range' min='0' max='2000' disabled={!this.state.category} step='10' value={this.state.amount} onChange={(e)=>{
                            this.onAmountChange(e)
                            //this.updateTextInput(e.target.value)
                        }}/>
                    </div>
                    


                    <div>Is Full postion available &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input type="radio" value={true} checked={this.state.fullAvailability === true} onChange={this.onAvailabilityChange} /> Yes &nbsp;&nbsp;&nbsp;
                        <input type="radio" value={false} checked={this.state.fullAvailability === false} onChange={this.onAvailabilityChange} /> No
                    </div>
                    <div hidden={!this.state.fullAvailability} >Set the size of the potion &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <input type="radio" value='regular' checked={this.state.foodSize === 'regular'} onChange={this.onSetSize} /> Normal &nbsp;&nbsp;&nbsp;
                        <input type="radio" value='full' checked={this.state.foodSize === 'full'} onChange={this.onSetSize} /> Full
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