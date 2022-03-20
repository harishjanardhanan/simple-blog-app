import React, { Component } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class MessageModal extends Component {

    render() {
        return <Modal open={this.props.openModal} onClose={this.props.onCloseModal}>
            <div className='flex justify-center items-center w5'>
                {this.props.data}
            </div>
        </Modal>
    }
}

export default MessageModal;