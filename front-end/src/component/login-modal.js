import React, { Component } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { serviceClient } from './service-client';

class LoginModal extends Component {

    state = {
        username: '',
        password: '',
        loginMessage: ''
    }
    onSubmit = () => {
        const { username, password } = this.state
        const requestBody = { username, password }
        serviceClient('http://localhost:4000/login', (response, err) => {
            if (err) console.log(err)
            this.setState({
                username: '',
                password: '',
                loginMessage: response.message,
            })
            if (response.isLoggedin) {
                window.sessionStorage.setItem('user', response.user)
            }
            this.props.setLoginState(response.isLoggedin)
        }, requestBody)
    }
    onCloseModal = () => {
        this.setState({
            username: '',
            password: '',
            loginMessage: ''
        })
        this.props.onCloseModal()
    }
    render() {
        const { username, password, loginMessage } = this.state
        return <Modal open={this.props.openLoginModal} onClose={this.onCloseModal}>
            {loginMessage === '' ? <div className='flex flex-column pv4'>
                {
                    //handle error condition
                }
                <label className='mb1'>User Name</label>
                <input className='mb2 br2' type="text" value={username} onChange={e => this.setState({ username: e.target.value })} />
                <label className='mb1'>Password</label>
                <input className='mb3 br2' type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
                <input className='mb1 pointer br2' type="submit" onClick={this.onSubmit} disabled={!(username && password)} value="Log In" />
            </div>
                : <div className='flex justify-center items-center w5'>
                    {loginMessage}
                </div>
            }
        </Modal>
    }
}

export default LoginModal;