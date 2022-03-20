import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BlogDetail from './component/blog-detail';
import BlogList from './component/blog-list';
import AddBlog from './component/add-blog';
import './App.css'

const isLoggedin = window.sessionStorage.getItem('user') ? true : false

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => isLoggedin
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={BlogList}/>
          <Route path='/blogs' component={BlogList} />
          <Route path='/blog/:id' component={BlogDetail} />
          <AuthRoute path='/add-blog' component={AddBlog} />
        </Switch>
      </Router>
    );
  }
}

export default App;