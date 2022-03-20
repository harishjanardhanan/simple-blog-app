import React, { Component } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class LoginModal extends Component {

    state = {
        username: '',
        password: ''
    }
    onSubmit = () =>{
        this.setState({
            username: '',
            password: '',
        })
        this.props.onSubmit()
    }
    render() {
        const {username, password} = this.state
        return <Modal open={this.props.openLoginModal} onClose={this.props.onCloseModal}>
            <div className='flex flex-column pv4'>
                {
                    //handle error condition
                }
                <label className='mb1'>User Name</label>
                <input className='mb2 br2' type="text" value={username} onChange={e => this.setState({username: e.target.value })} />
                <label className='mb1'>Password</label>
                <input className='mb3 br2' type="password" value={password} onChange={e => this.setState({password: e.target.value })} />
                <input className='mb1 pointer br2' type="submit" onClick={this.onSubmit} disabled={!(username && password)} value="Log In" />
            </div>
        </Modal>
    }
}

export default LoginModal;