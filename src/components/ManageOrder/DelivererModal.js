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

const useFetchDeliverer = () => {
    const [value, setValue] = useState([]);
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
                setValue(deliverers)                    
            })
            .catch((error)=>console.log('User gaining request failed :', error))
        
    },[])
    return [value, setValue]
}



const DelivererModal = (props) => {

    const [deliverers, setDeliverers] = useFetchDeliverer()

    

    const arrayBuilder = (array, devideBy) => {
        let DelivererListV1 = []
        let DelivererListV2 = []
        let i = 0
        array.map((item)=>{
            DelivererListV1.push(item)
            i = i +1

            if(i===devideBy){
                DelivererListV2.push(DelivererListV1)
                i=0
                DelivererListV1=[]
            }

            if(array.indexOf(item) === array.length - 1){
                DelivererListV2.push(DelivererListV1)
                console.log()
            }

        }) 
        return DelivererListV2

    }
    const modifiedDelList = arrayBuilder(deliverers, 2)
    

    return(
        <Modal
            isOpen={props.modalIsOpen}
            contentLabel = "Please Select a Deliverer"
            onRequestClose = {props.handleCloseModal}
        >
            <h3 className="modal__header" >Please Select a Deliverer</h3>
            <div>
            
                {
                    modifiedDelList.map((internalDelList)=>{
                        console.log(modifiedDelList)
                        return(
                            <div className="modal__content">
                                {
                                    internalDelList.map((deliverer)=> (
                                        <div className="modal__content__item__deliverer">
                                            <button className="button button--selectFood" onClick={() =>{                
                                                props.onDelivery(deliverer.uid)
                                                props.handleCloseModal()
                                            }}>{deliverer.name}</button>
                                        </div>
                                    ))
                                    
                                }
                                {
                                    internalDelList[1] === undefined ? <div className="modal__content__item__deliverer"></div> : null
                                    
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="modal__buttons">
                    
                <button className="button button--closeModal" onClick={()=>props.handleCloseModal()}>Close</button>
                <button className="button button--selectNone" onClick={()=>{
                    props.onDelivery('') 
                    props.handleCloseModal()
                }}>Select None</button>
            </div>
            
        </Modal>
)}

export default DelivererModal;


/*

*/