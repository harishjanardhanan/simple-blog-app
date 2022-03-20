import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { serviceClient } from './service-client';
import MessageModal from './message-modal';

class AddBlog extends Component {

    state = {
        blog: {
            title: '',
            body: '',
            date: ''
        },
        openModal: false,
        messageData: ''
    }

    componentDidMount() {

    }

    addBlogData = () => {
        const { blog } = this.state
        const requestBody = { title: blog.title, body: blog.body }
        serviceClient('http://localhost:4000/add-blog', (response) => {
            this.setState({ messageData: response.message, openModal: true })
        }, requestBody)
    }

    closeModal = () => {
        this.setState({
            messageData: '',
            openModal: false
        })
        window.location.replace('../blogs')
    }

    render() {
        const { blog, openModal, messageData } = this.state
        return (
            <div>
                <div className='flex justify-between mh3 items-center'>
                    <h2 className=''> Add a new blog</h2>
                    <Link to='/blogs'><button className='ma3 br2 pointer'>Goto Homepage</button></Link>
                </div>
                <div>
                    <div className='ml3 mb3'>
                        Title:
                        <input
                            value={blog.title}
                            className='ml3 w-60'
                            onChange={e => this.setState({ blog: { ...blog, title: e.target.value } })} />
                    </div>
                    <div className='ml3'>
                        <div className='mb2'>Content:</div>
                        <textarea
                            className='w-60 h5'
                            value={blog.body}
                            onChange={e => this.setState({ blog: { ...blog, body: e.target.value } })} />
                    </div>
                    <button className='ma3 br2 pointer' disabled={!(blog.title && blog.body)} onClick={this.addBlogData}>Add blog</button>
                </div>
                <MessageModal openModal={openModal} onCloseModal={this.closeModal} data={messageData} />
            </div>
        );
    }
}

export default AddBlog;
