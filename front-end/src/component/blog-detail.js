import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { serviceClient } from './service-client';

class BlogDetail extends Component {

    state = {
        id: this.props.match.params.id,
        blogData: {},
        isEditing: false,
        blog: {
            title: '',
            body: ''
        }
    }

    componentDidMount() {
        this.getBlogDetail()
    }

    getBlogDetail = () => {
        serviceClient(`http://localhost:4000/blog/${this.state.id}`, (response, err) => {
            if (err) console.log(err)
            this.setState({ blogData: response.data })
        })
    }
    editData = () => {
        const { blogData } = this.state
        this.setState({ isEditing: true, blog: blogData })
    }
    updateBlog = () => {
        const { blog } = this.state
        const requestBody = { id: this.state.id, title: blog.title, body: blog.body }
        serviceClient('http://localhost:4000/edit-blog', (response, err) => {
            if (err) console.log(err)
            this.setState({ isEditing: false })
            this.getBlogDetail
        }, requestBody)
    }
    cancelEdit = () => {
        const { blogData } = this.state
        this.setState({
            isEditing: false,
            blog: blogData
        })
    }

    render() {
        const { blogData, isEditing, blog } = this.state
        return (
            <div>
                {isEditing ?
                    <div className='ma3'>
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
                                className='w-60 h5 mb3'
                                value={blog.body}
                                onChange={e => this.setState({ blog: { ...blog, body: e.target.value } })} />
                        </div>
                        <button className='mr3 br2 pointer' onClick={this.updateBlog}>Submit</button>
                        <button className='br2 pointer' onClick={this.cancelEdit}>Cancel</button>
                    </div>
                    : <div>
                        <div className='ml3 mr4 flex justify-between items-center mt3'>
                            <Link to='/blogs'><button className='br2 pointer'>Goto Homepage</button></Link>
                            {window.sessionStorage.getItem('user') && <button className='br2 pointer' onClick={this.editData}>Edit the Blog</button>}
                        </div>
                        <div>
                            <div className='flex justify-between items-center mb3 mr4 ml3'>
                                <h2>{blogData && blogData.title}</h2>
                                Published date: {blogData && blogData.date && blogData.date.split('T')[0]}
                            </div>
                            <div className='ma3'>
                                <pre>{blogData && blogData.body}</pre>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default BlogDetail;
