import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../blog-list.css';
import LoginModal from './login-modal';
import { serviceClient } from './service-client';

class BlogList extends Component {

    state = {
        openLoginModal: false,
        blogs: [],
        isLoggedin: window.sessionStorage.getItem('user') ? true : false
    }

    componentDidMount() {
        this.getBlogs()
        this.setState({
            isLoggedin: window.sessionStorage.getItem('user') ? true : false
        })
    }

    getBlogs = async () => {
        serviceClient('http://localhost:4000/blogs', (response, err) => {
            if (err) console.log(err)
            this.setState({ blogs: response && response.data })
        })

    }

    deleteBlog = (event) => {
        const body = { id: event.target.value }
        serviceClient('http://localhost:4000/delete-blog', (response, err) => {
            if (err) console.log(err)
            this.getBlogs()
        }, body)
    }

    onCloseModal = () => {
        this.setState({ openLoginModal: false })
    }

    onLoginButtonClick = e => {
        e.preventDefault()
        this.setState({ openLoginModal: true })
    }

    onLogoutButtonClick = e => {
        window.sessionStorage.clear()
        this.setState({
            isLoggedin: false
        })
    }

    setLoginState = (isLoggedin) => {
        this.setState({
            isLoggedin
        })
    }

    render() {
        const { blogs, openLoginModal, isLoggedin } = this.state
        return (
            <div>
                <h2 className='ml3'>Blog List</h2>
                <div className={`flex ${isLoggedin ? 'justify-between' : 'justify-end'} pr2`}>
                    {isLoggedin ?
                        <>
                            <Link to={`../add-blog`}>
                                <button className='ma3 br2 pointer'>Add a blog</button>
                            </Link>
                            <button className='ma3 mr4 br2 pointer' onClick={this.onLogoutButtonClick}>Logout</button>
                        </>
                        : <button className='ma3 br2 pointer' onClick={this.onLoginButtonClick}>Login</button>}
                </div>
                <table className='mh2 w-100'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Blog</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(blogs || []).map(blog =>
                            <tr key={blog.blog_id}>
                                <Link to={`../blog/${blog.blog_id}`}>
                                    <td>{blog.title}</td>
                                </Link>
                                <td>{blog.body.substring(0, 100)}{blog.body.substring(100) ? '...' : ''}</td>
                                <td>{blog.date && blog.date.split('T')[0]}</td>
                                {isLoggedin && <td><button className='pointer br2' value={blog.blog_id} onClick={this.deleteBlog}>Delete</button></td>}
                            </tr>
                        )}
                    </tbody>

                </table>
                <LoginModal openLoginModal={openLoginModal} onCloseModal={this.onCloseModal} setLoginState={this.setLoginState} />
            </div >
        );
    }
}

export default BlogList;
