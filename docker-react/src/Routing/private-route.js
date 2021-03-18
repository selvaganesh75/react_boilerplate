import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authHeader } from '../auth/auth';

//children={(prop:any) => validRoute(route) }

export const PrivateRoute = ({ component:Component, ...rest }) => {
 
 return <Route {...rest} render={(props)=>{
    const isUser = authHeader();
     return isUser && isUser.Authorization ? <Component {...props}/> : <Redirect to={{ pathname: '/login' }} />;
  }}/>
  
};
