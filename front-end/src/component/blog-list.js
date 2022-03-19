import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../blog-list.css';

class BlogList extends Component {

    state = {
    }

    componentDidMount() {
        this.getBlogs()
    }

    getBlogs = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }
        fetch('http://localhost:4000/blogs', requestOptions)
            .then(response => response.json())
            .then(response => this.setState({ blogs: response.data }))
            .catch(err => console.log(err))
    }

    deleteBlog=(event)=> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: event.target.value})
        }
        fetch('http://localhost:4000/delete-blog', requestOptions)
            .then(response => console.log(response))
            .then(this.getBlogs)
            .catch(err => console.log(err))
    }

    render() {
        const { blogs } = this.state
        return (
            <div>
                <Link to={`../add-blog`}>
                    <button className='add-blog'>Add a blog</button>
                </Link>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Blog</th>
                        <th>Date</th>
                    </tr>
                    {(blogs || []).map(blog =>
                        <tr>
                            <Link to={`../blog/${blog.blog_id}`}>
                                <td>{blog.title}</td>
                            </Link>
                            <td>{blog.body}</td>
                            <td>{blog.date && blog.date.split('T')[0]}</td>
                            <td><button value={blog.blog_id} onClick={this.deleteBlog}>Delete</button></td>
                        </tr>
                    )}

                </table>
            </div>
        );
    }
}

export default BlogList;
