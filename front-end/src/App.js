import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BlogDetail from './component/blog-detail';
import BlogList from './component/blog-list';
import AddBlog from './component/add-blog';

class App extends Component {
  render() {
    return (
    <Router>
          <Switch>
              <Route exact path='/' component={BlogList} />
              <Route path='/blogs' component={BlogList} />
              <Route path='/blog/:id' component={BlogDetail} />
              <Route path='/add-blog' component={AddBlog} />
          </Switch>
      </Router>
    );
  }
}

export default App;