import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../blog-list.css';
import LoginModal from './login-modal';
import { serviceClient } from './service-client';

class BlogList extends Component {

    state = {
        openLoginModal: false,
        blogs: []
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = async () => {
        serviceClient('http://localhost:4000/blogs', (response) => {
            this.setState({ blogs: response && response.data })
        })

    }

    deleteBlog = (event) => {
        const body = { id: event.target.value }
        serviceClient('http://localhost:4000/delete-blog', () => {
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

    onLoginSubmit = () => {
        this.setState({
            openLoginModal: false
        })
    }

    render() {
        const { blogs, openLoginModal } = this.state
        return (
            <div>
                <div className="flex justify-between">
                    <Link to={`../add-blog`}>
                        <button className='ma2'>Add a blog</button>
                    </Link>
                    <button className='ma2' onClick={this.onLoginButtonClick}>Login</button>
                </div>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Blog</th>
                        <th>Date</th>
                    </tr>
                    {(blogs || []).map(blog =>
                        <tr key={blog.blog_id}>
                            <Link to={`../blog/${blog.blog_id}`}>
                                <td>{blog.title}</td>
                            </Link>
                            <td>{blog.body}</td>
                            <td>{blog.date && blog.date.split('T')[0]}</td>
                            <td><button value={blog.blog_id} onClick={this.deleteBlog}>Delete</button></td>
                        </tr>
                    )}

                </table>
                <LoginModal openLoginModal={openLoginModal} onCloseModal={this.onCloseModal} onSubmit={this.onLoginSubmit} />
            </div >
        );
    }
}

export default BlogList;
