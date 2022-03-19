import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }
        fetch(`http://localhost:4000/blog/${this.state.id}`, requestOptions)
            .then(response => response.json())
            .then(response => this.setState({ blogData: response.data }))
            .catch(err => console.log(err))
    }
    editData = () => {
        const { blogData } = this.state
        this.setState({ isEditing: true, blog: blogData })
    }
    updateBlog = () => {
        const { blog } = this.state
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id, title: blog.title, body: blog.body })
        }
        fetch(`http://localhost:4000/edit-blog`, requestOptions)
            .then(this.setState({ isEditing: false }))
            .then(this.getBlogDetail)
            .catch(err => console.log(err))
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
                    <div>
                        <div>
                            Title:
                            <input
                                value={blog.title}
                                onChange={e => this.setState({ blog: { ...blog, title: e.target.value } })} />
                        </div>
                        <div>
                            Content:
                            <textarea
                                value={blog.body}
                                onChange={e => this.setState({ blog: { ...blog, body: e.target.value } })} />
                        </div>
                        <button onClick={this.updateBlog}>Submit</button>
                        <button onClick={this.cancelEdit}>Cancel</button>
                    </div>
                    : <div>
                        <Link to='/blogs'><button>Goto Homepage</button></Link>
                        <button onClick={this.editData}>Edit the Blog</button>
                        <div>
                            <h3>{blogData && blogData.title}</h3> Published date: {blogData && blogData.date && blogData.date.split('T')[0]}
                            <br></br><br></br>
                            <p>{blogData && blogData.body}</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default BlogDetail;
