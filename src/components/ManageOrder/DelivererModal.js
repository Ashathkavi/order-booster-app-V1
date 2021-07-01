import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import CategoryList from '../../fixtures/FoodCategoryList'
import database from '../../firebase/firebase'


class Deliverer{
    constructor(name, uid){
        this.name = name
        this.uid = uid
    }
}



const DelivererModal = (props) => {

    const [deliverers, setDeliverers] = useState([])

    useEffect(()=>{
        const deliverers = []
        database.ref(`users`).once('value')
            .then((snap)=>{
                snap.forEach((childSnapshot)=>{
                    if(childSnapshot.val().role === 'deliverer'){
                        const deliverer = new Deliverer(childSnapshot.val().name, childSnapshot.key)
                        deliverers.push(deliverer)                        
                    }
                })
                setDeliverers(deliverers)                    
            })
            .catch((error)=>console.log('User gaining request failed :', error))
        
    })

    return(
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel = "Please Select a Deliverer"
            onRequestClose = {props.handleCloseModal}
        >
            <h3>Please Select a Deliverer</h3>
            {
                deliverers.map((deliverer)=>(
                    <button onClick={() =>{                
                        props.onDelivery(deliverer.uid)
                        props.handleCloseModal()
                    }}>{deliverer.name}</button>
                ))
            }
            
        </Modal>
)}

export default DelivererModal;


/*

*/