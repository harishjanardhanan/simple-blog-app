import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class AddBlog extends Component {

    state = {
        blog: {
            title: '',
            body: '',
            date: ''
        }
    }

    componentDidMount() {

    }

    addBlogData = () => {
        const { blog } = this.state
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: blog.title, body: blog.body })
        }
        fetch(`http://localhost:4000/add-blog`, requestOptions)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    render() {
        const { blog } = this.state
        return (
            <div>
                <Link to='/blogs'><button>Goto Homepage</button></Link>
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
                    <button onClick={this.addBlogData}>Add blog</button>
                </div>
            </div>
        );
    }
}

export default AddBlog;
