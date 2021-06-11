import React from 'react'
import Modal from 'react-modal'
import CategoryList from '../../fixtures/FoodCategoryList'

const CategoryModal = (props) => {
    return(
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel = "Please Select a Category"
            onRequestClose = {props.handleCloseModal}
        >
            <h3>Please Select a Category</h3>
            {
                CategoryList().map((category)=>(
                    <button onClick={() =>{                
                        props.handleCategory(category)
                        props.handleCloseModal()
                    }}>{category}</button>
                ))
            }
            
        </Modal>
)}

export default CategoryModal;


/*

*/