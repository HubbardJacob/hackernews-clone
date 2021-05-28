import logo from './../logo.svg';
import './../styles/App.css';

import React, { Component } from 'react';
import LinkList from './LinkList';
import Link from './Link';
import CreateLink from './CreateLink'
import { UserList, SelectUserID} from './UserList'

function App() {
  return (
    <>
      <UserList />
      <SelectUserID />
      <LinkList />
      <CreateLink />
    </>
  );
}

export default App;
