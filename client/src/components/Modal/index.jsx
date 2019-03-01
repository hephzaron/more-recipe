import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import NewRecipe from './NewRecipe';
import ChangePassword from './ChangePassword';
import ForgetPasword from './ForgetPassword';
import Search from './Search/SearchFormModal';

export default () => (
  <Switch>
    <Route path="login" component ={Login}/>
    <Route path="signup" component={SignUp}/>
    <Route path="search" component={Search}/>
    <Route path="recipes/add" component ={NewRecipe}/>
    <Route path="users/:userId" component={ChangePassword}/>
    <Route path="users/reset_password" component={ForgetPasword}/>
  </Switch>
);
