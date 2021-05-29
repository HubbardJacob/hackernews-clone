//import logo from './../logo.svg';
import './../styles/App.css';

import React from 'react';
//import LinkList from './LinkList';
//import Link from './Link';
import CreateLink from './CreateLink'
import { UserList } from './UserList'
import Login from './Login'
import { Switch, Route } from 'react-router-dom';
import Header from './Header'

const App = () => {

  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/create" component={CreateLink}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
