import React, { Component } from 'react';
import '../App.css';

class User extends Component {

  state = {
    users: [],
    user: {
      name: 'Harish',
      lastname: 'K',
      email: 'harish@gmail.com'
    }
  }

  componentDidMount() {
    this.getusers()
  }

  getusers = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    }
    fetch('http://localhost:4000/user', requestOptions)
      .then(response => response.json())
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.log(err))
  }

  renderUser = ({ user_id, name, lastname, email }) => <div key={user_id}>{name} | {lastname} | {email}</div>

  addUser = () => {
    const { user } = this.state
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: user.name, lastname: user.lastname, email:user.email})
    }
    fetch(`http://localhost:4000/user/add`, requestOptions)
      .then(this.getusers)
      .catch(err => console.log(err))
  }

  render() {
    const { users, user } = this.state
    return (
      <div className="App">
        {(users || []).map(this.renderUser)}

        <div>
          <input
            value={user.name}
            onChange={e => this.setState({ user: { ...user, name: e.target.value } })} />
          <input
            value={user.lastname}
            onChange={e => this.setState({ user: { ...user, lastname: e.target.value } })} />
          <input
            value={user.email}
            onChange={e => this.setState({ user: { ...user, email: e.target.value } })} />
          <button onClick={this.addUser}>New User</button>
        </div>
      </div>
    );
  }
}

export default User;
