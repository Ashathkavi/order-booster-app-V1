import React from 'react'
import Modal from 'react-modal'
import CategoryList from '../../fixtures/FoodCategoryList'

const CategoryModal = (props) => {
    const availalbleRow = Math.floor(CategoryList().length / 3 + 1);

    const arrayBuilder = (array, devideBy) => {
        let categoryListV1 = []
        let categoryListV2 = []
        let i = 0
        array.map((item)=>{
            categoryListV1.push(item)
            i = i +1

            if(i===devideBy){
                categoryListV2.push(categoryListV1)
                i=0
                categoryListV1=[]
            }

            if(array.indexOf(item) === array.length - 1){
                categoryListV2.push(categoryListV1)
                console.log()
            }

        }) 
        return categoryListV2
    }

    const modifiedCatList = arrayBuilder(CategoryList(), 4)
    console.log(modifiedCatList)

    
    return(
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel = "Please Select a Category"
            onRequestClose = {props.handleCloseModal}
        >

            <h3 className="modal__header" >Please Select a Category</h3>
            <div className="modal-layout">            
                <div className="modal">
                    {
                        modifiedCatList.map((internalCatList)=>{
                                return(
                                    <div className="modal__content">
                                        {
                                            internalCatList.map((category)=> (
                                                <div className="modal__content__item">
                                                    <button className="button button--selectFood" onClick={() =>{                
                                                        props.handleCategory(category)
                                                        props.handleCloseModal()
                                                    }}>{category}</button>
                                                </div>
                                            ))
                                            
                                        }
                                        {
                                            internalCatList[1] === undefined ? <div className="modal__content__item"></div> : null
                                            
                                        }
                                        {
                                            internalCatList[2] === undefined ? <div className="modal__content__item"></div> : null
                                        }
                                        {
                                            
                                            internalCatList[3] === undefined ? <div className="modal__content__item"></div> : null
                                        }
                                    </div>
                                )
                        })
                    }
                </div>
                <div className="modal__buttons">
                    
                    <button className="button button--closeModal" onClick={()=>props.handleCloseModal()}>Close</button>
                    <button className="button button--selectNone" onClick={()=>{
                        props.handleCategory('') 
                        props.handleCloseModal()
                    }}>Select None</button>
                </div>
                
            </div>
            
        </Modal>
)}

export default CategoryModal;


/*

*/