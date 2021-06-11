import React, {useState} from 'react'
import {connect} from 'react-redux'
import {setBoundryAmount, setCatTextFilter, setNameFilter, setSize} from '../../actions/foodFilters'
import CategoryModal from '../ManageFood/CategoryModal' 

export const FoodListFilters = (props) => {
    // States to handle category MODAL 
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [boundryAmountDisplay, setboundryAmountDisplay] = useState('')
   
    const handleCloseModal = () => setModalIsOpen(false);
    const handleOpenModal = () => setModalIsOpen(true);

    const handleCategory = (category) => {
        props.setCatTextFilter(category)
    }

    const onNameChange = (e) => {
        e.persist()
        //console.log(props)
        props.setNameFilter(e.target.value)
    }

    const onSizeChange = (e) => {
        e.persist()
        props.setSize(e.target.value)
    }

    const onBoundryAmountChange = (e) => {
        e.persist()
        props.setBoundryAmount(e.target.value)
        setboundryAmountDisplay(e.target.value)
        //document.getElementById('textInput').value=e.target.value;
    }
    

    return(
        <div>
            {/*setNameFilter filter*/}
            <input type="text" value={props.filters.name} onChange={onNameChange}/>

            {/*setSize filter*/}
            <select value={props.filters.size} onChange={onSizeChange}>
                <option value=''>All</option>
                <option value="regular">Regular</option>
                <option value="full">Full</option>
            </select>

            {/*setCatTextFilter filter*/}
            <button onClick={handleOpenModal}>{props.filters.catText ? props.filters.catText : 'Select Category'}</button>           
            <CategoryModal modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} handleCategory={handleCategory}/>

            {/*setBoundryAmount filter*/}
            <input type='range' min='0' max='2000' step='10' value={props.filters.boundryAmount} onChange={onBoundryAmountChange}/>
            <input type='text' id='textInput' disabled value={boundryAmountDisplay}></input>

        </div>
)}

const mapStateToProps = (state) => ({filters:state.foodFilters})

const mapDispatchToProps = (dispatch) => ({
    
    setBoundryAmount: (amount) => dispatch(setBoundryAmount(amount)),
    setSize: (size) => dispatch(setSize(size)),
    setCatTextFilter: (catText) => dispatch(setCatTextFilter(catText)),
    setNameFilter: (name) => dispatch(setNameFilter(name))

})

export default connect(mapStateToProps, mapDispatchToProps)(FoodListFilters)