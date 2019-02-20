import React, { Fragment } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import NewRecipe from './NewRecipe';
import ChangePassword from './ChangePassword';
import ForgetPasword from './ForgetPassword';
import Search from './Search/SearchFormModal';

export default () => (
  <Fragment>
    <Login/>
    <SignUp/>
    <Search/>
    <NewRecipe/>
    <ChangePassword/>
    <ForgetPasword/>
  </Fragment>
);
