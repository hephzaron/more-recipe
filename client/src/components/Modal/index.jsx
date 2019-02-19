import React, { Fragment } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Search from './Search/SearchFormModal';

export default () => (
  <Fragment>
    <Login/>
    <SignUp/>
    <Search/>
  </Fragment>
);
