import React from 'react'
import Modal from 'react-modal'

const MessageModal = (props) => (
    <Modal
        isOpen={!!props.isMessageModalOpen}
        contentLabel = "Alert Message"
        onRequestClose = {props.onVisibleMessageModal}
        closeTimeoutMS={1000}
        className ="modal--OrderView"
    >
        <h3 className="modal--OrderView__title">{props.title}</h3>
        <p className="modal--OrderView__body">{props.message} {' '+ props.orderNo}</p>
        <div className="button__splitter">
            <button className="button" onClick={props.onSubmit}>Yes, sure</button>
            <button className="button" onClick={props.onVisibleMessageModal}>No </button>
        </div>
        
    </Modal>
)

export default MessageModal;